import { env } from '@/env'
import axios from 'axios'
import NextAuth from 'next-auth'
import { cookies } from 'next/headers'
import authConfig from './lib/auth/auth.config'
import { AUTH_CONFIG, cookieOptions } from './lib/auth/configs'

declare module 'next-auth' {
  interface User {
    accessToken?: string
    refreshToken?: string
    user: {
      image?: string
      fullName?: string
      email?: string
    }
  }
}

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    picture?: string
    name?: string
    email?: string
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user) {
        token.accessToken = user.accessToken
        token.picture = user?.user?.image
        token.name = user?.user?.fullName
        token.email = user?.user?.email
      }

      if (account?.type === 'oauth' && account.provider === 'google') {
        const cookieStore = await cookies()

        const res = await axios.post(
          env.API_ENDPOINT + '/api/v1/auth/google-login',
          undefined,
          {
            headers: {
              Authorization: `Bearer ${account?.id_token}`,
            },
          },
        )

        const resParsed = res.data

        if (resParsed.accessToken) {
          cookieStore.set(
            AUTH_CONFIG.ACCESS_TOKEN,
            resParsed.accessToken,
            cookieOptions,
          )
        }

        if (resParsed.refreshToken) {
          cookieStore.set(
            AUTH_CONFIG.REFRESH_TOKEN,
            resParsed.refreshToken,
            cookieOptions,
          )
        }

        if (resParsed.expiresAt) {
          cookieStore.set(
            AUTH_CONFIG.EXPIRES_AT,
            resParsed.expiresAt,
            cookieOptions,
          )
        }

        token.picture = user?.image
        token.name = user?.name
        token.email = user?.email
      }

      return token
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken as string
      session.picture = token.picture as string
      session.name = token.name as string
      session.email = token.email as string

      return session
    },
  },
  ...authConfig,
})
