import { sleep } from '../utils'
import { FAKE_ADMIN } from './configs'

export const getUserByEmailAndPassword = async (
  email: string,
  password: string,
) => {
  await sleep(1500)

  if (email === FAKE_ADMIN.email && password === FAKE_ADMIN.password) {
    return {
      email: FAKE_ADMIN.email,
      accessToken: 'ACCESS_TOKEN',
    }
  }

  return null
}
