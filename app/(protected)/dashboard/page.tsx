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

  if (userQuery.isLoading) {
    return <div>Loading...</div>
  }

  if (userQuery.isError) {
    return <div>Error: {(userQuery.error as Error).message}</div>
  }

  console.log('userQuery.data', userQuery.data)

  return <div>Success</div>
}

export default Page
