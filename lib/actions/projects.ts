'use server'

import { revalidatePath } from 'next/cache'
import { redirect, RedirectType } from 'next/navigation'
import * as Sentry from '@sentry/nextjs'
import { and, eq } from 'drizzle-orm'
import slug from 'slug'
import z, { ZodError } from 'zod'
import { verifySession } from '@/lib/cached-functions'
import { projects } from '@/lib/db/schema/tables/projects'
import { db } from '@/lib/drizzle'
import { createProjectFormSchema, updateProjectFormSchema } from '@/lib/forms/projects'
import type { CreateProjectFormSchema, UpdateProjectFormSchema } from '@/lib/forms/projects'
import type { FormActionResult } from '@/types/validation'

export type CreateProjectFormResult = FormActionResult<CreateProjectFormSchema, { slug: string }>

export async function createProjectAction(payload: unknown): Promise<CreateProjectFormResult> {
  const { session } = await verifySession()

  try {
    // Validate form data
    const result = createProjectFormSchema.safeParse(payload)

    if (!result.success) {
      throw result.error
    }

    // Generate URL-friendly slug
    const projectSlug = slug(result.data.name)

    // Save to database
    await db.insert(projects).values({
      userId: session.user.id,
      name: result.data.name,
      slug: projectSlug,
      websiteUrl: result.data.websiteUrl,
    })

    // Revalidate the layout (it's needed to refresh the sidebar)
    revalidatePath('/app', 'layout')

    return {
      status: 'success',
      slug: projectSlug,
    }
  } catch (error: unknown) {
    // Validation errors
    if (error instanceof ZodError) {
      return {
        status: 'error',
        error: 'Form contains errors.',
        validationErrors: z.flattenError(error).fieldErrors,
      }
    }

    Sentry.captureException(error)

    // Other errors
    return {
      status: 'error',
      error: 'Failed to create project. Please try again.',
    }
  }
}

export type UpdateProjectFormResult = FormActionResult<UpdateProjectFormSchema>

export async function updateProjectAction(payload: unknown): Promise<UpdateProjectFormResult> {
  const { session } = await verifySession()

  let result
  let newSlug: string

  try {
    // Validate form data
    result = updateProjectFormSchema.safeParse(payload)

    if (!result.success) {
      throw result.error
    }

    // Generate URL-friendly slug
    newSlug = slug(result.data.name)

    // Save to database
    await db
      .update(projects)
      .set({
        name: result.data.name,
        slug: newSlug,
        websiteUrl: result.data.websiteUrl,
      })
      .where(and(eq(projects.userId, session.user.id), eq(projects.id, result.data.id)))
  } catch (error: unknown) {
    // Validation errors
    if (error instanceof ZodError) {
      return {
        status: 'error',
        error: 'Form contains errors.',
        validationErrors: z.flattenError(error).fieldErrors,
      }
    }

    Sentry.captureException(error)

    // Other errors
    return {
      status: 'error',
      error: 'Failed to update project. Please try again.',
    }
  }

  if (newSlug === result.data.slug) {
    // Revalidate the layout (it's needed to refresh the sidebar)
    revalidatePath(`/app/project/${result.data.slug}/settings`, 'layout')
  } else {
    // Redirect to the new slug
    redirect(`/app/project/${newSlug}/settings`, RedirectType.replace)
  }

  return {
    status: 'success',
  }
}
