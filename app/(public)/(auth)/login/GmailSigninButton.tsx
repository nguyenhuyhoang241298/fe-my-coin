'use client'

import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'
import { signIn } from 'next-auth/react'

const GmailSigninButton = () => {
  const signInWithGmail = async () => {
    await signIn('google', { callbackUrl: '/dashboard' })
  }

  return (
    <Button
      onClick={signInWithGmail}
      variant="outline"
      className="flex-1 w-full"
      type="button"
    >
      <Mail className="size-4 mr-1" />
      Gmail
    </Button>
  )
}

export default GmailSigninButton
