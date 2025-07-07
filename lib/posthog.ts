import { PostHog } from 'posthog-node'
import { env } from '../env'
import type { EventMessage } from 'posthog-node'

export function getPosthogServerClient() {
  const posthogClient = new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY, {
    host: env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  })

  return posthogClient
}

export async function capturePosthogEvent(event: EventMessage) {
  const posthog = getPosthogServerClient()

  posthog.capture(event)

  await posthog.shutdown()
}
