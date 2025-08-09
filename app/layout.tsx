import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { env } from '@/env'
import PostHogProvider from '@/components/PostHogProvider'
import { BaseToaster } from '@/components/ui/BaseToaster'
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
        {children}
        <BaseToaster />
      </body>
    </html>
  )
}
