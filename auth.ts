import NextAuth from 'next-auth'
import { cookies } from 'next/headers'
import authConfig from './lib/auth/auth.config'
import { AUTH_CONFIG } from './lib/auth/configs'

declare module 'next-auth' {
  interface User {
    accessToken?: string
    refreshToken?: string
  }
}

declare module 'next-auth' {
  interface Session {
    accessToken?: string
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    signIn: async ({ user }) => {
      const cookieStore = await cookies()

      if (user.accessToken) {
        cookieStore.set({
          name: AUTH_CONFIG.ACCESS_TOKEN,
          value: user.accessToken,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'none',
          domain: AUTH_CONFIG.DOMAIN,
        })
      }

      if (user.refreshToken) {
        cookieStore.set({
          name: AUTH_CONFIG.REFRESH_TOKEN,
          value: user.refreshToken,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'none',
          domain: AUTH_CONFIG.DOMAIN,
        })
      }

      return true
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user.accessToken
      }
      return token
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken as string
      return session
    },
  },
  ...authConfig,
})
