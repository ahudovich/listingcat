import Link from 'next/link'
import { InformationCircleIcon, LinkSquare02Icon } from '@hugeicons/core-free-icons'
import BaseIcon from '@/components/ui/BaseIcon'
import BaseTooltip from '@/components/ui/BaseTooltip'

export default function DataTableCellPricing({
  value,
  pricingInfo,
  pricingUrl,
}: {
  value: string
  pricingInfo: string | null
  pricingUrl: string | null
}) {
  return (
    <div className="flex items-center gap-1 capitalize">
      {value}
      {pricingInfo && (
        <BaseTooltip className="max-w-56" text={pricingInfo}>
          <BaseIcon
            className="size-3 text-faded cursor-help"
            icon={InformationCircleIcon}
            strokeWidth={2.5}
          />
        </BaseTooltip>
      )}
      {pricingUrl && (
        <Link className="group/link" href={pricingUrl} target="_blank">
          <BaseIcon
            className="size-3 text-faded transition-colors group-hover/link:text-accent"
            icon={LinkSquare02Icon}
            strokeWidth={2.5}
          />
        </Link>
      )}
    </div>
  )
}
