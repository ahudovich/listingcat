'use server'

import * as Sentry from '@sentry/nextjs'
import { z } from 'zod'
import { sendDiscordNotification } from '@/lib/discord'
import { getDB, tables } from '@/lib/drizzle'

const schema = z.object({
  name: z.string(),
  websiteUrl: z.url('Please enter a valid URL'),
})

export interface SubmitResourceResult {
  success: boolean
  error?: string
}

export async function submitResource(
  currentState: SubmitResourceResult | null,
  formData: FormData
): Promise<SubmitResourceResult> {
  try {
    // Extract and validate form data
    const rawFormData = {
      name: formData.get('name')?.toString() ?? '',
      websiteUrl: formData.get('websiteUrl')?.toString() ?? '',
    }

    const validationResult = schema.safeParse(rawFormData)

    if (!validationResult.success) {
      return {
        success: false,
        error: 'Please fill in all fields correctly.',
      }
    }

    const { name, websiteUrl } = validationResult.data

    // Save to database
    await getDB().insert(tables.resourceRequests).values({
      name: name.trim(),
      websiteUrl: websiteUrl.trim(),
    })

    // Send Discord notification
    // prettier-ignore
    const discordMessage =
      '🎉 ** New resource submitted **\n\n' +
      `• Name: ${name}\n` +
      `• URL: ${websiteUrl}`

    await sendDiscordNotification({
      type: 'resourceRequest',
      message: discordMessage,
    })

    return { success: true }
  } catch (error) {
    Sentry.captureException(error)

    return {
      success: false,
      error: 'Failed to submit resource. Please try again.',
    }
  }
}
