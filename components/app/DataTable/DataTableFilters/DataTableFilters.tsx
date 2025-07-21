import { useId } from 'react'
import { Search01Icon } from '@hugeicons/core-free-icons'
import BaseInput from '@/components/ui/BaseInput'
import { cn } from '@/utils/css'
import type { Table } from '@tanstack/react-table'

interface DataTableFiltersProps<T = any> {
  className?: string
  table: Table<T>
}

export function DataTableFilters<T>({ className, table }: DataTableFiltersProps<T>) {
  const id = useId()

  return (
    <div className={cn('flex gap-3', className)}>
      <div className="relative">
        <BaseInput
          id={`${id}-search`}
          className="w-66"
          icon={Search01Icon}
          iconPosition="left"
          placeholder="Search by name or website url"
          size="xs"
          autoComplete="off"
          onChange={(event) => table.setGlobalFilter(String(event.target.value))}
        />
      </div>
    </div>
  )
}
