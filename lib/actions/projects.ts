'use server'

import { revalidatePath } from 'next/cache'
import * as Sentry from '@sentry/nextjs'
import { createServerValidate, ServerValidateError } from '@tanstack/react-form/nextjs'
import slug from 'slug'
import { verifySession } from '@/lib/cached-functions'
import { getDB, tables } from '@/lib/drizzle'
import { createProjectFormOptions, createProjectSchema } from '@/lib/forms/projects'
import { getZodErrorsAsArray } from '@/utils/validation'

export type CreateProjectResult =
  | {
      success: false
      errors?: Array<string>
    }
  | {
      success: true
      slug: string
    }

export const validateCreateProjectForm = createServerValidate({
  ...createProjectFormOptions,
  onServerValidate: createProjectSchema,
})

export async function createProjectAction(
  currentState: unknown,
  formData: FormData
): Promise<CreateProjectResult> {
  const { session } = await verifySession()

  try {
    // Validate form data
    const validatedData = await validateCreateProjectForm(formData)

    // Generate URL-friendly slug
    const projectSlug = slug(validatedData.name)

    // Save to database
    await getDB().insert(tables.projects).values({
      userId: session.user.id,
      name: validatedData.name.trim(),
      slug: projectSlug,
      websiteUrl: validatedData.websiteUrl.trim(),
    })

    // Revalidate the layout to refresh the sidebar
    revalidatePath('/app', 'layout')

    return { success: true, slug: projectSlug }
  } catch (error: unknown) {
    Sentry.captureException(error)

    // Form validation error
    if (error instanceof ServerValidateError) {
      return {
        success: false,
        errors: getZodErrorsAsArray(error.formState.errors) ?? [error.message],
      }
    }

    // Other errors
    return {
      success: false,
      errors: ['Failed to create project. Please try again.'],
    }
  }
}
