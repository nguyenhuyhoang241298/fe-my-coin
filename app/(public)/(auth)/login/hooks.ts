import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

export const useMagicLink = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  const token = searchParams.get('token') || ''

  useEffect(() => {
    if (!email || !token) return

    const loginWithMagicLink = async () =>
      await signIn('credentials', {
        email,
        token,
        isLoginWithToken: true,
        redirect: false,
      })
        .then((res) => {
          if (!res?.error) {
            toast.success('Đăng nhập thành công')
            router.push('/dashboard')
          } else {
            toast.error('Có lỗi xảy ra khi đăng nhập bằng Magic Link')
          }
        })
        .catch(() => {
          toast.error('Có lỗi xảy ra khi đăng nhập bằng Magic Link')
        })

    loginWithMagicLink()
  }, [email, router, token])
}
