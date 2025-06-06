import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import * as Sentry from '@sentry/nextjs'
import { env } from '@/env'
import { stripeClient } from '@/lib/stripe'
import type { Stripe } from 'stripe'

export async function GET() {
  const headersList = await headers()
  const cancelUrl = headersList.get('referer') ?? env.NEXT_PUBLIC_WEBSITE_BASE_URL

  let session: Stripe.Checkout.Session

  try {
    session = await stripeClient.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: 'price_1RX3fzECkJwFQRH9xtnL8smU',
          quantity: 1,
        },
      ],
      success_url: `${env.NEXT_PUBLIC_WEBSITE_BASE_URL}/success`,
      cancel_url: cancelUrl,
    })

    if (!session.url) {
      throw new Error('Checkout session url is missing')
    }

    return NextResponse.json({ sessionUrl: session.url })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    Sentry.captureException(errorMessage)
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
