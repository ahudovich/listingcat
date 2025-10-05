import z from 'zod'

export const createProjectFormSchema = z.object({
  name: z.string().min(1, 'Please enter a project name').trim(),
  websiteUrl: z.httpUrl('Please enter a valid URL').toLowerCase().trim(),
})

export type CreateProjectFormSchema = z.infer<typeof createProjectFormSchema>
