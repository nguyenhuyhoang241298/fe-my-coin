export interface TwoFactorResponse {
  qrCodeUrl: string
  secret: string
}

export interface VerifyOTPResponse {
  success: boolean
  message?: string
}
