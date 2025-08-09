import PaymentVerification from '@/components/auth/PaymentVerification'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Payment Verification',
}

export default function PaymentVerificationPage() {
  return (
    <div>
      <PaymentVerification />
    </div>
  )
}
