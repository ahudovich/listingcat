'use server'

import { revalidatePath } from 'next/cache'
import * as Sentry from '@sentry/nextjs'
import { createServerValidate, ServerValidateError } from '@tanstack/react-form/nextjs'
import { SubmissionKind } from '@/enums/SubmissionKind.enum'
import { SubmissionType } from '@/enums/SubmissionType.enum'
import { getProject, verifySession } from '@/lib/cached-functions'
import { getDB, tables } from '@/lib/drizzle'
import { editSubmissionSchema, getEditSubmissionFormOptions } from '@/lib/forms/submissions'
import { getZodErrorsAsArray } from '@/utils/validation'

export type EditSubmissionResult =
  | {
      success: false
      errors?: Array<string>
    }
  | { success: true }

export const validateEditSubmissionForm = createServerValidate({
  ...getEditSubmissionFormOptions(),
  onServerValidate: editSubmissionSchema,
})

export async function editSubmissionAction(
  currentState: unknown,
  formData: FormData
): Promise<EditSubmissionResult> {
  const { session } = await verifySession()

  try {
    // Validate form data
    const validatedData = await validateEditSubmissionForm(formData)

    // Get the project
    const project = await getProject(session.user.id, validatedData.projectSlug)

    // Save to database
    switch (validatedData.kind) {
      case SubmissionKind.Directory: {
        await getDB()
          .insert(tables.directorySubmissions)
          .values({
            projectId: project.id,
            directoryId: validatedData.resourceId,
            type: SubmissionType.User,
            listingUrl: validatedData.listingUrl,
            status: validatedData.status,
          })
          .onConflictDoUpdate({
            target: [
              tables.directorySubmissions.projectId,
              tables.directorySubmissions.directoryId,
            ],
            set: {
              type: SubmissionType.User,
              listingUrl: validatedData.listingUrl,
              status: validatedData.status,
            },
          })

        break
      }

      case SubmissionKind.LaunchPlatform: {
        await getDB()
          .insert(tables.launchPlatformSubmissions)
          .values({
            projectId: project.id,
            launchPlatformId: validatedData.resourceId,
            type: SubmissionType.User,
            listingUrl: validatedData.listingUrl,
            status: validatedData.status,
          })
          .onConflictDoUpdate({
            target: [
              tables.launchPlatformSubmissions.projectId,
              tables.launchPlatformSubmissions.launchPlatformId,
            ],
            set: {
              type: SubmissionType.User,
              listingUrl: validatedData.listingUrl,
              status: validatedData.status,
            },
          })

        break
      }
    }

    // Revalidate the page
    revalidatePath(`/app/project/${validatedData.projectSlug}/${validatedData.kind}`)

    return { success: true }
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
      errors: ['Failed to update submission. Please try again.'],
    }
  }
}
