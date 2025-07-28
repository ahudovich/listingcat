import { Resend } from 'resend'
import { env } from '@/env'
import { EMAILS } from '@/data/emails'
import WelcomeEmail from '@/emails/WelcomeEmail'

export const resend = new Resend(env.RESEND_API_KEY)

export function generatePlainTextOtpVerificationEmail({
  heading,
  text,
  otpCode,
}: {
  heading: string
  text: string
  otpCode: string
}) {
  return `${heading}

${text}

${otpCode}

-------------------------------

If you need help, email us at ${EMAILS.SUPPORT}`
}

export async function sendWelcomeEmail(email: string) {
  const { error: resendError } = await resend.emails.send({
    from: `Andrei from Listing Cat <${EMAILS.NO_REPLY}>`,
    replyTo: EMAILS.FOUNDER,
    to: email,
    subject: 'Welcome to Listing Cat!',
    scheduledAt: 'in 1 hour',
    react: WelcomeEmail(),
  })

  return {
    error: resendError,
  }
}
