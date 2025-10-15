'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AuthCard } from '@/components/auth/AuthCard'
import { OtpVerificationForm } from '@/components/auth/forms/OtpVerificationForm/OtpVerificationForm'
import { SignUpForm } from '@/components/auth/forms/SignUpForm/SignUpForm'

export function AuthSignUp() {
  const [currentStep, setCurrentStep] = useState<'sign-up' | 'verification'>('sign-up')
  const [email, setEmail] = useState('')

  const signUpDescription = (
    <>
      Already have an account?{' '}
      <Link
        className="border-b border-b-current font-medium text-primary transition-colors hover:border-b-accent hover:text-accent"
        href="/login"
      >
        Log in
      </Link>
    </>
  )

  const otpVerificationDescription = (
    <>
      We sent a code to your email address.
      <br />
      Please enter it below.
    </>
  )

  return (
    <>
      {currentStep === 'sign-up' && (
        <AuthCard title="Create a free account" description={signUpDescription}>
          <SignUpForm email={email} setEmail={setEmail} setCurrentStep={setCurrentStep} />
        </AuthCard>
      )}

      {currentStep === 'verification' && (
        <AuthCard title="Verify your email" description={otpVerificationDescription}>
          <OtpVerificationForm email={email} />
        </AuthCard>
      )}
    </>
  )
}
