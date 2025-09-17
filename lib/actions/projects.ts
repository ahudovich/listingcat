'use server'

import * as Sentry from '@sentry/nextjs'
import slug from 'slug'
import { z } from 'zod'
import { verifySession } from '@/lib/cached-functions'
import { getDB, tables } from '@/lib/drizzle'

const ProjectSchema = z.object({
  name: z.string().min(1),
  websiteUrl: z.url('Please enter a valid URL'),
})

export type CreateProjectResult =
  | {
      success: false
      error?: string
    }
  | {
      success: true
      slug: string
    }

export async function createProject(
  currentState: CreateProjectResult | null,
  formData: FormData
): Promise<CreateProjectResult> {
  const { session } = await verifySession()

  try {
    // Extract and validate form data
    const rawFormData = {
      name: formData.get('name')?.toString() ?? '',
      websiteUrl: formData.get('websiteUrl')?.toString() ?? '',
    }

    const validationResult = ProjectSchema.safeParse(rawFormData)

    if (!validationResult.success) {
      return {
        success: false,
        error: 'Please fill in all fields correctly.',
      }
    }

    const { name, websiteUrl } = validationResult.data

    // Generate URL-friendly slug
    const projectSlug = slug(name)

    // Save to database
    await getDB().insert(tables.projects).values({
      userId: session.user.id,
      name: name.trim(),
      slug: projectSlug,
      websiteUrl: websiteUrl.trim(),
    })

    return { success: true, slug: projectSlug }
  } catch (error) {
    Sentry.captureException(error)

    return {
      success: false,
      error: 'Failed to create project. Please try again.',
    }
  }
}
