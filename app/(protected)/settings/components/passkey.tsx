'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { startRegistration } from '@simplewebauthn/browser'
import { useMutation } from '@tanstack/react-query'
import { KeyRound } from 'lucide-react'
import { toast } from 'sonner'
import { getRegistrationOptions, verifyRegistration } from '../api'

const establishPasskey = async () => {
  const options = await getRegistrationOptions()
  const attResp = await startRegistration({ optionsJSON: options })
  const verifyResponse = await verifyRegistration(attResp)
  return verifyResponse
}

const Passkey = () => {
  const enableMutation = useMutation({
    mutationFn: establishPasskey,
    onSuccess: (data) => {
      if (data.verified) {
        toast.success('Passkey enabled successfully')
      } else {
        toast.error(data.message || 'Failed to enable passkey')
      }
    },
    onError: (error: Error) => {
      console.log('error', error)
      if (error.name === 'InvalidStateError') {
        toast.error(
          'Error: Authenticator was probably already registered by user',
        )
        return
      }

      toast.error(error.message || 'Failed to enable passkey')
    },
  })

  const handleEnablePasskey = () => {
    enableMutation.mutate()
  }

  return (
    <Card className="border-border bg-card mt-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <div className="mt-1">
              <KeyRound className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <CardTitle className="text-xl mb-1">
                Passkey authentication
              </CardTitle>
              <CardDescription>Verify via passkey.</CardDescription>
            </div>
          </div>
          <Button
            onClick={handleEnablePasskey}
            disabled={enableMutation.isPending}
            isLoading={enableMutation.isPending}
          >
            Enable
          </Button>
        </div>
      </CardHeader>
    </Card>
  )
}

export default Passkey
