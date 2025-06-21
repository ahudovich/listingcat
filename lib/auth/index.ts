import { stripe } from '@better-auth/stripe'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { emailOTP } from 'better-auth/plugins'
import { eq } from 'drizzle-orm'
import { Benefits } from '@/enums/Benefits.enum'
import { EMAILS } from '../../data/emails'
import { COOKIE_PREFIX } from '../../enums/constants'
import { PostHogEvents } from '../../enums/PostHogEvents.enum'
import { env } from '../../env'
import { users } from '../db/schema/tables/auth'
import { sendDiscordNotification } from '../discord'
import { getDB } from '../drizzle'
import { generatePlainTextOtpVerificationEmail, resend } from '../email'
import { getPosthogServerClient } from '../posthog'
import { stripeClient } from '../stripe'
import type Stripe from 'stripe'

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
          // Send event to PostHog
          const posthog = getPosthogServerClient()

          posthog.capture({
            distinctId: user.id,
            event: PostHogEvents.UserSignedUp,
            properties: {
              $set: {
                name: user.name,
                email: user.email,
              },
            },
          })

          await posthog.shutdown()

          // Send event to Discord
          const message =
            '👤 ** New user registered **\n\n' +
            `• Email: ${user.email}\n` +
            `• Name: ${user.name || 'N/A'}`

          await sendDiscordNotification({
            type: 'general',
            message,
          })
        },
      },
    },
  },

  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === 'email-verification') {
          await resend.emails.send({
            from: `Listing Cat <${EMAILS.NO_REPLY}>`,
            to: email,
            subject: 'Verify your email address',
            text: generatePlainTextOtpVerificationEmail({
              heading: 'Confirm your signup',
              text: 'Here is your OTP code to verify your email address:',
              otpCode: otp,
            }),
          })
        }
      },
    }),

    stripe({
      stripeClient,
      stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET,
      async onEvent(event) {
        switch (event.type) {
          case 'checkout.session.completed': {
            const checkoutSession = event.data.object as Stripe.Checkout.Session
            const externalId = checkoutSession.metadata?.externalId

            if (externalId) {
              try {
                const updatedUser = await getDB()
                  .update(users)
                  .set({ benefits: [Benefits.DatabaseAccess] })
                  .where(eq(users.id, externalId))
                  .returning({
                    email: users.email,
                    name: users.name,
                  })

                const message =
                  '💰 ** User upgraded to database access **\n\n' +
                  `• Email: ${updatedUser[0].email}\n` +
                  `• Name: ${updatedUser[0].name || 'N/A'}`

                await sendDiscordNotification({
                  type: 'general',
                  message,
                })
              } catch {
                const message =
                  '❌ ** Error upgrading user to database access **\n\n' +
                  `• UserId: ${externalId}\n`

                await sendDiscordNotification({
                  type: 'general',
                  message,
                })
              }
            }

            break
          }
        }
      },
    }),

    // Must be the last plugin
    nextCookies(),
  ],
})
