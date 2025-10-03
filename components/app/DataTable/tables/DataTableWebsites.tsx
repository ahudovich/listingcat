'use client'

import { flexRender } from '@tanstack/react-table'
import { DataTableFilters } from '@/components/app/DataTable/DataTableFilters/DataTableFilters'
import DataTableHeaderCell from '@/components/app/DataTable/DataTableHeaderCell'
import { DataTablePagination } from '@/components/app/DataTable/DataTablePagination'
import BaseScrollArea from '@/components/ui/BaseScrollArea'
import { useWebsiteDataTable } from '@/hooks/useWebsiteDataTable'
import type { ColumnDef } from '@tanstack/react-table'

interface DataTableWebsitesProps<T> {
  data: Array<T>
  columns: Array<ColumnDef<T, any>>
}

export default function DataTableWebsites<T>({ data, columns }: DataTableWebsitesProps<T>) {
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
              <tr className="group transition-colors hover:bg-zinc-100" key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    className="px-4 py-3 border-y border-y-layout-separator font-medium text-xs group-first:border-t-0"
                    key={cell.id}
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
