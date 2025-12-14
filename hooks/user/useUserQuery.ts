import { useQuery } from '@tanstack/react-query'
import { getUser } from './api'

const useUserQuery = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  })
}

export default useUserQuery
