import z from 'zod'
import { SubmissionKind, SubmissionStatus } from '@/enums/submission'

export const editSubmissionFormSchema = z.object({
  resourceId: z.uuidv7(),
  kind: z.enum(SubmissionKind),
  projectSlug: z.string().min(1),
  listingUrl: z.union([z.httpUrl('Please enter a valid URL').toLowerCase().trim(), z.literal('')]),
  status: z.enum(SubmissionStatus, {
    error: 'Please select a status',
  }),
})

export type EditSubmissionFormSchema = z.infer<typeof editSubmissionFormSchema>
