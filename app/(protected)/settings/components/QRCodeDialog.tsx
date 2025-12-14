'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Check, Copy } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'
import { TwoFactorResponse } from '../type'

interface QRCodeDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  qrData: TwoFactorResponse | null
  onVerify: () => void
}

export const QRCodeDialog = ({
  isOpen,
  onOpenChange,
  qrData,
  onVerify,
}: QRCodeDialogProps) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    if (qrData?.secret) {
      await navigator.clipboard.writeText(qrData.secret)
      setCopied(true)
      toast.success('Secret key copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Setup Two-Factor Authentication</DialogTitle>
          <DialogDescription>
            Scan the QR code with your authenticator app or manually enter the
            secret key
          </DialogDescription>
        </DialogHeader>

        {qrData && (
          <div className="space-y-4">
            {/* QR Code */}
            <div className="flex justify-center p-4 bg-white rounded-lg">
              <div className="relative w-48 h-48">
                <Image
                  src={qrData.qrCodeUrl}
                  alt="QR Code"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Secret Key */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Secret Key</label>
              <div className="flex gap-2">
                <div className="flex-1 p-3 bg-muted rounded-md font-mono text-sm break-all">
                  {qrData.secret}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyToClipboard}
                  className="shrink-0"
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Save this key in a secure location. You&apos;ll need it to
                recover your account if you lose access to your authenticator
                app.
              </p>
            </div>

            <Button onClick={onVerify} className="w-full">
              Verify OTP
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
