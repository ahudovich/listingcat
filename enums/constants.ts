import type { Env } from '@/types/env'

export const APP_REDIRECT_URL = '/app/websites/launch-platforms'
export const COOKIE_PREFIX = 'listingcat'

export const BASE_URL =
  (process.env.NEXT_PUBLIC_ENV as Env) !== 'preview'
    ? process.env.NEXT_PUBLIC_WEBSITE_BASE_URL
    : `https://${process.env.VERCEL_BRANCH_URL}`
