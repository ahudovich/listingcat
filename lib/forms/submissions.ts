import { formOptions } from '@tanstack/react-form/nextjs'
import z from 'zod'
import { SubmissionKind } from '@/enums/SubmissionKind.enum'
import { SubmissionState } from '@/enums/SubmissionState.enum'
import type { DirectorySubmission } from '@/lib/db/schema/tables/directory-submissions'
import type { LaunchPlatformSubmission } from '@/lib/db/schema/tables/launch-platform-submissions'

// Create Submission Form
export const editSubmissionSchema = z.object({
  resourceId: z.uuidv4(),
  kind: z.enum(SubmissionKind),
  projectSlug: z.string().min(1),
  listingUrl: z
    .string()
    .transform((val) => (val === '' ? undefined : val))
    .pipe(z.optional(z.url('Please enter a valid URL'))),
  status: z.enum(SubmissionState, {
    error: 'Please select a status',
  }),
})

export type EditSubmissionFormValues = z.infer<typeof editSubmissionSchema>

export function getEditSubmissionFormOptions(
  resourceId?: string,
  projectSlug?: string,
  kind?: SubmissionKind,
  submission?: DirectorySubmission | LaunchPlatformSubmission
) {
  return formOptions({
    defaultValues: {
      resourceId,
      projectSlug,
      kind,
      listingUrl: submission?.listingUrl ?? '',
      status: submission?.status ?? null,
    } as EditSubmissionFormValues,
  })
}
