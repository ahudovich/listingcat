import { formatNumber } from '@/utils/formatters'

export function DataTableCellTraffic({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-x-1.5">{value === 0 ? 'N/A' : formatNumber(value)}</div>
  )
}
