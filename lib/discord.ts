export async function sendDiscordNotification(message: string) {
  const webhookUrl = process.env.DISCORD_GENERAL_WEBHOOK_URL

  if (!webhookUrl) {
    console.warn('DISCORD_GENERAL_WEBHOOK_URL is not set. Skipping Discord notification.')
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
