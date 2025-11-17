import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { env } from '@/env'
import { PostHogProvider } from '@/components/vendors/posthog'
import type { Metadata, Viewport } from 'next'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_WEBSITE_BASE_URL),
  title: {
    template: '%s | Listing Cat',
    default: 'Listing Cat',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} h-full`}>
      <body className="relative h-full font-text text-secondary antialiased">
        <PostHogProvider />
        {/*
         * `isolate` is required by Base UI
         * https://base-ui.com/react/overview/quick-start#set-up-portals
         */}
        <div className="isolate h-full">{children}</div>
      </body>
    </html>
  )
}
