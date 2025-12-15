import axiosClient from '@/lib/axios/axiosClient'

export const getMagicLink = async (email: string) => {
  const res = await axiosClient.post('/api/v1/auth/request-magic-link', {
    email,
  })

  return res.data
}
