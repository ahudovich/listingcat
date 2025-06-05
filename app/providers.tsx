'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { env } from '@/env'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (env.NEXT_PUBLIC_ENV !== 'production') {
      posthog.opt_out_capturing()
      return
    }

    posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: `${env.NEXT_PUBLIC_WEBSITE_BASE_URL}/ingest`,
      ui_host: env.NEXT_PUBLIC_POSTHOG_HOST,
      defaults: '2025-05-24',
    })
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
