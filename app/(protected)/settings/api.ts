import axiosClient from '@/lib/axios/axiosClient'
import { RegistrationResponseJSON } from '@simplewebauthn/browser'
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

export const getRegistrationOptions = async () => {
  const response = await axiosClient.get('/api/v1/auth/passkey-options')
  return response.data
}

export const verifyRegistration = async (
  attestationResponse: RegistrationResponseJSON,
) => {
  const response = await axiosClient.post(
    '/api/v1/auth/registration',
    attestationResponse,
  )
  return response.data
}
