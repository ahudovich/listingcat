import { Cancel01Icon, CheckmarkCircle02Icon } from '@hugeicons/core-free-icons'
import { BaseIcon } from '@/components/ui/BaseIcon'
import { cn } from '@/utils/css'

export function DataTableCellAccount({ value }: { value: boolean }) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center gap-1 px-2 py-0.5 min-w-22 rounded-full font-semibold text-[0.625rem] leading-[0.875rem] tracking-[0.01rem] whitespace-nowrap uppercase',
        value
          ? 'text-slate-800 bg-slate-100 border border-slate-600/50'
          : 'text-slate-600 bg-slate-100/25 border border-slate-600/25'
      )}
    >
      <BaseIcon
        className={cn('shrink-0 size-3', value ? 'text-slate-700' : 'text-slate-500')}
        icon={value ? CheckmarkCircle02Icon : Cancel01Icon}
        strokeWidth={2.5}
      />
      {value ? 'Required' : 'Optional'}
    </div>
  )
}
