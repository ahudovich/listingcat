import { Resend } from 'resend'
import { EMAILS } from '@/data/emails'

export const resend = new Resend(process.env.RESEND_API_KEY)

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
