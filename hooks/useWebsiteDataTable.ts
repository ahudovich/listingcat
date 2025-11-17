import { useState } from 'react'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { deleteCookie } from 'cookies-next'
import { setCookie } from 'cookies-next/client'
import { env } from '@/env'
import { COOKIE_TABLE_PAGE_SIZE } from '@/enums/constants'
import { DEFAULT_PAGE_SIZE } from '@/enums/data-table'
import { LinkAttributes } from '@/enums/link'
import { SubmissionStatus } from '@/enums/submission'
import { cookieOptions } from '@/lib/cookies/client'
import type {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  PaginationState,
  RowSelectionState,
  SortingState,
} from '@tanstack/react-table'
import type { PageSizeType } from '@/enums/data-table'

interface UseWebsiteDataTableProps<T> {
  initialPageSize: PageSizeType
  initialSorting: SortingState
  columns: Array<ColumnDef<T, any>>
  data: Array<T>
}

export function useWebsiteDataTable<T>({
  initialPageSize,
  initialSorting,
  columns,
  data,
}: UseWebsiteDataTableProps<T>) {
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>(initialSorting)
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  })

  const table = useReactTable({
    debugTable: env.NEXT_PUBLIC_ENV === 'development',

    data,
    columns,

    state: {
      globalFilter,
      columnFilters,
      sorting,
      rowSelection,
      pagination,
    },

    // Row ID is required for row selection
    getRowId: (row) => row.id as string,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    globalFilterFn: fuzzySearch,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,

    enableMultiSort: false,
    onSortingChange: setSorting,

    onRowSelectionChange: setRowSelection,

    onPaginationChange: (updater) => {
      const newPagination = typeof updater === 'function' ? updater(pagination) : updater

      setPagination(newPagination)

      if (newPagination.pageSize !== DEFAULT_PAGE_SIZE) {
        setCookie(COOKIE_TABLE_PAGE_SIZE, String(newPagination.pageSize), cookieOptions)
      } else {
        deleteCookie(COOKIE_TABLE_PAGE_SIZE)
      }
    },

    filterFns: {
      submissionStatusFilter,
      pricingModelFilter,
      linkAttributeFilter,
      categoryFilter,
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
    pagination,
    setPagination,
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

// Custom filter function for submission status
const submissionStatusFilter: FilterFn<any> = (row, columnId, filterValue) => {
  if (!filterValue) return true

  if (filterValue === SubmissionStatus.Pending) {
    return row.getValue(columnId) === undefined
  }

  const submissionStatus = row.getValue(columnId) as SubmissionStatus

  return submissionStatus === filterValue
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

// Custom filter function for category
const categoryFilter: FilterFn<any> = (row, columnId, filterValue) => {
  if (!filterValue) return true

  const category = row.getValue(columnId) as string

  return category === filterValue
}
