import { CredentialsSignin, type NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import { cookies } from 'next/headers'
import { login, login2FA, loginMagicLink } from './api'
import { AUTH_CONFIG, cookieOptions } from './configs'

class InvalidLoginError extends CredentialsSignin {
  constructor(code: string) {
    super()
    this.code = code
  }
}

export default {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
        token: {},
        isMagicLink: {},
      },
      authorize: async (credentials) => {
        const cookieStore = await cookies()

        try {
          let user = null

          if (credentials.isMagicLink && credentials.token) {
            user = await loginMagicLink(
              credentials.email as string,
              credentials.token as string,
            )
          } else if (credentials.token) {
            user = await login2FA(
              credentials.email as string,
              credentials.password as string,
              credentials.token as string,
            )
          } else {
            user = await login(
              credentials.email as string,
              credentials.password as string,
            )
          }

          if (user.code === '2FA_REQUIRED') {
            throw new InvalidLoginError('2FA_REQUIRED')
          }

          if (user.accessToken) {
            cookieStore.set(
              AUTH_CONFIG.ACCESS_TOKEN,
              user.accessToken,
              cookieOptions,
            )
          }

          if (user.refreshToken) {
            cookieStore.set(
              AUTH_CONFIG.REFRESH_TOKEN,
              user.refreshToken,
              cookieOptions,
            )
          }

          if (user.expiresAt) {
            cookieStore.set(
              AUTH_CONFIG.EXPIRES_AT,
              user.expiresAt,
              cookieOptions,
            )
          }

          return user
        } catch (error) {
          console.error('Login error:', error)
          if (
            error instanceof InvalidLoginError &&
            error.code === '2FA_REQUIRED'
          ) {
            throw new InvalidLoginError('2FA_REQUIRED')
          }

          throw new InvalidLoginError('500')
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
} satisfies NextAuthConfig
