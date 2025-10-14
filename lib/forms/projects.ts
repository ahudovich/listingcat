import z from 'zod'

const projectNameSchema = z
  .string()
  .trim()
  .min(1, 'Please enter a project name')
  .max(60, 'Project name must be 60 characters or less')
const projectSlugSchema = z.string().trim().min(1, 'Please enter a project slug')
const projectWebsiteUrlSchema = z.httpUrl('Please enter a valid URL').toLowerCase().trim()

export const createProjectFormSchema = z.object({
  name: projectNameSchema,
  websiteUrl: projectWebsiteUrlSchema,
})

export type CreateProjectFormSchema = z.infer<typeof createProjectFormSchema>

export const updateProjectFormSchema = z.object({
  id: z.uuid(),
  name: projectNameSchema,
  slug: projectSlugSchema,
  websiteUrl: projectWebsiteUrlSchema,
})

export type UpdateProjectFormSchema = z.infer<typeof updateProjectFormSchema>

export const deleteProjectFormSchema = z.object({
  id: z.uuid(),
  slug: projectSlugSchema,
  name: projectNameSchema,
})

export type DeleteProjectFormSchema = z.infer<typeof deleteProjectFormSchema>
