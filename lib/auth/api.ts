import axiosServer from '../axios/axiosServer'

export const login = async (email: string, password: string) => {
  const res = await axiosServer.post('/api/v1/auth/login', { email, password })

  return res.data
}

export const login2FA = async (
  email: string,
  password: string,
  token: string,
) => {
  const res = await axiosServer.post('/api/v1/auth/login-2fa', {
    email,
    password,
    token,
  })

  return res.data
}
