import { Cancel01Icon, Tick02Icon } from '@hugeicons/core-free-icons'
import BaseIcon from '@/components/ui/BaseIcon'

export default function DataTableCellAccount({ value }: { value: boolean }) {
  return (
    <div className="flex items-center gap-1 capitalize">
      <BaseIcon
        className="shrink-0 size-4 text-secondary"
        icon={value ? Tick02Icon : Cancel01Icon}
        strokeWidth={2.5}
      />
      {value ? 'Yes' : 'No'}
    </div>
  )
}
