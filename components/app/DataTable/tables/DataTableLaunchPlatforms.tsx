'use client'

import { useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import CategoryBadge from '@/components/app/CategoryBadge'
import DataTableCellAccount from '@/components/app/DataTable/DataTableCellAccount'
import DataTableCellDomainRating from '@/components/app/DataTable/DataTableCellDomainRating'
import DataTableCellLink from '@/components/app/DataTable/DataTableCellLink'
import DataTableCellLinkAttribute from '@/components/app/DataTable/DataTableCellLinkAttribute'
import DataTableCellName from '@/components/app/DataTable/DataTableCellName'
import DataTableCellPricing from '@/components/app/DataTable/DataTableCellPricing'
import DataTableHeaderCell from '../DataTableHeaderCell'
import type { SortingState } from '@tanstack/react-table'
import type { LaunchPlatform } from '@/lib/db/schema/tables/launch-platforms'

export default function DataTableLaunchPlatforms({ data }: { data: Array<LaunchPlatform> }) {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'dr', desc: true }])

  const columnHelper = createColumnHelper<LaunchPlatform>()

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (info) => (
        <DataTableCellName name={info.getValue()} websiteUrl={info.row.original.websiteUrl} />
      ),
      sortingFn: 'alphanumeric',
    }),

    columnHelper.accessor('dr', {
      header: 'DR',
      cell: (info) => <DataTableCellDomainRating value={info.getValue()} withIcon={true} />,
      sortingFn: 'basic',
      size: 84,
      meta: {
        tooltip: 'Domain Rating (by Ahrefs). Updated weekly.',
      },
    }),

    columnHelper.accessor('pricingModel', {
      header: 'Pricing',
      cell: (info) => (
        <DataTableCellPricing value={info.getValue()} pricingInfo={info.row.original.pricingInfo} />
      ),
      sortingFn: 'alphanumeric',
    }),

    columnHelper.accessor('category', {
      header: 'Category',
      cell: (info) => <CategoryBadge category={info.getValue()} />,
      sortingFn: 'alphanumeric',
      meta: {
        tooltip: 'Accepted product types on this platform.',
      },
    }),

    columnHelper.accessor('linkAttribute', {
      header: 'Dofollow',
      cell: (info) => (
        <DataTableCellLinkAttribute
          value={info.getValue()}
          linkAttributeNotes={info.row.original.linkAttributeNotes}
        />
      ),
      enableSorting: false,
      meta: {
        tooltip: 'Whether the platform gives you a dofollow link.',
      },
    }),

    columnHelper.accessor('isAccountRequired', {
      header: 'Account',
      cell: (info) => <DataTableCellAccount value={info.getValue()} />,
      enableSorting: false,
      meta: {
        tooltip: 'Whether the platform requires an account to submit your product.',
      },
    }),

    columnHelper.accessor('submitUrl', {
      header: 'Submission',
      cell: (info) =>
        info.getValue() ? <DataTableCellLink value={info.getValue() as string} /> : '-',
      enableSorting: false,
    }),
  ]

  const table = useReactTable({
    debugTable: process.env.NEXT_PUBLIC_ENV === 'development',

    data,
    columns,
    state: {
      sorting,
    },
    enableMultiSort: false,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,

    // Reset default column sizes
    defaultColumn: {
      size: undefined,
      minSize: undefined,
      maxSize: undefined,
    },
  })

  return (
    <table className="w-full">
      <thead>
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
  )
}
