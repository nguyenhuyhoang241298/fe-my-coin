'use server'

import { env } from '@/env'
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
