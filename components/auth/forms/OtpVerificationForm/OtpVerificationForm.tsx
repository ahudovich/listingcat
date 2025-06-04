'use client'

import { useId, useState, useTransition } from 'react'
import { flushSync } from 'react-dom'
import { useRouter } from 'next/navigation'
import BaseButton from '@/components/ui/BaseButton'
import BaseInput from '@/components/ui/BaseInput'
import { APP_REDIRECT_URL } from '@/enums/constants'
import { handleOtpVerification } from '@/lib/actions/auth'

export default function OtpVerificationForm({ email }: { email: string }) {
  const id = useId()
  const router = useRouter()

  const [otpCode, setOtpCode] = useState('')
  const [actionError, setActionError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  async function submitAction() {
    flushSync(() => {
      setActionError(null)
    })

    startTransition(async () => {
      const { error } = await handleOtpVerification(email, otpCode)

      startTransition(() => {
        if (error) {
          setActionError(error)
        } else {
          router.replace(APP_REDIRECT_URL)
        }
      })
    })
  }

  return (
    <>
      {actionError && (
        <p className="mb-4 px-3 py-2 bg-red-100 border border-red-200 rounded-control text-sm text-red-700">
          {actionError}
        </p>
      )}

      <form action={submitAction}>
        <div className="mb-6">
          <BaseInput
            id={`${id}-otp`}
            label="OTP code (6 digits)"
            name="otp"
            type="text"
            value={otpCode}
            onChange={(event) => setOtpCode(event.target.value)}
            inputMode="numeric"
            autoComplete="one-time-code"
            required
          />
        </div>

        <BaseButton className="w-full" type="submit" isLoading={isPending} disabled={isPending}>
          Verify
        </BaseButton>
      </form>
    </>
  )
}
