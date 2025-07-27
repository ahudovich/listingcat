import Link from 'next/link'
import { LinkSquare02Icon } from '@hugeicons/core-free-icons'
import BaseIcon from '@/components/ui/BaseIcon'
import BaseTooltip from '@/components/ui/BaseTooltip'
import { formatNumber } from '@/utils/formatters'

export function DataTableCellTraffic({
  value,
  webAnalyticsUrl,
}: {
  value: number
  webAnalyticsUrl: string | null
}) {
  return (
    <div className="flex items-center gap-x-1.5">
      {formatNumber(value)}
      {webAnalyticsUrl && (
        <BaseTooltip className="max-w-56" text="Open web analytics">
          <Link className="group/link" href={webAnalyticsUrl} target="_blank">
            <BaseIcon
              className="size-3 text-faded transition-colors group-hover/link:text-tertiary"
              icon={LinkSquare02Icon}
              strokeWidth={2.5}
            />
          </Link>
        </BaseTooltip>
      )}
    </div>
  )
}
