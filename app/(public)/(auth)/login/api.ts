import axiosClient from '@/lib/axios/axiosClient'

export const getMagicLink = async (email: string) => {
  const res = await axiosClient.post('/api/v1/auth/request-magic-link', {
    email,
  })

  return res.data
}

export const getAuthenticationOptions = async (email: string) => {
  const res = await axiosClient.get('/api/v1/auth/authentication-options', {
    params: { email },
  })

  return res.data
}

export const verifyAuthentication = async (asseResp: any, email: string) => {
  const res = await axiosClient.post('/api/v1/auth/authentication', asseResp, {
    params: {
      email,
    },
  })

  return res.data
}
