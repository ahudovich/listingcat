import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    BETTER_AUTH_SECRET: z.string().min(1),
    DATABASE_URL: z.url(),
    DISCORD_CRON_WEBHOOK_URL: z.url(),
    DISCORD_GENERAL_WEBHOOK_URL: z.url(),
    DISCORD_RESOURCE_REQUEST_WEBHOOK_URL: z.url(),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    MICROSOFT_CLIENT_ID: z.string().min(1),
    MICROSOFT_CLIENT_SECRET: z.string().min(1),
    R2_ACCESS_KEY_ID: z.string().min(1),
    R2_BUCKET: z.string().min(1),
    R2_ENDPOINT: z.url(),
    R2_SECRET_ACCESS_KEY: z.string().min(1),
    RAPIDAPI_HOST: z.string().min(1),
    RAPIDAPI_KEY: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    SENTRY_AUTH_TOKEN: z.string().min(1),
    TRIGGER_SECRET_KEY: z.string().min(1),
    VERCEL_ACCESS_TOKEN: z.string().min(1),
    VERCEL_PROJECT_ID: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_ASSETS_BASE_URL: z.url(),
    NEXT_PUBLIC_ENV: z.enum(['development', 'preview', 'production']),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().min(1),
    NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1),
    NEXT_PUBLIC_SENTRY_DSN: z.string().min(1),
    NEXT_PUBLIC_WEBSITE_BASE_URL: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_ASSETS_BASE_URL: process.env.NEXT_PUBLIC_ASSETS_BASE_URL,
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_WEBSITE_BASE_URL: process.env.NEXT_PUBLIC_WEBSITE_BASE_URL,
  },
})
