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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { startAuthentication } from '@simplewebauthn/browser'
import { useMutation } from '@tanstack/react-query'
import { KeyRound } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { getAuthenticationOptions, verifyAuthentication } from './api'

const passkeySchema = z.object({
  email: z.email({ message: 'Email không hợp lệ' }),
})

type PasskeyFormData = z.infer<typeof passkeySchema>

const handlePasskey = async (email: string) => {
  const authenticationOptions = await getAuthenticationOptions(email)
  const asseResp = await startAuthentication(authenticationOptions)
  const verifyResp = await verifyAuthentication(asseResp, email)
  return verifyResp
}

const Passkey = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const form = useForm<PasskeyFormData>({
    resolver: zodResolver(passkeySchema),
    defaultValues: {
      email: '',
    },
  })

  const authenticationMutation = useMutation({
    mutationFn: async (data: PasskeyFormData) => {
      const res = await handlePasskey(data.email)

      return res
    },
    onSuccess: async (data) => {
      if (!data.verified || !data.email || !data.token) {
        toast.error('Có lỗi xảy ra khi đăng nhập với passkey, vui lòng thử lại')
        return
      }

      await signIn('credentials', {
        email: data.email,
        token: data.token,
        isLoginWithToken: true,
        redirect: false,
      })
        .then((res) => {
          if (!res?.error) {
            toast.success('Đăng nhập thành công')
            setOpen(false)
            form.reset()
            router.push('/dashboard')
          } else {
            toast.error(
              'Có lỗi xảy ra khi đăng nhập với passkey, vui lòng thử lại',
            )
          }
        })
        .catch(() => {
          toast.error(
            'Có lỗi xảy ra khi đăng nhập với passkey, vui lòng thử lại',
          )
        })
    },
    onError: (error: Error) => {
      console.log('error', error)
      toast.error(
        error.message ||
          'Có lỗi xảy ra khi đăng nhập với passkey, vui lòng thử lại',
      )
    },
  })

  const onSubmit = (data: PasskeyFormData) => {
    authenticationMutation.mutate(data)
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="flex-1"
        type="button"
      >
        <KeyRound className="size-4 mr-1" />
        Passkey
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Đăng nhập bằng Passkey</DialogTitle>
            <DialogDescription>
              Đăng nhập dễ dàng với passkey, bạn không cần nhớ mật khẩu. Chỉ cần
              nhập email của mình
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        type="email"
                        autoComplete="email"
                        disabled={authenticationMutation.isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={authenticationMutation.isPending}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  disabled={authenticationMutation.isPending}
                  isLoading={authenticationMutation.isPending}
                >
                  Đăng nhập
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Passkey
