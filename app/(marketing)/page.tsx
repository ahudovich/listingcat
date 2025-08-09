import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight02Icon, CheckmarkCircle03Icon } from '@hugeicons/core-free-icons'
import LastDatabaseUpdate from '@/components/LastDatabaseUpdate'
import { TrustedBy } from '@/components/TrustedBy/TrustedBy'
import BaseButton from '@/components/ui/BaseButton'
import BaseIcon from '@/components/ui/BaseIcon'
import { APP_REDIRECT_URL } from '@/enums/constants'
import { getSessionState } from '@/lib/cached-functions'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Listing Cat - Marketing Database for Startups',
  },
  description:
    'Get access to the largest database of directories, launch platforms, marketplaces, showcase websites, newsletters, communities, and much more!',
  alternates: {
    canonical: '/',
  },
}

const heroFeatures = ['Always up-to-date', 'Curated by humans', 'Actively maintained']

export default async function HomePage() {
  const { isLoggedIn } = await getSessionState()

  return (
    <section className="relative mx-auto px-4 pt-10 max-w-[73.5rem] w-full sm:pt-12 md:px-6 md:pt-16 2xl:pt-18 before:absolute before:size-full before:opacity-70 before:bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] before:bg-[length:0.8rem_0.8rem] before:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#fff_70%,transparent_100%)]">
      <div className="relative z-[1]">
        <div className="mb-8 text-center md:mb-12">
          <LastDatabaseUpdate />

          <h1 className="mb-3.5 mx-auto font-black text-[1.5rem] text-primary leading-snug min-[30rem]:text-2xl sm:text-3xl md:mb-4 md:text-5xl">
            Get your{' '}
            <span className="border-b-2 border-b-emerald-600 text-emerald-600 sm:border-b-4">
              Startup Noticed
            </span>
            <br />
            with our Marketing Database
          </h1>

          <p className="mb-5 mx-auto max-w-[38rem] text-sm-relaxed text-balance xs:text-md-relaxed md:mb-6 md:text-lg-relaxed">
            We are curating launch platforms, directories, marketplaces, communities, newsletters,
            and more, all in one place.
          </p>

          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-3.5 mb-6 text-[0.9375rem] xs:gap-x-8 xs:mb-8 xs:text-sm">
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

          <TrustedBy className="mb-6" />

          <div className="flex justify-center">
            <BaseButton className="group min-w-50" size="lg" asChild>
              <Link href={isLoggedIn ? APP_REDIRECT_URL : '/create-account'}>
                Get free access
                <BaseIcon
                  className="group-hover:translate-x-1 transition-transform"
                  icon={ArrowRight02Icon}
                  strokeWidth={2.5}
                />
              </Link>
            </BaseButton>
          </div>

          <p className="mt-4 font-medium text-xs text-tertiary">
            It&apos;s free, there&apos;s no catch. Give it a try!
          </p>
        </div>

        <figure className="mx-auto max-w-[68.0625rem]">
          <Image
            src="/home/preview-v2.png"
            width={2178}
            height={1204}
            sizes="100vw lg:960px"
            alt="Database preview"
            priority={true}
          />
        </figure>
      </div>
    </section>
  )
}
