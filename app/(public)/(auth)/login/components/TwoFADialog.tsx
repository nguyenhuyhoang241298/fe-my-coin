'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { useState } from 'react'

interface TwoFADialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onVerify: ({
    token,
    formData,
  }: {
    token: string
    formData: {
      email: string
      password: string
    }
  }) => void
  isPending?: boolean
  formData: {
    email: string
    password: string
  }
}

export const TwoFADialog = ({
  isOpen,
  onOpenChange,
  onVerify,
  isPending = false,
  formData,
}: TwoFADialogProps) => {
  const [otp, setOtp] = useState('')

  const handleVerify = () => {
    if (otp.length === 6) {
      onVerify({ token: otp, formData })
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!isPending) {
      onOpenChange(open)
      if (!open) {
        setOtp('')
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Xác thực 2FA</DialogTitle>
          <DialogDescription>
            Nhập mã 6 chữ số từ ứng dụng xác thực của bạn
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              disabled={isPending}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            onClick={handleVerify}
            className="w-full"
            disabled={otp.length !== 6 || isPending}
            isLoading={isPending}
          >
            Xác thực
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
