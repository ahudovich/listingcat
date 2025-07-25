import { formatNumber } from '@/utils/formatters'

export function DataTableCellTraffic({ value }: { value: number }) {
  return <div className="flex items-center gap-x-1.5">{formatNumber(value)}</div>
}
