'use client'

import { useId } from 'react'
import { BaseSearch } from '@/components/ui/BaseSearch'
import { BaseSelect, BaseSelectItem } from '@/components/ui/BaseSelect'
import { cn } from '@/utils/css'
import type { ColumnFiltersState } from '@tanstack/react-table'

interface DataTableFiltersProps {
  className?: string
  globalFilter: string
  setGlobalFilter: (value: string) => void
  columnFilters: ColumnFiltersState
  setColumnFilters: (filters: ColumnFiltersState) => void
}

const pricingOptions = [
  { label: 'Pricing', value: null },
  { label: 'Free', value: 'free' },
  { label: 'Paid', value: 'paid' },
]

const linkAttributeOptions = [
  { label: 'Link Attribute', value: null },
  { label: 'Dofollow', value: 'dofollow' },
  { label: 'Nofollow', value: 'nofollow' },
]

export function DataTableFilters({
  className,
  globalFilter,
  setGlobalFilter,
  columnFilters,
  setColumnFilters,
}: DataTableFiltersProps) {
  const id = useId()

  // Get current filter values from column filters state
  const pricingFilter = columnFilters.find(({ id }) => id === 'pricingModel')
  const linkAttributeFilter = columnFilters.find(({ id }) => id === 'linkAttribute')

  const pricing = (pricingFilter?.value as string) ?? null
  const linkAttribute = (linkAttributeFilter?.value as string) ?? null

  // Helper function to update column filters
  function updateColumnFilter(columnId: string, value: string | null) {
    setColumnFilters(
      columnFilters
        .filter(({ id }) => id !== columnId)
        .concat(value ? [{ id: columnId, value }] : [])
    )
  }

  function resetFilters() {
    setGlobalFilter('')
    setColumnFilters([])
  }

  return (
    <div className={cn('flex items-center gap-3 overflow-x-auto', className)}>
      <BaseSearch
        id={id}
        className="w-66"
        placeholder="Search by name or website url"
        size="xs"
        value={globalFilter}
        onChange={(value) => setGlobalFilter(String(value))}
      />

      <BaseSelect
        id={id}
        className="w-32"
        items={pricingOptions}
        modal={false}
        size="xs"
        value={pricing}
        onValueChange={(value) => updateColumnFilter('pricingModel', value as string | null)}
      >
        {pricingOptions.map((option) => (
          <BaseSelectItem key={option.value} label={option.label} value={option.value}>
            {option.label}
          </BaseSelectItem>
        ))}
      </BaseSelect>

      <BaseSelect
        id={id}
        className="w-36"
        items={linkAttributeOptions}
        modal={false}
        size="xs"
        value={linkAttribute}
        onValueChange={(value) => updateColumnFilter('linkAttribute', value as string | null)}
      >
        {linkAttributeOptions.map((option) => (
          <BaseSelectItem key={option.value} label={option.label} value={option.value}>
            {option.label}
          </BaseSelectItem>
        ))}
      </BaseSelect>

      <button
        className={cn(
          'invisible px-3 h-control-xs rounded-control opacity-0 outline-none font-medium text-xs text-control-default cursor-pointer select-none transition-all focus-visible:bg-control-active focus-visible:border-control-active focus-visible:ring-2 focus-visible:ring-control-default focus-visible:text-control-active',
          (globalFilter || columnFilters.length > 0) && 'visible opacity-100'
        )}
        onClick={resetFilters}
      >
        Reset
      </button>
    </div>
  )
}
