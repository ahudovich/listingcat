import Link from 'next/link'
import { ArrowRight02Icon } from '@hugeicons/core-free-icons'
import { TrustedBy } from '@/components/shared/trusted-by'
import { BaseButton } from '@/components/ui/button'
import { BaseIcon } from '@/components/ui/icon'
import { BaseLogo } from '@/components/ui/logo'

export function BlogCTA() {
  return (
    <section className="container-article">
      <div className="mt-8 px-4 py-8 bg-green-50 border-2 border-green-600 rounded-xl text-center xs:px-6 xs:py-12">
        <BaseLogo className="mb-5 mx-auto w-35.5 h-5.5" />

        <h2 className="mb-3 mx-auto max-w-[32rem] font-extrabold text-2xl text-primary text-balance xs:text-3xl">
          Get <u>free</u> access to our marketing database
        </h2>

        <p className="mb-5 mx-auto max-w-[38rem] text-sm-relaxed text-balance xs:text-md-relaxed">
          We are curating launch platforms, directories, marketplaces, communities, newsletters, and
          more, all in one place.
        </p>

        <TrustedBy className="mb-6" />

        <div className="flex justify-center">
          <BaseButton className="group min-w-50" render={<Link href="/create-account" />} size="lg">
            Get free access
            <BaseIcon
              className="group-hover:translate-x-1 transition-transform"
              icon={ArrowRight02Icon}
              strokeWidth={2.5}
            />
          </BaseButton>
        </div>

        <p className="mt-4 font-medium text-xs text-tertiary">
          It&apos;s free, there&apos;s no catch. Give it a try!
        </p>
      </div>
    </section>
  )
}
