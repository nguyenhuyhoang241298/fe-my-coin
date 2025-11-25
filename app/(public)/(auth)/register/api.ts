import axiosClient from '@/lib/axios/axiosClient'

export const registerUser = async (data: {
  email: string
  password: string
  fullName: string
  phone: string
}) => {
  const res = await axiosClient.post('/api/v1/auth/register', data)
  return res.data
}
