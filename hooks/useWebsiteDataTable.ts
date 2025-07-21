import { useState } from 'react'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { env } from '@/env'
import type { AccessorKeyColumnDef, FilterFn, SortingState } from '@tanstack/react-table'

// Custom global filter function
const filterByNameOrWebsiteUrl: FilterFn<any> = (row, columnId, filterValue) => {
  if (!filterValue) return true

  const name = row.original.name as string
  const websiteUrl = row.original.websiteUrl as string

  const searchTerm = filterValue.toLowerCase()

  return name.toLowerCase().includes(searchTerm) || websiteUrl.toLowerCase().includes(searchTerm)
}

interface UseDataTableProps<T> {
  initialSorting: SortingState
  columns: Array<AccessorKeyColumnDef<T, any>>
  data: Array<T>
}

export function useWebsiteDataTable<T>({ initialSorting, columns, data }: UseDataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>(initialSorting)

  const table = useReactTable({
    debugTable: env.NEXT_PUBLIC_ENV === 'development',

    data,
    columns,

    state: {
      sorting,
    },

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),

    enableMultiSort: false,
    onSortingChange: setSorting,

    globalFilterFn: filterByNameOrWebsiteUrl,

    // Reset default column sizes
    defaultColumn: {
      size: undefined,
      minSize: undefined,
      maxSize: undefined,
    },
  })

  return {
    table,
  }
}
