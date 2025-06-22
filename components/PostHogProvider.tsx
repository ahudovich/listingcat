'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'
import { authClient } from '@/lib/auth/auth-client'

export default function PostHogProvider() {
  const { data: session } = authClient.useSession()

  useEffect(() => {
    if (session?.user.id) {
      const distinctId = posthog.get_distinct_id()

      if (distinctId !== session.user.id) {
        posthog.identify(session.user.id, {
          name: session.user.name,
          email: session.user.email,
        })
      }
    }
  }, [session?.user.id, session?.user.name, session?.user.email])

  return null
}
