'use client'

import { flexRender } from '@tanstack/react-table'
import { DataTableFilters } from '@/components/app/DataTable/DataTableFilters/DataTableFilters'
import { DataTableHeaderCell } from '@/components/app/DataTable/DataTableHeaderCell'
import { DataTablePagination } from '@/components/app/DataTable/DataTablePagination'
import { BaseScrollArea } from '@/components/ui/BaseScrollArea'
import { useWebsiteDataTable } from '@/hooks/useWebsiteDataTable'
import { cn } from '@/utils/css'
import type { ColumnDef } from '@tanstack/react-table'
import type { SubmissionKind } from '@/enums/SubmissionKind.enum'

interface DataTableWebsitesProps<T> {
  columns: Array<ColumnDef<T, any>>
  data: Array<T>
  kind: SubmissionKind
}

export function DataTableWebsites<T>({ columns, data, kind }: DataTableWebsitesProps<T>) {
  const { table, globalFilter, setGlobalFilter, columnFilters, setColumnFilters } =
    useWebsiteDataTable<T>({
      initialSorting: [{ id: 'dr', desc: true }],
      columns,
      data,
    })

  return (
    <div className="overflow-hidden grid grid-rows-[auto_1fr_auto]">
      <DataTableFilters
        className="px-4 py-3 border-b border-b-layout-separator"
        kind={kind}
        table={table}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />

      <BaseScrollArea className="pb-3 lg:pb-0">
        <table className="w-full">
          <thead className="sticky top-0 z-[1] bg-white">
            {table.getHeaderGroups().map(({ id, headers }) => (
              <tr key={id}>
                {headers.map((header) => (
                  <DataTableHeaderCell
                    key={header.id}
                    column={header.column}
                    isSortable={header.column.getCanSort()}
                    sortingDirection={header.column.getIsSorted()}
                    size={header.column.columnDef.size}
                    tooltip={header.column.columnDef.meta?.tooltip}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </DataTableHeaderCell>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="group transition-colors hover:bg-zinc-100">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={cn(
                      'align-middle px-4 py-3 border-y border-y-layout-separator font-medium text-xs group-first:border-t-0',
                      cell.column.id === 'name' && 'pl-0'
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </BaseScrollArea>

      <DataTablePagination table={table} />
    </div>
  )
}
