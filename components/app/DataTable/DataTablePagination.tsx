import { useId, useState } from 'react'
import { BaseButton } from '@/components/ui/BaseButton'
import { BaseSelect, BaseSelectItem } from '@/components/ui/BaseSelect'

const pageSizeOptions = [
  { label: '10', value: 10 },
  { label: '25', value: 25 },
  { label: '50', value: 50 },
]

export function DataTablePagination({ totalCount }: { totalCount: number }) {
  const id = useId()
  const [pageSize, setPageSize] = useState(10)

  return (
    <div className="relative flex items-center justify-between px-4 py-3 before:absolute before:-top-px before:inset-x-0 before:h-px before:bg-layout-separator">
      <div className="flex items-center gap-3">
        <div className="text-xs">
          <span className="font-semibold">{totalCount}</span> results
        </div>

        {totalCount > 10 && (
          <BaseSelect
            id={`${id}-page-size`}
            className="w-18"
            items={pageSizeOptions}
            modal={false}
            size="xs"
            value={pageSize}
            onValueChange={(value) => setPageSize(value as number)}
          >
            {pageSizeOptions.map((option) => (
              <BaseSelectItem key={option.value} label={option.label} value={option.value}>
                {option.label}
              </BaseSelectItem>
            ))}
          </BaseSelect>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="text-xs">
          <span className="font-semibold">1</span> of{' '}
          <span className="font-semibold">{Math.ceil(totalCount / pageSize)}</span>
        </div>

        <div className="flex items-center gap-3">
          <BaseButton className="min-w-22" variant="secondary" size="xs">
            Previous
          </BaseButton>

          <BaseButton className="min-w-22" variant="secondary" size="xs">
            Next
          </BaseButton>
        </div>
      </div>
    </div>
  )
}
