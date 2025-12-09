import axiosServer from '@/lib/axios/axiosServer'

const Page = async () => {
  const data = await axiosServer.get('/api/v1/user')

  return <div>Page</div>
}

export default Page
