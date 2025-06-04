import { InformationCircleIcon } from '@hugeicons/core-free-icons'
import BaseIcon from '@/components/ui/BaseIcon'
import BaseTooltip from '@/components/ui/BaseTooltip'

export default function DataTableCellPricing({
  value,
  pricingInfo,
}: {
  value: string
  pricingInfo: string | null
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
    </div>
  )
}
