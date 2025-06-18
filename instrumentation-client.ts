import * as Sentry from '@sentry/nextjs'
import posthog from 'posthog-js'
import { env } from './env'

if (env.NEXT_PUBLIC_ENV === 'production') {
  // PostHog
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: `${env.NEXT_PUBLIC_WEBSITE_BASE_URL}/api2`,
    ui_host: env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: 'history_change',
    defaults: '2025-05-24',
  })

  // Sentry
  Sentry.init({
    dsn: env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 0.25,
  })
}

// Sentry
export const onRouterTransitionStart =
  env.NEXT_PUBLIC_ENV === 'production' ? Sentry.captureRouterTransitionStart : null
