import { BaseDonutProgress } from '@/components/ui/BaseDonutProgress'

export function DataTableCellDomainRating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-x-1.5">
      <BaseDonutProgress value={value} />
      {value}
    </div>
  )
}
