'use server'

import { revalidatePath } from 'next/cache'
import * as Sentry from '@sentry/nextjs'
import { sql } from 'drizzle-orm'
import z, { ZodError } from 'zod'
import { SubmissionKind, SubmissionType } from '@/enums/submission'
import { getProject, verifySession } from '@/lib/cached-functions'
import { directorySubmissions } from '@/lib/db/schema/tables/directory-submissions'
import { launchPlatformSubmissions } from '@/lib/db/schema/tables/launch-platform-submissions'
import { db } from '@/lib/drizzle'
import { editSubmissionFormSchema } from '@/lib/forms/submissions'
import type { SubmissionStatus } from '@/enums/submission'
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
        await db
          .insert(directorySubmissions)
          .values({
            ...newSubmission,
            directoryId: result.data.resourceId,
          })
          .onConflictDoUpdate({
            target: [directorySubmissions.projectId, directorySubmissions.directoryId],
            set: updatedSubmission,
          })

        break
      }

      case SubmissionKind.LaunchPlatform: {
        await db
          .insert(launchPlatformSubmissions)
          .values({
            ...newSubmission,
            launchPlatformId: result.data.resourceId,
          })
          .onConflictDoUpdate({
            target: [
              launchPlatformSubmissions.projectId,
              launchPlatformSubmissions.launchPlatformId,
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

export async function bulkUpdateSubmissionStatusAction(payload: {
  itemsIds: Array<string>
  kind: SubmissionKind
  newStatus: SubmissionStatus
  projectSlug: string
}): Promise<EditSubmissionFormResult> {
  const { session } = await verifySession()

  try {
    // Get the project
    const project = await getProject(session.user.id, payload.projectSlug)

    // Save to database
    switch (payload.kind) {
      case SubmissionKind.Directory: {
        const newSubmissions = payload.itemsIds.map((directoryId) => ({
          directoryId,
          projectId: project.id,
          status: payload.newStatus,
          type: SubmissionType.User,
        }))

        await db.transaction(async (tx) => {
          return tx
            .insert(directorySubmissions)
            .values(newSubmissions)
            .onConflictDoUpdate({
              target: [directorySubmissions.projectId, directorySubmissions.directoryId],
              set: {
                status: sql`excluded.status`,
                type: sql`excluded.type`,
              },
            })
        })

        break
      }

      case SubmissionKind.LaunchPlatform: {
        const newSubmissions = payload.itemsIds.map((launchPlatformId) => ({
          launchPlatformId,
          projectId: project.id,
          status: payload.newStatus,
          type: SubmissionType.User,
        }))

        await db.transaction(async (tx) => {
          return tx
            .insert(launchPlatformSubmissions)
            .values(newSubmissions)
            .onConflictDoUpdate({
              target: [
                launchPlatformSubmissions.projectId,
                launchPlatformSubmissions.launchPlatformId,
              ],
              set: {
                status: sql`excluded.status`,
                type: sql`excluded.type`,
              },
            })
        })

        break
      }
    }

    // Revalidate the page
    revalidatePath(`/app/project/${payload.projectSlug}/${payload.kind}`)

    return { status: 'success' }
  } catch (error: unknown) {
    Sentry.captureException(error)

    // Other errors
    return {
      status: 'error',
      error: 'Failed to update submissions. Please try again.',
    }
  }
}
