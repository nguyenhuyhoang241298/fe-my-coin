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
import { useMutation } from '@tanstack/react-query'
import { Link } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { getMagicLink } from './api'
import { useMagicLink } from './hooks'

const magicLinkSchema = z.object({
  email: z.email({ message: 'Email không hợp lệ' }),
})

type MagicLinkFormData = z.infer<typeof magicLinkSchema>

const MagicLink = () => {
  const [open, setOpen] = useState(false)
  useMagicLink()

  const form = useForm<MagicLinkFormData>({
    resolver: zodResolver(magicLinkSchema),
    defaultValues: {
      email: '',
    },
  })

  const sendMagicLinkMutation = useMutation({
    mutationFn: async (data: MagicLinkFormData) => {
      const res = await getMagicLink(data.email)

      return res
    },
    onSuccess: () => {
      toast.success('Magic link đã được gửi đến email của bạn!')
      setOpen(false)
      form.reset()
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Có lỗi xảy ra, vui lòng thử lại')
    },
  })

  const onSubmit = (data: MagicLinkFormData) => {
    sendMagicLinkMutation.mutate(data)
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="flex-1"
        type="button"
      >
        <Link className="size-4 mr-1" />
        Magic Link
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Đăng nhập bằng Magic Link</DialogTitle>
            <DialogDescription>
              Nhập email của bạn và chúng tôi sẽ gửi cho bạn một link để đăng
              nhập mà không cần mật khẩu.
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
                        disabled={sendMagicLinkMutation.isPending}
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
                  disabled={sendMagicLinkMutation.isPending}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  disabled={sendMagicLinkMutation.isPending}
                >
                  {sendMagicLinkMutation.isPending
                    ? 'Đang gửi...'
                    : 'Gửi Magic Link'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default MagicLink
