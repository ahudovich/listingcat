'use client'

import { flexRender } from '@tanstack/react-table'
import DataTableHeaderCell from '@/components/app/DataTable/DataTableHeaderCell'
import BaseScrollArea from '@/components/ui/BaseScrollArea'
import { useDataTable } from '@/hooks/useDataTable'
import type { AccessorKeyColumnDef } from '@tanstack/react-table'

interface DataTableWebsitesProps<T> {
  data: Array<T>
  columns: Array<AccessorKeyColumnDef<T, any>>
}

export default function DataTableWebsites<T>({ data, columns }: DataTableWebsitesProps<T>) {
  const { table } = useDataTable<T>({
    initialSorting: [{ id: 'dr', desc: true }],
    columns,
    data,
  })

  return (
    <BaseScrollArea className="pb-3 h-full rounded-b-xl lg:pb-0">
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
                  // @ts-expect-error - TODO: fix this
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
            <tr
              className="group whitespace-nowrap transition-colors hover:bg-zinc-100"
              key={row.id}
            >
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
  )
}
