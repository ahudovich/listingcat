import AuthLogin from '@/components/auth/AuthLogin'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
  alternates: {
    canonical: '/login',
  },
}

export default function CreateAccount() {
  return <AuthLogin />
}
