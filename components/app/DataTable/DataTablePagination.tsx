import { useId } from 'react'
import { BaseButton } from '@/components/ui/BaseButton'
import { BaseSelect, BaseSelectItem } from '@/components/ui/BaseSelect'
import { PageSize } from '@/enums/data-table'
import type { Table } from '@tanstack/react-table'

const pageSizeOptions = Object.values(PageSize).map((size) => ({
  label: String(size),
  value: size,
}))

interface DataTablePaginationProps<T> {
  table: Table<T>
}

export function DataTablePagination<T>({ table }: DataTablePaginationProps<T>) {
  const id = useId()

  const totalCount = table.getFilteredRowModel().rows.length
  const pageSize = table.getState().pagination.pageSize
  const pageIndex = table.getState().pagination.pageIndex
  const pageCount = table.getPageCount()
  const currentPage = pageIndex + 1

  return (
    <div className="relative flex flex-wrap items-center justify-between gap-4 px-4 py-3 before:absolute before:-top-px before:inset-x-0 before:h-px before:bg-layout-separator">
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
            onValueChange={(value) => table.setPageSize(value as number)}
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
          <span className="font-semibold">{currentPage}</span> of{' '}
          <span className="font-semibold">{pageCount}</span>
        </div>

        <div className="flex items-center gap-3">
          <BaseButton
            className="min-w-22"
            variant="secondary"
            size="xs"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            Previous
          </BaseButton>

          <BaseButton
            className="min-w-22"
            variant="secondary"
            size="xs"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            Next
          </BaseButton>
        </div>
      </div>
    </div>
  )
}
