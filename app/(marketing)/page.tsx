import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight02Icon, CheckmarkCircle03Icon, ReloadIcon } from '@hugeicons/core-free-icons'
import { format } from 'date-fns'
import BaseButton from '@/components/ui/BaseButton'
import BaseIcon from '@/components/ui/BaseIcon'
import BaseTooltip from '@/components/ui/BaseTooltip'
import { APP_REDIRECT_URL } from '@/enums/constants'
import { getSessionState } from '@/lib/cached-functions'
import { getLastDatabaseUpdate } from '@/lib/db/operations'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Listing Cat',
  description:
    'Get access to the largest database of directories, launch platforms, marketplaces, showcase websites, newsletters, communities, and much more!',
}

const heroFeatures = ['Always up-to-date', 'Curated by humans', 'Actively maintained']

export default async function HomePage() {
  const { isLoggedIn } = await getSessionState()

  // Cached, revalidated every 12 hours
  const lastUpdateDate = await getLastDatabaseUpdate()

  return (
    <section className="mx-auto px-4 pt-10 max-w-[73.5rem] w-full sm:pt-12 md:px-6 md:pt-16 2xl:pt-24">
      <div className="mb-8 text-center md:mb-12">
        {lastUpdateDate && (
          <p className="inline-flex items-center gap-1.5 mb-4 font-medium text-xs">
            <BaseIcon
              className="shrink-0 size-3.5 text-emerald-600"
              icon={ReloadIcon}
              strokeWidth={2.5}
            />
            Last updated:{' '}
            <BaseTooltip className="max-w-64" text="The last time the database was updated">
              <span className="underline underline-offset-4 decoration-dotted cursor-help">
                {format(lastUpdateDate, 'MMMM d, yyyy')}
              </span>
            </BaseTooltip>
          </p>
        )}

        <h1 className="mb-2.5 mx-auto max-w-[38rem] font-black text-primary text-balance text-3xl md:mb-3 md:max-w-[44rem] md:text-5xl">
          Marketing Database for&nbsp;Startups and Indie Hackers
        </h1>

        <p className="mb-5 mx-auto max-w-[38rem] text-sm-relaxed text-balance xs:text-md-relaxed md:mb-6 md:text-lg-relaxed">
          We are curating launch platforms, directories, marketplaces, communities, newsletters, and
          more, all in one place.
        </p>

        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3.5 mb-8 text-sm">
          {heroFeatures.map((feature, index) => (
            <li className="flex items-center gap-2" key={index}>
              <BaseIcon
                className="shrink-0 size-5 text-emerald-600"
                icon={CheckmarkCircle03Icon}
                strokeWidth={2.5}
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="flex justify-center">
          <BaseButton className="group min-w-50" size="lg" asChild>
            <Link href={isLoggedIn ? APP_REDIRECT_URL : '/create-account'}>
              Join for free
              <BaseIcon
                className="group-hover:translate-x-1 transition-transform"
                icon={ArrowRight02Icon}
                strokeWidth={2.5}
              />
            </Link>
          </BaseButton>
        </div>

        <p className="mt-4 font-medium text-xs text-tertiary">No credit card required.</p>
      </div>

      <figure className="mx-auto max-w-[69.75rem]">
        <Image
          src="/home/preview.png"
          width={2232}
          height={1202}
          sizes="100vw lg:960px"
          alt="Database preview"
          priority={true}
        />
      </figure>
    </section>
  )
}
