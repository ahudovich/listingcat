import { formOptions } from '@tanstack/react-form/nextjs'
import z from 'zod'

// Create Project Form
export const createProjectSchema = z.object({
  name: z.string().min(1, 'Please enter a project name'),
  websiteUrl: z.url('Please enter a valid URL'),
})

export type CreateProjectFormValues = z.infer<typeof createProjectSchema>

export const createProjectFormOptions = formOptions({
  defaultValues: {
    name: '',
    websiteUrl: '',
  } as CreateProjectFormValues,
})
