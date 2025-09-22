import Link from 'next/link'
import { BaseLogo } from '@/components/ui/BaseLogo'
import { EMAILS } from '@/data/emails'
import type { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="grid min-h-dvh px-6 py-16 bg-zinc-50">
      <div className="grid gap-6 m-auto w-full max-w-[27.5rem] sm:gap-7">
        <div className="flex justify-center">
          <Link href="/">
            <BaseLogo className="w-[10.9375rem] h-[1.6875rem]" />
          </Link>
        </div>
        {children}
        <p className="text-xs text-center">
          Need help?{' '}
          <a
            className="border-b border-b-current text-secondary transition-colors hover:text-accent hover:border-b-accent"
            href={`mailto:${EMAILS.SUPPORT}`}
          >
            {EMAILS.SUPPORT}
          </a>
        </p>
      </div>
    </main>
  )
}
