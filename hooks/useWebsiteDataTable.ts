import { useState } from 'react'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { env } from '@/env'
import { LinkAttributes } from '@/enums/LinkAttributes.enum'
import type {
  AccessorKeyColumnDef,
  ColumnFiltersState,
  FilterFn,
  SortingState,
} from '@tanstack/react-table'

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
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    debugTable: env.NEXT_PUBLIC_ENV === 'development',

    data,
    columns,

    state: {
      sorting,
      globalFilter,
      columnFilters,
    },

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),

    enableMultiSort: false,
    onSortingChange: setSorting,

    globalFilterFn: fuzzySearch,
    onGlobalFilterChange: setGlobalFilter,

    onColumnFiltersChange: setColumnFilters,

    filterFns: {
      pricingModelFilter,
      linkAttributeFilter,
    },

    // Reset default column sizes
    defaultColumn: {
      size: undefined,
      minSize: undefined,
      maxSize: undefined,
    },
  })

  return {
    table,
    globalFilter,
    setGlobalFilter,
    columnFilters,
    setColumnFilters,
  }
}

// Fuzzy search filter function
const fuzzySearch: FilterFn<any> = (row, columnId, filterValue) => {
  if (!filterValue) return true

  const name = row.original.name as string
  const websiteUrl = row.original.websiteUrl as string

  // Combine name and website URL for fuzzy search
  const searchText = `${name} ${websiteUrl}`

  const itemRank = rankItem(searchText, filterValue)

  return itemRank.passed
}

// Custom filter function for pricing model
const pricingModelFilter: FilterFn<any> = (row, columnId, filterValue) => {
  if (!filterValue) return true

  const pricingModel = row.getValue(columnId) as string

  if (filterValue === 'free') {
    return pricingModel === 'free' || pricingModel === 'mixed'
  }

  if (filterValue === 'paid') {
    return pricingModel === 'paid' || pricingModel === 'mixed'
  }

  return true
}

// Custom filter function for link attribute
const linkAttributeFilter: FilterFn<any> = (row, columnId, filterValue) => {
  if (!filterValue) return true

  const linkAttribute = row.getValue(columnId) as LinkAttributes

  if (filterValue === 'dofollow') {
    return linkAttribute === LinkAttributes.Dofollow
  }

  if (filterValue === 'nofollow') {
    return linkAttribute !== LinkAttributes.Dofollow
  }

  return true
}
