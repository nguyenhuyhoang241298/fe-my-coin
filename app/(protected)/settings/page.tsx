'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import useUserQuery from '@/hooks/user/useUserQuery'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Shield } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { enable2FA, verify2FA } from './api'
import { OTPVerifyDialog } from './components/OTPVerifyDialog'
import { QRCodeDialog } from './components/QRCodeDialog'
import { TwoFactorResponse } from './type'

const Page = () => {
  const queryClient = useQueryClient()

  const [isQRDialogOpen, setIsQRDialogOpen] = useState(false)
  const [isOTPDialogOpen, setIsOTPDialogOpen] = useState(false)
  const [qrData, setQrData] = useState<TwoFactorResponse | null>(null)

  const userInfo = useUserQuery()

  const enableMutation = useMutation({
    mutationFn: enable2FA,
    onSuccess: (data) => {
      setQrData(data)
      setIsQRDialogOpen(true)
      toast.success('QR code generated successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to enable 2FA')
    },
  })

  const verifyMutation = useMutation({
    mutationFn: verify2FA,
    onSuccess: () => {
      toast.success('2FA enabled successfully')
      setIsOTPDialogOpen(false)
      setIsQRDialogOpen(false)
      setQrData(null)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to verify OTP')
    },
  })

  const handleEnable2FA = () => {
    enableMutation.mutate()
  }

  const handleOpenOTPDialog = () => {
    setIsQRDialogOpen(false)
    setIsOTPDialogOpen(true)
  }

  const handleVerifyOTP = (token: string) => {
    verifyMutation.mutate(token)
  }

  const renderButtonText = () => {
    if (userInfo.data?.twoFAEnabled) {
      return 'Enabled'
    }

    if (enableMutation.isPending || userInfo.isFetching || userInfo.isError) {
      return 'Loading...'
    }

    return 'Enable'
  }

  return (
    <div className="container p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Card className="border-border bg-card mt-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <div className="mt-1">
                <Shield className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-xl mb-1">
                  Two-factor authentication
                </CardTitle>
                <CardDescription>Verify via authenticator app.</CardDescription>
              </div>
            </div>
            <Button
              onClick={handleEnable2FA}
              disabled={
                enableMutation.isPending ||
                userInfo.isFetching ||
                userInfo.data?.twoFAEnabled
              }
            >
              {renderButtonText()}
            </Button>
          </div>
        </CardHeader>
      </Card>

      <QRCodeDialog
        isOpen={isQRDialogOpen}
        onOpenChange={setIsQRDialogOpen}
        qrData={qrData}
        onVerify={handleOpenOTPDialog}
      />

      <OTPVerifyDialog
        isOpen={isOTPDialogOpen}
        onOpenChange={setIsOTPDialogOpen}
        onVerify={handleVerifyOTP}
        isPending={verifyMutation.isPending}
      />
    </div>
  )
}

export default Page
