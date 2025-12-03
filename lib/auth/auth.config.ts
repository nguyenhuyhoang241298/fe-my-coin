import { CredentialsSignin, type NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { cookies } from 'next/headers'
import { getUserByEmailAndPassword } from './api'
import { AUTH_CONFIG } from './configs'

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
      },
      authorize: async (credentials) => {
        try {
          let user = null
          const cookieStore = await cookies()

          user = await getUserByEmailAndPassword(
            credentials.email as string,
            credentials.password as string,
          )

          if (user.accessToken) {
            cookieStore.set({
              name: AUTH_CONFIG.ACCESS_TOKEN,
              value: user.accessToken,
              httpOnly: true,
              secure: true,
              sameSite: 'none',
              domain: AUTH_CONFIG.DOMAIN,
            })
          }

          if (user.refreshToken) {
            cookieStore.set({
              name: AUTH_CONFIG.REFRESH_TOKEN,
              value: user.refreshToken,
              httpOnly: true,
              secure: true,
              sameSite: 'none',
              domain: AUTH_CONFIG.DOMAIN,
            })
          }

          return user
        } catch (error) {
          console.error('Login error:', error)
          throw new InvalidLoginError('500')
        }
      },
    }),
  ],
} satisfies NextAuthConfig
