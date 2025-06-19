import { headers } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight02Icon } from '@hugeicons/core-free-icons'
import Header from '@/components/layout/Header'
import BaseButton from '@/components/ui/BaseButton'
import BaseIcon from '@/components/ui/BaseIcon'
import { APP_REDIRECT_URL } from '@/enums/constants'
import { auth } from '@/lib/auth'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Listing Cat',
  description:
    'Get access to the largest database of directories, launch platforms, marketplaces, showcase websites, newsletters, communities, and much more!',
}

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const isLoggedIn = !!session

  return (
    <div className="min-h-dvh">
      <Header isLoggedIn={isLoggedIn} />

      <main className="mx-auto px-4 pt-12 max-w-[73.5rem] w-full md:px-6 md:pt-16 2xl:pt-24">
        <section className="mb-8 text-center md:mb-12">
          <h1 className="mb-2 mx-auto max-w-[30rem] font-black text-[1.4375rem] text-primary text-balance xs:text-2xl md:mb-3 md:max-w-[44rem] md:text-5xl">
            Marketing Database for&nbsp;Startups and Indie Hackers
          </h1>

          <p className="mb-4 mx-auto max-w-[38rem] text-sm-relaxed text-balance xs:text-md-relaxed md:mb-6 md:text-lg-relaxed">
            We are curating launch platforms, directories, marketplaces, newsletters, communities,
            and more, all in one place.
          </p>

          <p className="mb-6 mx-auto px-4 py-4 max-w-md bg-zinc-50 border border-zinc-200 rounded-lg font-medium text-xs text-balance md:mb-7 md:text-sm">
            This is an early access preview of our platform. More features and data are coming later
            this month!
          </p>

          <div className="flex justify-center">
            <BaseButton className="group" asChild>
              <Link href={isLoggedIn ? APP_REDIRECT_URL : '/create-account'}>
                Join for free
                <BaseIcon
                  className="group-hover:translate-x-1 transition-transform"
                  icon={ArrowRight02Icon}
                />
              </Link>
            </BaseButton>
          </div>

          <p className="mt-4 font-medium text-xs text-tertiary">No credit card required.</p>
        </section>

        <figure className="mx-auto max-w-[69.75rem]">
          <Image
            src="/old-home/preview.png"
            width={2232}
            height={1202}
            sizes="100vw lg:960px"
            alt="Database preview"
          />
        </figure>
      </main>

      <footer className="sticky top-[100vh] grid gap-2 pt-12 pb-8 text-tertiary text-xs text-center md:pt-16 md:pb-10">
        <p className="flex items-center justify-center gap-2 mb-2">
          Our partners:
          <Link
            className="text-tertiary transition-colors hover:text-accent"
            href="https://www.businessideasdb.com"
            target="_blank"
          >
            Find Business Ideas
          </Link>
        </p>

        <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
          &copy; {new Date().getFullYear()} Listing Cat. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
