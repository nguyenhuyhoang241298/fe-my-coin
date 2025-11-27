'use client'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { verifyRegisterOtp } from './actions'

interface VerifyOtpDialogProps {
  open: boolean
  email: string
  onOpenChange: (open: boolean) => void
}

export function VerifyOtpDialog({
  open,
  email,
  onOpenChange,
}: VerifyOtpDialogProps) {
  const router = useRouter()
  const [otp, setOtp] = useState('')

  const verifyMutation = useMutation({
    mutationFn: async () => {
      return verifyRegisterOtp({ email, otp })
    },
    onSuccess: () => {
      toast.success('Xác thực thành công! Vui lòng đăng nhập')
      onOpenChange(false)
      router.push('/login')
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          'Xác thực thất bại, vui lòng kiểm tra lại mã OTP',
      )
    },
  })

  const handleVerify = () => {
    if (otp.length !== 6) {
      toast.error('Vui lòng nhập đầy đủ 6 ký tự mã OTP')
      return
    }
    verifyMutation.mutate()
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xác thực tài khoản</AlertDialogTitle>
          <AlertDialogDescription>
            Vui lòng nhập mã OTP đã được gửi đến email <strong>{email}</strong>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex justify-center py-4">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
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

        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={verifyMutation.isPending}
          >
            Hủy
          </Button>
          <Button
            onClick={handleVerify}
            disabled={verifyMutation.isPending || otp.length !== 6}
            isLoading={verifyMutation.isPending}
          >
            Xác thực
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
