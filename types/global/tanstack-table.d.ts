import '@tanstack/react-table'
import type { FilterFn, RowData } from '@tanstack/react-table'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    tooltip?: string
  }
}

// Declare custom filter functions for TypeScript
declare module '@tanstack/react-table' {
  interface FilterFns {
    pricingModelFilter: FilterFn<unknown>
    linkAttributeFilter: FilterFn<unknown>
    categoryFilter: FilterFn<unknown>
  }
}
