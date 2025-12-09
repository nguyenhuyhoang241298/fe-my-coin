import { signOut } from '@/auth'
import { env } from '@/env'
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { cookies } from 'next/headers'
import { DEFAULT_LOGOUT_REDIRECT } from '../auth/routes'
import { parseSetCookie } from './helper'

const axiosServer = axios.create({
  baseURL: env.API_ENDPOINT,
})

let isRefreshing = false
let failedQueue: Array<{
  resolve: (cookieString: string) => void
  reject: (error: AxiosError) => void
}> = []

const processQueue = (
  error: AxiosError | null,
  cookieString: string | null = null,
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(cookieString!)
    }
  })

  failedQueue = []
}

axiosServer.interceptors.request.use(
  async function (config) {
    const cookieStore = await cookies()
    const allCookies = cookieStore.getAll()

    if (allCookies.length > 0) {
      const cookieString = allCookies
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join('; ')

      config.headers.Cookie = cookieString
    }

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
  async function onRejected(error: AxiosError) {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((cookieString) => {
            originalRequest.headers.Cookie = cookieString
            return axios(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const response = await axios.post(
          `${env.API_ENDPOINT}/api/v1/auth/refresh-token`,
        )

        // Lấy Set-Cookie headers từ response
        const setCookieHeaders = response.headers['set-cookie']

        if (setCookieHeaders) {
          const cookieStore = await cookies()

          // Parse và set từng cookie
          const cookieStrings: string[] = []

          for (const setCookieHeader of setCookieHeaders) {
            const { name, value, options } = parseSetCookie(setCookieHeader)

            // Set cookie vào Next.js
            cookieStore.set(name, value, options)

            // Tạo cookie string cho requests tiếp theo
            cookieStrings.push(`${name}=${value}`)
          }

          const cookieString = cookieStrings.join('; ')

          // Xử lý queue
          processQueue(null, cookieString)

          // Gọi lại request gốc với token mới
          originalRequest.headers.Cookie = cookieString
          return axios(originalRequest)
        }
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null)
        await signOut({ redirectTo: DEFAULT_LOGOUT_REDIRECT })
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    if (error.response?.status === 403) {
      await signOut({ redirectTo: DEFAULT_LOGOUT_REDIRECT })
      return Promise.reject(error)
    }

    return Promise.reject(error)
  },
)

export default axiosServer
