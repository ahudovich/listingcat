import AuthSignUp from '@/components/auth/AuthSignUp'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create account | Listing Cat',
}

export default function CreateAccount() {
  return <AuthSignUp />
}
