import Link from 'next/link'
import { LinkSquare02Icon } from '@hugeicons/core-free-icons'
import { BaseIcon } from '@/components/ui/icon'
import { BaseTooltip } from '@/components/ui/tooltip'
import { cn } from '@/utils/css'

export function DataTableCellPricing({
  value,
  pricingInfo,
  pricingUrl,
}: {
  value: string
  pricingInfo: string | null
  pricingUrl: string | null
}) {
  return (
    <div className={cn('', pricingUrl && 'flex items-center gap-1 capitalize')}>
      {pricingInfo ? (
        <BaseTooltip className="max-w-56" text={pricingInfo}>
          <span className="underline underline-offset-2 decoration-1.5 decoration-dotted decoration-gray-500 capitalize cursor-help">
            {value}
          </span>
        </BaseTooltip>
      ) : (
        <span className="capitalize">{value}</span>
      )}

      {pricingUrl && (
        <Link className="group/link" href={pricingUrl} target="_blank">
          <BaseIcon
            className="size-3 text-faded transition-colors group-hover/link:text-tertiary"
            icon={LinkSquare02Icon}
            strokeWidth={2.5}
          />
        </Link>
      )}
    </div>
  )
}
