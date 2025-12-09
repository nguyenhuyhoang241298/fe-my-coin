import axiosClient from '@/lib/axios/axiosClient'

export const logout = async () => {
  const response = await axiosClient.post('/api/v1/auth/logout')
  return response.data
}
