import axiosClient from '@/lib/axios/axiosClient'
import { TwoFactorResponse, VerifyOTPResponse } from './type'

export const enable2FA = async (): Promise<TwoFactorResponse> => {
  const response = await axiosClient.post<TwoFactorResponse>(
    '/api/v1/auth/enable-2fa',
  )

  return response.data
}

export const verify2FA = async (token: string): Promise<VerifyOTPResponse> => {
  const response = await axiosClient.post<VerifyOTPResponse>(
    '/api/v1/auth/verify-2fa',
    { token },
  )

  return response.data
}
