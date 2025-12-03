import { DEFAULT_LOGIN_REDIRECT } from '@/lib/auth/routes'
import { redirect } from 'next/navigation'

const Page = () => {
  redirect(DEFAULT_LOGIN_REDIRECT)
}

export default Page
