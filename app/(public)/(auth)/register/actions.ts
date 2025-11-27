'use server'

import axiosServer from '@/lib/axios/axiosServer'
import { checkCaptchaToken } from './helper'

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

export const verifyRegisterOtp = async (data: {
  email: string
  otp: string
}) => {
  const res = await axiosServer.post('/api/v1/auth/verify-register-otp', data)
  return res.data
}
