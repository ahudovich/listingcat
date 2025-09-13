'use client'

import { useId, useState, useTransition } from 'react'
import { flushSync } from 'react-dom'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AuthCard from '@/components/auth/AuthCard'
import AuthSeparator from '@/components/auth/AuthSeparator'
import IconBrandsGoogle from '@/components/icons/IconBrandsGoogle'
import IconBrandsMicrosoft from '@/components/icons/IconBrandsMicrosoft'
import { BaseButton } from '@/components/ui/BaseButton'
import { BaseInput } from '@/components/ui/BaseInput'
import { APP_REDIRECT_URL } from '@/enums/constants'
import { handleSignIn } from '@/lib/actions/auth'
import { authClient } from '@/lib/auth/auth-client'

export default function AuthLogin() {
  const id = useId()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [actionError, setActionError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  async function submitAction() {
    flushSync(() => {
      setActionError(null)
    })

    startTransition(async () => {
      const { error } = await handleSignIn(email, password)

      startTransition(() => {
        if (error) {
          setActionError(error)
        } else {
          router.replace(APP_REDIRECT_URL)
        }
      })
    })
  }

  async function handleSocialSignIn(provider: 'google' | 'microsoft') {
    await authClient.signIn.social({
      provider,
      callbackURL: APP_REDIRECT_URL,
      newUserCallbackURL: APP_REDIRECT_URL,
    })
  }

  const description = (
    <>
      Don&apos;t have an account?{' '}
      <Link
        className="border-b border-b-current font-medium text-primary transition-colors hover:border-b-accent hover:text-accent"
        href="/create-account"
      >
        Sign up
      </Link>
    </>
  )

  return (
    <AuthCard title="Welcome" description={description}>
      {actionError && (
        <p className="mb-4 px-3 py-2 bg-red-100 border border-red-200 rounded-control text-sm text-red-700">
          {actionError}
        </p>
      )}

      <form action={submitAction}>
        <div className="mb-4">
          <BaseInput
            id={`${id}-email`}
            label="Email"
            type="email"
            value={email}
            required={true}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
          />
        </div>

        <div className="mb-6">
          <BaseInput
            id={`${id}-password`}
            label="Password"
            type="password"
            value={password}
            required={true}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />
        </div>

        <BaseButton className="w-full" type="submit" isLoading={isPending} disabled={isPending}>
          Log in
        </BaseButton>
      </form>

      <AuthSeparator />

      <div className="grid gap-3">
        <BaseButton
          className="w-full"
          variant="secondary"
          onClick={() => handleSocialSignIn('google')}
        >
          <IconBrandsGoogle className="!size-4.5" />
          Sign in with Google
        </BaseButton>

        <BaseButton
          className="w-full"
          variant="secondary"
          onClick={() => handleSocialSignIn('microsoft')}
        >
          <IconBrandsMicrosoft className="!size-4.5" />
          Sign in with Microsoft
        </BaseButton>
      </div>
    </AuthCard>
  )
}
