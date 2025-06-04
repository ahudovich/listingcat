import type { Env } from '@/types/env'

export const BASE_URL =
  (process.env.NEXT_PUBLIC_ENV as Env) !== 'preview'
    ? process.env.NEXT_PUBLIC_WEBSITE_BASE_URL
    : `https://${process.env.VERCEL_BRANCH_URL}`
