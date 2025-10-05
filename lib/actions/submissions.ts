'use server'

import { revalidatePath } from 'next/cache'
import * as Sentry from '@sentry/nextjs'
import z, { ZodError } from 'zod'
import { SubmissionKind } from '@/enums/SubmissionKind.enum'
import { SubmissionType } from '@/enums/SubmissionType.enum'
import { getProject, verifySession } from '@/lib/cached-functions'
import { getDB, tables } from '@/lib/drizzle'
import { editSubmissionFormSchema } from '@/lib/forms/submissions'
import type { EditSubmissionFormSchema } from '@/lib/forms/submissions'
import type { FormActionResult } from '@/types/validation'

export type EditSubmissionFormResult = FormActionResult<EditSubmissionFormSchema>

export async function editSubmissionAction(payload: unknown): Promise<EditSubmissionFormResult> {
  const { session } = await verifySession()

  try {
    // Validate form data
    const result = editSubmissionFormSchema.safeParse(payload)

    if (!result.success) {
      throw result.error
    }

    // Get the project
    const project = await getProject(session.user.id, result.data.projectSlug)

    const newSubmission = {
      projectId: project.id,
      // Empty string must be converted to null
      listingUrl: result.data.listingUrl || null,
      status: result.data.status,
      type: SubmissionType.User,
    }

    const updatedSubmission = {
      // Empty string must be converted to null
      listingUrl: result.data.listingUrl || null,
      status: result.data.status,
      type: SubmissionType.User,
    }

    // Save to database
    switch (result.data.kind) {
      case SubmissionKind.Directory: {
        await getDB()
          .insert(tables.directorySubmissions)
          .values({
            ...newSubmission,
            directoryId: result.data.resourceId,
          })
          .onConflictDoUpdate({
            target: [
              tables.directorySubmissions.projectId,
              tables.directorySubmissions.directoryId,
            ],
            set: updatedSubmission,
          })

        break
      }

      case SubmissionKind.LaunchPlatform: {
        await getDB()
          .insert(tables.launchPlatformSubmissions)
          .values({
            ...newSubmission,
            launchPlatformId: result.data.resourceId,
          })
          .onConflictDoUpdate({
            target: [
              tables.launchPlatformSubmissions.projectId,
              tables.launchPlatformSubmissions.launchPlatformId,
            ],
            set: updatedSubmission,
          })

        break
      }
    }

    // Revalidate the page
    revalidatePath(`/app/project/${result.data.projectSlug}/${result.data.kind}`)

    return { status: 'success' }
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
      error: 'Failed to update submission. Please try again.',
    }
  }
}
