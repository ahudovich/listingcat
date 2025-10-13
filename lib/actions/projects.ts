'use server'

import { revalidatePath } from 'next/cache'
import * as Sentry from '@sentry/nextjs'
import slug from 'slug'
import z, { ZodError } from 'zod'
import { verifySession } from '@/lib/cached-functions'
import { projects } from '@/lib/db/schema/tables/projects'
import { db } from '@/lib/drizzle'
import { createProjectFormSchema } from '@/lib/forms/projects'
import type { CreateProjectFormSchema } from '@/lib/forms/projects'
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
