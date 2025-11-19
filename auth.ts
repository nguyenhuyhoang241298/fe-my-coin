import NextAuth from 'next-auth'
import authConfig from './lib/auth/auth.config'

declare module 'next-auth' {
  interface User {
    accessToken?: string
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
