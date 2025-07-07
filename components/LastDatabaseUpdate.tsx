import { ReloadIcon } from '@hugeicons/core-free-icons'
import { formatDistanceToNow } from 'date-fns'
import BaseIcon from '@/components/ui/BaseIcon'
import BaseTooltip from '@/components/ui/BaseTooltip'
import { getLastDatabaseUpdate } from '@/lib/db/operations'

export default async function LastDatabaseUpdate() {
  const lastUpdateDate = await getLastDatabaseUpdate()

  return (
    <p className="inline-flex items-center gap-1.5 mb-4 font-medium text-xs">
      <BaseIcon
        className="shrink-0 size-3.5 text-emerald-600"
        icon={ReloadIcon}
        strokeWidth={2.5}
      />
      Last updated:{' '}
      <BaseTooltip className="max-w-64" text="The last time the database was updated">
        <span className="underline underline-offset-4 decoration-dotted cursor-help">
          {formatDistanceToNow(lastUpdateDate ?? new Date(), { addSuffix: true })}
        </span>
      </BaseTooltip>
    </p>
  )
}
