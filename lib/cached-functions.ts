import { cache } from 'react'
import { headers } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { getDB } from '@/lib/drizzle'

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
  const projects = await getDB().query.projects.findMany({
    where: (projects, { eq }) => eq(projects.userId, userId),
  })

  return projects
})

export const getProject = cache(async (userId: string, projectSlug: string) => {
  const project = await getDB().query.projects.findFirst({
    where: (projects, { and, eq }) =>
      and(eq(projects.userId, userId), eq(projects.slug, projectSlug)),
  })

  // Show 404 if project not found
  if (!project) {
    notFound()
  }

  return project
})

export const getLaunchPlatformsWithSubmissions = cache(async (projectId: string) => {
  const launchPlatforms = await getDB().query.launchPlatforms.findMany({
    with: {
      submissions: {
        where: (submissions, { eq }) => eq(submissions.projectId, projectId),
      },
    },
  })

  return launchPlatforms
})

export const getDirectoriesWithSubmissions = cache(async (projectId: string) => {
  const directories = await getDB().query.directories.findMany({
    with: {
      submissions: {
        where: (submissions, { eq }) => eq(submissions.projectId, projectId),
      },
    },
  })

  return directories
})
