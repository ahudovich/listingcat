import { FireIcon } from '@hugeicons/core-free-icons'
import BaseIcon from '@/components/ui/BaseIcon'

export default function DataTableCellDomainRating({
  value,
  withIcon = false,
}: {
  value: number
  withIcon?: boolean
}) {
  return (
    <div className="flex items-center gap-1">
      {value}
      {withIcon && value >= 50 && (
        <BaseIcon className="shrink-0 size-3.5 text-orange-600" icon={FireIcon} />
      )}
    </div>
  )
}
