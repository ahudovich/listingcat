import { cache } from 'react'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'

export const getSessionState = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return {
    isLoggedIn: !!session,
  }
})
