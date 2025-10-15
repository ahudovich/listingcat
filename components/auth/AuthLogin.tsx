'use client'

import { useId, useState, useTransition } from 'react'
import { flushSync } from 'react-dom'
import Link from 'next/link'
import { AuthCard } from '@/components/auth/AuthCard'
import { AuthSeparator } from '@/components/auth/AuthSeparator'
import { IconBrandsGoogle } from '@/components/icons/IconBrandsGoogle'
import { IconBrandsMicrosoft } from '@/components/icons/IconBrandsMicrosoft'
import { BaseBadge } from '@/components/ui/BaseBadge'
import { BaseButton } from '@/components/ui/BaseButton'
import { BaseInput } from '@/components/ui/BaseInput'
import { APP_REDIRECT_URL } from '@/enums/constants'
import { handleSignIn } from '@/lib/actions/auth'
import { authClient } from '@/lib/auth/auth-client'

const socialProviders = [
  {
    provider: 'google',
    icon: IconBrandsGoogle,
    label: 'Sign in with Google',
  },
  {
    provider: 'microsoft',
    icon: IconBrandsMicrosoft,
    label: 'Sign in with Microsoft',
  },
] as const

export function AuthLogin() {
  const id = useId()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [actionError, setActionError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  // Get the last used login method
  const lastLoginMethod = authClient.getLastUsedLoginMethod()

  async function submitAction() {
    flushSync(() => {
      setActionError(null)
    })

    startTransition(async () => {
      const { error } = await handleSignIn(email, password)

      if (error) {
        startTransition(() => {
          setActionError(error)
        })
      } else {
        window.location.href = APP_REDIRECT_URL
      }
    })
  }

  async function handleSocialSignIn(provider: (typeof socialProviders)[number]['provider']) {
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

        <div className="relative">
          <BaseButton className="w-full" type="submit" isLoading={isPending} disabled={isPending}>
            Log in
          </BaseButton>
          {lastLoginMethod === 'email' && <LastLoginMethodBadge />}
        </div>
      </form>

      <AuthSeparator />

      <div className="grid gap-3">
        {socialProviders.map((item) => (
          <div className="relative" key={item.provider}>
            <BaseButton
              className="w-full"
              variant="secondary"
              onClick={() => handleSocialSignIn(item.provider)}
            >
              <item.icon className="!size-4.5" />
              {item.label}
            </BaseButton>
            {lastLoginMethod === item.provider && <LastLoginMethodBadge />}
          </div>
        ))}
      </div>
    </AuthCard>
  )
}

function LastLoginMethodBadge() {
  return (
    <BaseBadge
      className="absolute -top-1.5 -right-1.5 font-bold uppercase"
      variant="green"
      suppressHydrationWarning={true}
    >
      Last
    </BaseBadge>
  )
}
