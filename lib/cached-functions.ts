import { cache } from 'react'
import { headers } from 'next/headers'
import { Benefits } from '@/enums/Benefits.enum'
import { auth } from '@/lib/auth'

export const getSessionState = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const hasDatabaseAccess = session && session?.user.benefits?.includes(Benefits.DatabaseAccess)

  return {
    isLoggedIn: !!session,
    hasDatabaseAccess,
  }
})
