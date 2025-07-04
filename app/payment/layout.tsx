import Link from 'next/link'
import BaseLogo from '@/components/ui/BaseLogo'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default function PaymentLayout({ children }: { children: ReactNode }) {
  return (
    <main className="grid min-h-dvh px-6 py-8 bg-zinc-50">
      <div className="grid gap-6 m-auto w-full max-w-[27.5rem] sm:gap-7">
        <div className="flex justify-center">
          <Link href="/">
            <BaseLogo className="w-[10.9375rem] h-[1.6875rem]" />
          </Link>
        </div>
        {children}
      </div>
    </main>
  )
}
