import { InformationCircleIcon } from '@hugeicons/core-free-icons'
import { DataTableCellLink } from '@/components/app/data-table/cells/cell-link'
import { BaseIcon } from '@/components/ui/icon'
import { BaseTooltip } from '@/components/ui/tooltip'

export function DataTableCellSubmission({
  submitUrl,
  notes,
}: {
  submitUrl: string | null
  notes: string | null
}) {
  const type = submitUrl?.includes('mailto') ? 'email' : 'link'

  return (
    <div className="flex items-center gap-1">
      {submitUrl ? <DataTableCellLink value={submitUrl} type={type} /> : '-'}
      {notes && (
        <BaseTooltip className="max-w-56" text={notes}>
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
