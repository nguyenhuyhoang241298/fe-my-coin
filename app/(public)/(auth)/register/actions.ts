'use server'

import { env } from '@/env'
import axiosServer from '@/lib/axios/axiosServer'
import { validateTurnstileToken } from 'next-turnstile'

export async function checkCaptchaToken(token: string) {
  if (!token || typeof token !== 'string') {
    return { error: 'No token provided' }
  }

  const result = await validateTurnstileToken({
    token,
    secretKey: env.TURNSTILE_SECRET_KEY,
    sandbox: process.env.NODE_ENV === 'development',
  })

  if (!result.success) {
    return { error: 'Invalid token' }
  }

  return { error: null }
}

export const registerUser = async (data: {
  email: string
  password: string
  fullName: string
  phone: string
  captchaToken: string
}) => {
  const checkCaptchaResponse = await checkCaptchaToken(data.captchaToken)

  if (checkCaptchaResponse.error) {
    throw new Error(checkCaptchaResponse.error)
  }

  const res = await axiosServer.post('/api/v1/auth/register', data)
  return res.data
}
