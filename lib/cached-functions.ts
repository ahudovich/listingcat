import { cache } from 'react'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { getDB, tables } from '@/lib/drizzle'

// DEPRECATED: use `verifySession` instead
export const getSessionState = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return {
    isLoggedIn: !!session,
  }
})

export const verifySession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/login')
  }

  return {
    session,
  }
})

export const getProjects = cache(async (userId: string) => {
  const projects = await getDB()
    .select()
    .from(tables.projects)
    .where(eq(tables.projects.userId, userId))

  return projects
})
