import { useState } from 'react'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { env } from '@/env'
import type { AccessorKeyColumnDef, FilterFn, SortingState } from '@tanstack/react-table'

// Global fuzzy filter function (`name` and `websiteUrl` columns only)
const filterByNameOrWebsiteUrl: FilterFn<any> = (row, columnId, filterValue) => {
  if (!filterValue) return true

  const name = row.original.name as string
  const websiteUrl = row.original.websiteUrl as string

  // Combine name and website URL for fuzzy search
  const searchText = `${name} ${websiteUrl}`

  const itemRank = rankItem(searchText, filterValue)

  return itemRank.passed
}

interface UseWebsiteDataTableProps<T> {
  initialSorting: SortingState
  columns: Array<AccessorKeyColumnDef<T, any>>
  data: Array<T>
}

export function useWebsiteDataTable<T>({
  initialSorting,
  columns,
  data,
}: UseWebsiteDataTableProps<T>) {
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
