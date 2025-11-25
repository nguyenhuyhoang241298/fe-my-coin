import { env } from '@/env'
import axios from 'axios'

const axiosClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_ENDPOINT,
})

axiosClient.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

axiosClient.interceptors.response.use(
  function onFulfilled(response) {
    return response
  },
  function onRejected(error) {
    return Promise.reject(error)
  },
)

export default axiosClient
