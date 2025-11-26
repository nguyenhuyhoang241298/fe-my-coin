import { env } from '@/env'
import axios from 'axios'

const axiosServer = axios.create({
  baseURL: env.API_ENDPOINT,
})

axiosServer.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

axiosServer.interceptors.response.use(
  function onFulfilled(response) {
    return response
  },
  function onRejected(error) {
    return Promise.reject(error)
  },
)

export default axiosServer
