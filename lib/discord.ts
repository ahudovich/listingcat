import * as Sentry from '@sentry/nextjs'
import { env } from '@/env'

export async function sendDiscordNotification({
  type,
  message,
}: {
  type: 'general' | 'cron' | 'submissions'
  message: string
}) {
  let webhookUrl

  switch (type) {
    case 'general':
      webhookUrl = env.DISCORD_GENERAL_WEBHOOK_URL
      break
    case 'cron':
      webhookUrl = env.DISCORD_CRON_WEBHOOK_URL
      break
    case 'submissions':
      webhookUrl = env.DISCORD_SUBMISSIONS_WEBHOOK_URL
      break
  }

  if (!webhookUrl) {
    console.warn(
      `Environment variable for ${type} discord type is not set. Skipping Discord notification.`
    )
    return
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: message,
      }),
    })
  } catch (error) {
    Sentry.captureException(error)
  }
}
