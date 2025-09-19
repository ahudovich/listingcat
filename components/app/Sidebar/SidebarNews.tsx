import { ArrowRight02Icon, Robot01Icon } from '@hugeicons/core-free-icons'
import { BaseButton } from '@/components/ui/BaseButton'
import { BaseIcon } from '@/components/ui/BaseIcon'
import { LINKS } from '@/data/links'
import { cn } from '@/utils/css'

export function SidebarNews({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'p-4 bg-white border border-violet-200 rounded-lg ring-3 ring-violet-50',
        className
      )}
    >
      <p className="flex items-center gap-x-2 mb-2 font-semibold text-xs">
        <div className="p-1 bg-violet-50 border border-violet-200 rounded-md">
          <BaseIcon className="size-4 text-violet-500" icon={Robot01Icon} />
        </div>
        Coming soon!
      </p>

      <p className="mb-4 text-xs-relaxed">
        We are working on our own directory submission service!
      </p>

      <BaseButton className="group w-full" asChild>
        <a href={LINKS.AUTHOR.X} target="_blank">
          Follow updates on 𝕏
          <BaseIcon
            className="shrink-0 size-4 fill-current transition-transform group-hover:translate-x-1"
            icon={ArrowRight02Icon}
          />
        </a>
      </BaseButton>
    </div>
  )
}
