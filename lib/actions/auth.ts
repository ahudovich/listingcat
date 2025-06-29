'use server'

import { headers } from 'next/headers'
import * as Sentry from '@sentry/nextjs'
import { APIError } from 'better-auth/api'
import { auth } from '@/lib/auth'

type State = {
  error: string | null
}

export async function handleSignUp(email: string, password: string): Promise<State> {
  try {
    // Create a new user
    await auth.api.signUpEmail({
      headers: await headers(),
      body: {
        name: '', // Empty name on registration
        email,
        password,
      },
    })

    // Verify user's email address
    const { success } = await auth.api.sendVerificationOTP({
      headers: await headers(),
      body: {
        type: 'email-verification',
        email,
      },
    })

    if (!success) {
      return { error: 'Failed to send verification OTP.' }
    }

    return { error: null }
  } catch (error: unknown) {
    Sentry.captureException(error)
    return { error: error instanceof APIError ? error.message : 'Failed to create user.' }
  }
}

export async function handleOtpVerification(email: string, otp: string): Promise<State> {
  try {
    // Verify OTP code
    const { user } = await auth.api.verifyEmailOTP({
      headers: await headers(),
      body: {
        otp,
        email,
      },
    })

    if (!user.emailVerified) {
      throw new Error('Something went wrong. Email has not been verified.')
    }

    return { error: null }
  } catch (error: unknown) {
    Sentry.captureException(error)
    return { error: error instanceof APIError ? error.message : 'Failed to verify OTP.' }
  }
}

export async function handleSignIn(email: string, password: string): Promise<State> {
  try {
    const { user } = await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password,
      },
    })

    if (!user) {
      throw new Error('Failed to sign in. Try again.')
    }

    return { error: null }
  } catch (error: unknown) {
    Sentry.captureException(error)
    return { error: error instanceof APIError ? error.message : 'Failed to sign in.' }
  }
}
