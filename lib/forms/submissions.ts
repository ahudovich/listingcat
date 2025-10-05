import z from 'zod'
import { SubmissionKind } from '@/enums/SubmissionKind.enum'
import { SubmissionState } from '@/enums/SubmissionState.enum'

export const editSubmissionFormSchema = z.object({
  resourceId: z.uuidv4(),
  kind: z.enum(SubmissionKind),
  projectSlug: z.string().min(1),
  listingUrl: z.union([z.httpUrl('Please enter a valid URL').toLowerCase().trim(), z.literal('')]),
  status: z.enum(SubmissionState, {
    error: 'Please select a status',
  }),
})

export type EditSubmissionFormSchema = z.infer<typeof editSubmissionFormSchema>
