import axiosServer from '../axios/axiosServer'

export const getUserByEmailAndPassword = async (
  email: string,
  password: string,
) => {
  const res = await axiosServer.post('/api/v1/auth/login', { email, password })

  return res.data
}
