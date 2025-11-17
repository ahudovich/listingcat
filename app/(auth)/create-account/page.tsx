import { AuthSignUp } from '@/components/auth/sign-up'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create account',
  alternates: {
    canonical: '/create-account',
  },
}

export default function CreateAccount() {
  return <AuthSignUp />
}
