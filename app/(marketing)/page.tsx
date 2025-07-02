import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight02Icon, ReloadIcon } from '@hugeicons/core-free-icons'
import { format } from 'date-fns'
import BaseButton from '@/components/ui/BaseButton'
import BaseIcon from '@/components/ui/BaseIcon'
import { APP_REDIRECT_URL } from '@/enums/constants'
import { getSessionState } from '@/lib/cached-functions'
import { getLastDatabaseUpdate } from '@/lib/db/operations'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Listing Cat',
  description:
    'Get access to the largest database of directories, launch platforms, marketplaces, showcase websites, newsletters, communities, and much more!',
}

export default async function HomePage() {
  const { isLoggedIn } = await getSessionState()

  // Cached, revalidated every 12 hours
  const lastUpdateDate = await getLastDatabaseUpdate()

  return (
    <section className="mx-auto px-4 pt-12 max-w-[73.5rem] w-full md:px-6 md:pt-16 2xl:pt-24">
      <div className="mb-8 text-center md:mb-12">
        {lastUpdateDate && (
          <p className="inline-flex items-center gap-1 mb-5 px-3 py-1.25 bg-emerald-600 rounded-full font-medium text-xs text-white">
            <BaseIcon
              className="hidden shrink-0 mr-1 size-3.5 min-[25.875rem]:block"
              icon={ReloadIcon}
              strokeWidth={2.25}
            />
            Updated: {format(lastUpdateDate, 'dd MMMM yyyy')}
          </p>
        )}

        <h1 className="mb-2 mx-auto max-w-[30rem] font-black  text-primary text-balance text-2xl md:mb-3 md:max-w-[44rem] md:text-5xl">
          Marketing Database for&nbsp;Startups and Indie Hackers
        </h1>

        <p className="mb-8 mx-auto max-w-[38rem] text-sm-relaxed text-balance xs:text-md-relaxed md:mb-6 md:text-lg-relaxed">
          We are curating launch platforms, directories, marketplaces, communities, newsletters, and
          more, all in one place.
        </p>

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
