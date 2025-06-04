import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { emailOTP } from 'better-auth/plugins'
import { EMAILS } from '../../data/emails'
import { COOKIE_PREFIX } from '../../enums/constants'
import { BASE_URL } from '../constants'
import { sendDiscordNotification } from '../discord'
import { getDB } from '../drizzle'
import { generatePlainTextOtpVerificationEmail, resend } from '../email'

export const auth = betterAuth({
  baseURL: BASE_URL,
  secret: process.env.BETTER_AUTH_SECRET,

  database: drizzleAdapter(getDB(), {
    provider: 'pg',
    usePlural: true,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    microsoft: {
      clientId: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
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
          const message =
            '👤 ** New user registered **\n\n' +
            '**Summary:**\n\n' +
            `• Email: ${user.email}\n` +
            `• Name: ${user.name || 'N/A'}`

          await sendDiscordNotification(message)
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
    // Must be the last plugin
    nextCookies(),
  ],
})
