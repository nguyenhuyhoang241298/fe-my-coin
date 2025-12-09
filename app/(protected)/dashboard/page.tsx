'use client'

import axiosClient from '@/lib/axios/axiosClient'
import { useQuery } from '@tanstack/react-query'

const Page = () => {
  const userQuery = useQuery({
    queryKey: ['example'],
    queryFn: async () => {
      const res = await axiosClient.get('/api/v1/user')
      return res.data
    },
  })

  const userQuery1 = useQuery({
    queryKey: ['example1'],
    queryFn: async () => {
      const res = await axiosClient.get('/api/v1/user')
      return res.data
    },
  })

  if (userQuery.isLoading || userQuery1.isLoading) {
    return <div>Loading...</div>
  }

  if (userQuery.isError || userQuery1.isError) {
    return <div>Error: {(userQuery.error as Error).message}</div>
  }

  console.log('userQuery.data', userQuery.data)

  return <div>Success</div>
}

export default Page
