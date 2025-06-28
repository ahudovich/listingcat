import { useState } from 'react'
import { getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { env } from '@/env'
import type { AccessorKeyColumnDef, SortingState } from '@tanstack/react-table'

interface UseDataTableProps<T> {
  initialSorting: SortingState
  columns: Array<AccessorKeyColumnDef<T, any>>
  data: Array<T>
}

export function useDataTable<T>({ initialSorting, columns, data }: UseDataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>(initialSorting)

  const table = useReactTable({
    debugTable: env.NEXT_PUBLIC_ENV === 'development',

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

  return {
    table,
  }
}
