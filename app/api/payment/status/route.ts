import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import * as Sentry from '@sentry/nextjs'
import { Benefits } from '@/enums/Benefits.enum'
import { auth } from '@/lib/auth'

export async function GET() {
  const headersList = await headers()

  try {
    const authSession = await auth.api.getSession({
      headers: headersList,
      query: {
        disableCookieCache: true,
      },
    })

    if (!authSession) {
      return NextResponse.json({ error: 'User is not authenticated' }, { status: 401 })
    }

    return authSession.user.benefits?.includes(Benefits.ProAccess)
      ? NextResponse.json({ paymentStatus: 'paid' })
      : NextResponse.json({ paymentStatus: 'pending' })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    Sentry.captureException(errorMessage)
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
