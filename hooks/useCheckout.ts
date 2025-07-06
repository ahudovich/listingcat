import { useState } from 'react'
import * as Sentry from '@sentry/nextjs'
import { ofetch } from 'ofetch'
import posthog from 'posthog-js'
import { PostHogEvents } from '@/enums/PostHogEvents.enum'

export function useCheckout() {
  const [checkoutError, setCheckoutError] = useState<Error | null>(null)

  async function handleCheckout() {
    setCheckoutError(null)

    try {
      const { sessionUrl } = await ofetch<{ sessionUrl: string }>('/api/checkout/create-session')

      window.location.href = sessionUrl
    } catch (error: unknown) {
      Sentry.captureException(error)
      setCheckoutError(error as Error)
    } finally {
      posthog.capture(PostHogEvents.UpgradeButtonClicked)
    }
  }

  return {
    checkoutError,
    handleCheckout,
  }
}
