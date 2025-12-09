import { env } from '@/env'
import axios from 'axios'
import { NextAuthRequest } from 'next-auth'
import { NextResponse } from 'next/server'
import { parseSetCookie } from '../axios/helper'
import { AUTH_CONFIG } from './configs'
import { DEFAULT_LOGOUT_REDIRECT } from './routes'

export const handleRefreshTokenBeforeExpire = async (
  request: NextAuthRequest,
) => {
  const refreshToken = request.cookies.get(AUTH_CONFIG.REFRESH_TOKEN)?.value
  const accessToken = request.cookies.get(AUTH_CONFIG.ACCESS_TOKEN)?.value
  const expiresAt = request.cookies.get(AUTH_CONFIG.EXPIRES_AT)?.value

  const nextResponse = NextResponse.next()

  if (!refreshToken || !accessToken || !expiresAt) {
    return nextResponse
  }

  const expiresAtTime = Number(expiresAt)
  const currentTime = Date.now()

  if (currentTime < expiresAtTime) {
    return nextResponse
  }

  try {
    const response = await axios.post(
      `${env.API_ENDPOINT}/api/v1/auth/refresh-token`,
      undefined,
      {
        headers: {
          Cookie: request.cookies
            .getAll()
            .map((cookie) => `${cookie.name}=${cookie.value}`)
            .join('; '),
        },
      },
    )

    const setCookieHeaders = response.headers['set-cookie']

    if (setCookieHeaders) {
      for (const setCookieHeader of setCookieHeaders) {
        const { name, value, options } = parseSetCookie(setCookieHeader)

        nextResponse.cookies.set(name, value, options)
      }
    }

    return nextResponse
  } catch (error) {
    const logoutRes = NextResponse.redirect(
      new URL(DEFAULT_LOGOUT_REDIRECT, request.nextUrl),
    )

    logoutRes.cookies.delete(AUTH_CONFIG.ACCESS_TOKEN)
    logoutRes.cookies.delete(AUTH_CONFIG.REFRESH_TOKEN)
    logoutRes.cookies.delete(AUTH_CONFIG.EXPIRES_AT)
    logoutRes.cookies.delete('__Secure-authjs.session-token')

    return logoutRes
  }
}
