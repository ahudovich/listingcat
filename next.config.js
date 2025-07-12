import { fileURLToPath } from 'node:url'
import { withContentCollections } from '@content-collections/next'
import { withSentryConfig } from '@sentry/nextjs'
import { createJiti } from 'jiti'

const jiti = createJiti(fileURLToPath(import.meta.url))

// Validate env variables
await jiti.import('./env')

/** @type {import('next').NextConfig} */
const nextConfig = {}

const sentryConfig = withSentryConfig(nextConfig, {
  org: 'listingcat',
  project: 'listingcat-next',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  tunnelRoute: '/monitoring',

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,
})

export default withContentCollections(sentryConfig)
