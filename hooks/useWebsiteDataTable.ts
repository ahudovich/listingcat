import { useState } from 'react'
import { useLocalStorage } from 'react-use'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { env } from '@/env'
import { COOKIE_PREFIX } from '@/enums/constants'
import { PageSize } from '@/enums/data-table'
import { LinkAttributes } from '@/enums/LinkAttributes.enum'
import { SubmissionStatus } from '@/enums/SubmissionStatus.enum'
import type {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  PaginationState,
  SortingState,
} from '@tanstack/react-table'

const DEFAULT_PAGE_SIZE = PageSize.Medium

interface UseWebsiteDataTableProps<T> {
  initialSorting: SortingState
  columns: Array<ColumnDef<T, any>>
  data: Array<T>
}

export function useWebsiteDataTable<T>({
  initialSorting,
  columns,
  data,
}: UseWebsiteDataTableProps<T>) {
  const [storedPageSize, setStoredPageSize, removeStoredPageSize] = useLocalStorage<number>(
    `${COOKIE_PREFIX}-page-size`
  )

  const [globalFilter, setGlobalFilter] = useState<string>('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>(initialSorting)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: storedPageSize ?? DEFAULT_PAGE_SIZE,
  })

  const table = useReactTable({
    debugTable: env.NEXT_PUBLIC_ENV === 'development',

    data,
    columns,

    state: {
      globalFilter,
      columnFilters,
      sorting,
      pagination,
    },

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    globalFilterFn: fuzzySearch,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,

    enableMultiSort: false,
    onSortingChange: setSorting,

    onPaginationChange: (updater) => {
      const newPagination = typeof updater === 'function' ? updater(pagination) : updater

      setPagination(newPagination)

      // Handle localStorage logic for page size
      if (newPagination.pageSize !== DEFAULT_PAGE_SIZE) {
        setStoredPageSize(newPagination.pageSize)
      } else {
        removeStoredPageSize()
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
