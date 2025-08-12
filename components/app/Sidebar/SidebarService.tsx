import { AlertDiamondIcon, ArrowRight02Icon } from '@hugeicons/core-free-icons'
import BaseButton from '@/components/ui/BaseButton'
import BaseIcon from '@/components/ui/BaseIcon'
import { LINKS } from '@/data/links'
import { cn } from '@/utils/css'

export default function SidebarUpgrade({ className }: { className?: string }) {
  return (
    <div className={cn('p-4 bg-white border border-zinc-200 rounded-lg', className)}>
      <p className="flex items-center gap-x-1.5 mb-1.5 font-semibold text-xs">
        <BaseIcon
          className="shrink-0 size-5 fill-current"
          icon={AlertDiamondIcon}
          strokeWidth={2}
        />
        Submission Service
      </p>

      <p className="mb-4 text-xs-relaxed">
        Skip the hassle &ndash; we&apos;ll handle all directory submissions for you!
      </p>

      <BaseButton className="group w-full" asChild>
        <a href={LINKS.PARTNERS.SUBMISSION_SERVICE} rel="sponsored" target="_blank">
          Submit Now
          <BaseIcon
            className="shrink-0 size-4 fill-current transition-transform group-hover:translate-x-1"
            icon={ArrowRight02Icon}
            strokeWidth={2.5}
          />
        </a>
      </BaseButton>
    </div>
  )
}
