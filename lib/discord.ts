import { env } from '@/env'

export async function sendDiscordNotification({
  type = 'general',
  message,
}: {
  type?: 'general' | 'cron'
  message: string
}) {
  const webhookUrl =
    type === 'general' ? env.DISCORD_GENERAL_WEBHOOK_URL : env.DISCORD_CRON_WEBHOOK_URL

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
    console.error('Failed to send Discord notification:', error)
  }
}
