import { env } from '@/env'
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { signOut } from 'next-auth/react'
import { DEFAULT_LOGOUT_REDIRECT } from '../auth/routes'

const axiosClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_ENDPOINT,
  withCredentials: true,
})

let isRefreshing = false
let failedQueue: Array<{
  resolve: (token: string) => void
  reject: (error: AxiosError) => void
}> = []

const processQueue = (
  error: AxiosError | null,
  token: string | null = null,
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token!)
    }
  })

  failedQueue = []
}

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

  async function onRejected(error: AxiosError) {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // Xử lý lỗi 401 - Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Nếu đang refresh token, thêm request vào queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(() => {
            return axiosClient(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // Gọi API refresh token
        const response = await axios.post(
          `${env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/auth/refresh-token`,
          {},
          {
            withCredentials: true,
          },
        )

        const newAccessToken = response.data?.accessToken

        if (newAccessToken) {
          // Lưu token mới và gọi lại các request đang chờ
          processQueue(null, newAccessToken)

          // Gọi lại request gốc với token mới
          return axiosClient(originalRequest)
        }
      } catch (refreshError) {
        // Nếu refresh token thất bại, reject tất cả requests và đăng xuất
        processQueue(refreshError as AxiosError, null)
        await signOut({ redirectTo: DEFAULT_LOGOUT_REDIRECT })
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    // Xử lý lỗi 403 - Forbidden
    if (error.response?.status === 403) {
      await signOut({ redirectTo: DEFAULT_LOGOUT_REDIRECT })
      return Promise.reject(error)
    }

    return Promise.reject(error)
  },
)

export default axiosClient
