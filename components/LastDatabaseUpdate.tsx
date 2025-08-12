import { ReloadIcon } from '@hugeicons/core-free-icons'
import { format, formatDistanceToNow } from 'date-fns'
import BaseIcon from '@/components/ui/BaseIcon'
import BaseTooltip from '@/components/ui/BaseTooltip'
import { getLastDatabaseUpdate } from '@/lib/db/operations'
import { cn } from '@/utils/css'

export async function LastDatabaseUpdate({ className }: { className?: string }) {
  const lastUpdateDate = await getLastDatabaseUpdate()

  return (
    <p className={cn('inline-flex items-center gap-1.5 font-medium text-xs', className)}>
      <BaseIcon
        className="shrink-0 size-3.5 text-emerald-600"
        icon={ReloadIcon}
        strokeWidth={2.5}
      />
      Last updated:{' '}
      <BaseTooltip
        className="max-w-64"
        text={`We are committed to keep our database up-to-date. The last update was made on ${format(lastUpdateDate ?? new Date(), 'MMMM d')} at ${format(lastUpdateDate ?? new Date(), 'HH:MM')}.`}
      >
        <span className="underline underline-offset-4 decoration-dotted cursor-help">
          {formatDistanceToNow(lastUpdateDate ?? new Date(), { addSuffix: true })}
        </span>
      </BaseTooltip>
    </p>
  )
}
