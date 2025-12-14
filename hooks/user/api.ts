import axiosClient from '@/lib/axios/axiosClient'
import { User } from './type'

export const getUser = async (): Promise<User> => {
  const res = await axiosClient.get('/api/v1/user/id')
  return res.data
}
