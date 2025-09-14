import { NextRequest, NextResponse } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'
import { APP_REDIRECT_URL, COOKIE_PREFIX } from './enums/constants'

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request, {
    cookiePrefix: COOKIE_PREFIX,
  })

  const pathname = request.nextUrl.pathname

  // Redirect to /app if user is trying to access home page while being logged in
  if (pathname === '/' && sessionCookie) {
    return NextResponse.redirect(new URL(APP_REDIRECT_URL, request.url))
  }

  // Redirect to /login if user is trying to access /app routes and is not logged in
  if (pathname.startsWith('/app') && !sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  runtime: 'nodejs',
  matcher: ['/', '/app/:path*'],
}
