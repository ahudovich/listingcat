import { useState } from 'react'
import * as Sentry from '@sentry/nextjs'
import { ofetch } from 'ofetch'

export function useCheckout() {
  const [checkoutError, setCheckoutError] = useState<Error | null>(null)

  async function handleCheckout() {
    try {
      const { sessionUrl } = await ofetch<{ sessionUrl: string }>('/api/checkout/create-session')

      window.location.href = sessionUrl
    } catch (error: unknown) {
      Sentry.captureException(error)
      setCheckoutError(error as Error)
    }
  }

  return {
    checkoutError,
    handleCheckout,
  }
}
