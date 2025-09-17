import { cache } from 'react'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { and, eq } from 'drizzle-orm'
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

export const getProject = cache(async (userId: string, projectSlug: string) => {
  const project = await getDB()
    .select()
    .from(tables.projects)
    .where(and(eq(tables.projects.userId, userId), eq(tables.projects.slug, projectSlug)))

  return project[0]
})
