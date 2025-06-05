import * as Sentry from '@sentry/nextjs'
import { env } from './env'

if (env.NEXT_PUBLIC_ENV === 'production') {
  Sentry.init({
    dsn: env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 0.25,
  })
}

export const onRouterTransitionStart =
  env.NEXT_PUBLIC_ENV === 'production' ? Sentry.captureRouterTransitionStart : null
