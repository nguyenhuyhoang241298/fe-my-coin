import { CredentialsSignin, type NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { getUserByEmailAndPassword } from './api'

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

          user = await getUserByEmailAndPassword(
            credentials.email as string,
            credentials.password as string,
          )

          return user
        } catch (error) {
          console.error('Login error:', error)
          throw new InvalidLoginError('500')
        }
      },
    }),
  ],
} satisfies NextAuthConfig
