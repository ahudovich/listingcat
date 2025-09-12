'use client'

import { useId, useState, useTransition } from 'react'
import { flushSync } from 'react-dom'
import AuthSeparator from '@/components/auth/AuthSeparator'
import IconBrandsGoogle from '@/components/icons/IconBrandsGoogle'
import IconBrandsMicrosoft from '@/components/icons/IconBrandsMicrosoft'
import { BaseButton } from '@/components/ui/BaseButton'
import { BaseInput } from '@/components/ui/BaseInput'
import { APP_REDIRECT_URL } from '@/enums/constants'
import { handleSignUp } from '@/lib/actions/auth'
import { authClient } from '@/lib/auth/auth-client'

export default function SignUpForm({
  email,
  setEmail,
  setCurrentStep,
}: {
  email: string
  setEmail: (email: string) => void
  setCurrentStep: (step: 'sign-up' | 'verification') => void
}) {
  const id = useId()

  const [password, setPassword] = useState('')
  const [actionError, setActionError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  async function submitAction() {
    flushSync(() => {
      setActionError(null)
    })

    startTransition(async () => {
      const { error } = await handleSignUp(email, password)

      startTransition(() => {
        if (error) {
          setActionError(error)
        } else {
          setCurrentStep('verification')
        }
      })
    })
  }

  async function handleSocialSignUp(provider: 'google' | 'microsoft') {
    await authClient.signIn.social({
      provider,
      callbackURL: APP_REDIRECT_URL,
      newUserCallbackURL: APP_REDIRECT_URL,
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
        <div className="mb-4">
          <BaseInput
            id={`${id}-email`}
            name="email"
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div className="mb-6">
          <BaseInput
            id={`${id}-password`}
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            required
          />
        </div>

        <BaseButton className="w-full" type="submit" isLoading={isPending} disabled={isPending}>
          Sign up
        </BaseButton>
      </form>

      <AuthSeparator />

      <div className="grid gap-3">
        <BaseButton
          className="w-full"
          variant="secondary"
          onClick={() => handleSocialSignUp('google')}
        >
          <IconBrandsGoogle className="!size-4.5" />
          Sign up with Google
        </BaseButton>

        <BaseButton
          className="w-full"
          variant="secondary"
          onClick={() => handleSocialSignUp('microsoft')}
        >
          <IconBrandsMicrosoft className="!size-4.5" />
          Sign up with Microsoft
        </BaseButton>
      </div>
    </>
  )
}
