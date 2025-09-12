import { useId } from 'react'
import { BaseSearch } from '@/components/ui/BaseSearch'
import { cn } from '@/utils/css'

interface DataTableFiltersProps {
  className?: string
  globalFilter: string
  setGlobalFilter: (value: string) => void
}

export function DataTableFilters({
  className,
  globalFilter,
  setGlobalFilter,
}: DataTableFiltersProps) {
  const id = useId()

  return (
    <div className={cn('flex gap-3', className)}>
      <BaseSearch
        id={id}
        className="w-66"
        placeholder="Search by name or website url"
        size="xs"
        value={globalFilter}
        onChange={(value) => setGlobalFilter(String(value))}
      />
    </div>
  )
}
