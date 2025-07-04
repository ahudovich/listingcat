import { cache } from 'react'
import { headers } from 'next/headers'
import { Benefits } from '@/enums/Benefits.enum'
import { auth } from '@/lib/auth'

export const getSessionState = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const hasProAccess = session && session?.user.benefits?.includes(Benefits.ProAccess)

  return {
    isLoggedIn: !!session,
    hasProAccess,
  }
})
