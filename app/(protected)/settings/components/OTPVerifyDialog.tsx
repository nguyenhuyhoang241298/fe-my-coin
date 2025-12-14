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

interface OTPVerifyDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onVerify: (token: string) => void
  isPending?: boolean
}

export const OTPVerifyDialog = ({
  isOpen,
  onOpenChange,
  onVerify,
  isPending = false,
}: OTPVerifyDialogProps) => {
  const [otp, setOtp] = useState('')

  const handleVerify = () => {
    if (otp.length === 6) {
      onVerify(otp)
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
          <DialogTitle>Verify OTP</DialogTitle>
          <DialogDescription>
            Enter the 6-digit code from your authenticator app
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
          >
            {isPending ? 'Verifying...' : 'Verify'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
