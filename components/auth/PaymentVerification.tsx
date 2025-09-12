'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight02Icon,
  CancelCircleIcon,
  CheckmarkCircle02Icon,
  Loading03Icon,
} from '@hugeicons/core-free-icons'
import * as Sentry from '@sentry/nextjs'
import confetti from 'canvas-confetti'
import { ofetch } from 'ofetch'
import AuthCard from '@/components/auth/AuthCard'
import { BaseButton } from '@/components/ui/BaseButton'
import { BaseIcon } from '@/components/ui/BaseIcon'
import { EMAILS } from '@/data/emails'
import { APP_REDIRECT_URL } from '@/enums/constants'

export default function PaymentVerification() {
  const [status, setStatus] = useState<'verifying' | 'verified' | 'error'>('verifying')

  // Check payment status every 1.5 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const { paymentStatus } = await ofetch<{ paymentStatus: 'paid' | 'pending' }>(
          '/api/payment/status'
        )

        if (paymentStatus === 'paid') {
          setStatus('verified')
          clearInterval(interval)

          // Show confetti animation
          confetti({
            disableForReducedMotion: true,
            particleCount: 150,
            spread: 100,
            origin: { y: 0.7 },
          })
        }

        // Continue fetching (no action needed)
      } catch (error) {
        setStatus('error')
        clearInterval(interval)
        Sentry.captureException(error)
      }
    }, 1_500)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {status === 'verifying' && (
        <AuthCard
          title="Verifying your payment"
          description="Please hold on while we complete the verification. This should only take a moment."
        >
          <BaseIcon
            className="my-8 mx-auto size-8 text-secondary animate-spin-slow"
            icon={Loading03Icon}
            strokeWidth={2.5}
          />

          <p className="text-xs text-center">
            Need help?{' '}
            <a
              className="border-b border-b-current text-secondary transition-colors hover:text-accent hover:border-b-accent"
              href={`mailto:${EMAILS.SUPPORT}`}
            >
              {EMAILS.SUPPORT}
            </a>
          </p>
        </AuthCard>
      )}

      {status === 'verified' && (
        <AuthCard
          title="Welcome to Listing Cat!"
          description={
            <>
              Your payment was successfully verified.
              <br />
              Enjoy the full access to the database!
            </>
          }
          icon={
            <BaseIcon
              className="mx-auto size-10 text-green-600"
              icon={CheckmarkCircle02Icon}
              strokeWidth={2.5}
            />
          }
        >
          <div className="text-center">
            <BaseButton className="group" asChild>
              <Link href={APP_REDIRECT_URL}>
                Open the app
                <BaseIcon
                  className="shrink-0 transition-transform group-hover:translate-x-1"
                  icon={ArrowRight02Icon}
                  strokeWidth={2.5}
                />
              </Link>
            </BaseButton>
          </div>
        </AuthCard>
      )}

      {status === 'error' && (
        <AuthCard
          title="Payment verification failed"
          description={
            <>
              Something went wrong while verifying your payment.
              <br />
              Please contact us at{' '}
              <a
                className="border-b border-b-current text-secondary transition-colors hover:text-accent hover:border-b-accent"
                href={`mailto:${EMAILS.SUPPORT}`}
              >
                {EMAILS.SUPPORT}
              </a>
            </>
          }
          icon={
            <BaseIcon
              className="mx-auto size-10 text-red-600"
              icon={CancelCircleIcon}
              strokeWidth={2.5}
            />
          }
        />
      )}
    </>
  )
}
