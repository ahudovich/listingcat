import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import * as Sentry from '@sentry/nextjs'
import { env } from '@/env'
import { Benefits } from '@/enums/Benefits.enum'
import { auth } from '@/lib/auth'
import { stripeClient } from '@/lib/stripe'
import type { Stripe } from 'stripe'

export async function GET() {
  const headersList = await headers()
  const cancelUrl = headersList.get('referer') ?? env.NEXT_PUBLIC_WEBSITE_BASE_URL

  let stripeSession: Stripe.Checkout.Session

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

    if (authSession.user.benefits?.includes(Benefits.DatabaseAccess)) {
      return NextResponse.json({ error: 'User already has database access' }, { status: 400 })
    }

    stripeSession = await stripeClient.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      metadata: {
        externalId: authSession.user.id,
      },
      success_url: `${env.NEXT_PUBLIC_WEBSITE_BASE_URL}/success`,
      cancel_url: cancelUrl,
    })

    if (!stripeSession.url) {
      throw new Error('Checkout session url is missing')
    }

    return NextResponse.json({ sessionUrl: stripeSession.url })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    Sentry.captureException(errorMessage)
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
