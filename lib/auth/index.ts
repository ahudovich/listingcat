import * as Sentry from '@sentry/nextjs'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { emailOTP, lastLoginMethod } from 'better-auth/plugins'
import { EMAILS } from '../../data/emails'
import { COOKIE_PREFIX } from '../../enums/constants'
import { PostHogEvents } from '../../enums/PostHogEvents.enum'
import { env } from '../../env'
import { sendDiscordNotification } from '../discord'
import { getDB } from '../drizzle'
import { generatePlainTextOtpVerificationEmail, resend, sendWelcomeEmail } from '../email'
import { capturePosthogEvent } from '../posthog'

export const auth = betterAuth({
  baseURL: env.NEXT_PUBLIC_WEBSITE_BASE_URL,
  secret: env.BETTER_AUTH_SECRET,

  database: drizzleAdapter(getDB(), {
    provider: 'pg',
    usePlural: true,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
    microsoft: {
      clientId: env.MICROSOFT_CLIENT_ID,
      clientSecret: env.MICROSOFT_CLIENT_SECRET,
    },
  },

  session: {
    cookieCache: {
      enabled: true,
    },
  },

  advanced: {
    cookiePrefix: COOKIE_PREFIX,
  },

  user: {
    additionalFields: {
      benefits: {
        type: 'string[]', // TODO: Update to use enum when it will be implemented in BetterAuth
        required: false,
        defaultValue: [],
        input: false,
      },
      isEarlyBird: {
        type: 'boolean',
        required: false,
        defaultValue: true, // TODO: Make this false after the launch
        input: false,
      },
    },
  },

  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await capturePosthogEvent({
            distinctId: user.id,
            event: PostHogEvents.UserSignedUp,
            properties: {
              $set: {
                name: user.name,
                email: user.email,
              },
            },
          })

          // Send event to Discord
          const message =
            '👤 ** New user registered **\n\n' +
            `• Email: ${user.email}\n` +
            `• Name: ${user.name || 'N/A'}`

          await sendDiscordNotification({
            type: 'general',
            message,
          })

          // Send welcome email
          const { error } = await sendWelcomeEmail(user.email)

          if (error) {
            Sentry.captureException(error)
          }
        },
      },
    },
  },

  plugins: [
    lastLoginMethod(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === 'email-verification') {
          const { error: resendError } = await resend.emails.send({
            from: `Listing Cat <${EMAILS.NO_REPLY}>`,
            to: email,
            subject: 'Verify your email address',
            text: generatePlainTextOtpVerificationEmail({
              heading: 'Confirm your signup',
              text: 'Here is your OTP code to verify your email address:',
              otpCode: otp,
            }),
          })

          if (resendError) {
            Sentry.captureException(resendError)
          }
        }
      },
    }),

    // Must be the last plugin
    nextCookies(),
  ],
})
