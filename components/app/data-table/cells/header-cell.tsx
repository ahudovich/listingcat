import { ArrowDown02Icon, ArrowUp02Icon, HelpCircleIcon } from '@hugeicons/core-free-icons'
import { BaseIcon } from '@/components/ui/icon'
import { BaseTooltip } from '@/components/ui/tooltip'
import { cn } from '@/utils/css'
import type { Column, SortDirection } from '@tanstack/react-table'

interface DataTableHeaderCellProps {
  column: Column<any, unknown>
  children: React.ReactNode
  isSortable: boolean
  sortingDirection: SortDirection | false
  size?: number
  tooltip?: string
  onClick?: (event: unknown) => void
}

export function DataTableHeaderCell({
  column,
  children,
  isSortable,
  sortingDirection,
  size,
  tooltip,
  onClick,
}: DataTableHeaderCellProps) {
  const Component = isSortable ? 'button' : 'div'

  const icon =
    sortingDirection === 'asc'
      ? ArrowUp02Icon
      : sortingDirection === 'desc'
        ? ArrowDown02Icon
        : null

  return (
    <th className="p-0" style={{ width: size && `${size / 16}rem` }}>
      <div
        className={cn(
          'relative flex items-center gap-1 px-4 h-10.5 w-full bg-zinc-100 border-b border-b-zinc-200',
          column.id === 'name' && 'pl-0'
        )}
      >
        <Component
          className={cn(
            'flex items-center gap-1 font-medium text-xs whitespace-nowrap select-none',
            isSortable && 'text-left cursor-pointer'
          )}
          type={isSortable ? 'button' : undefined}
          onClick={(event) => isSortable && onClick?.(event)}
        >
          {children}
          {icon && <BaseIcon className="size-3 text-secondary" icon={icon} strokeWidth={2.5} />}
        </Component>

        {tooltip && (
          <BaseTooltip className="max-w-56" text={tooltip}>
            <BaseIcon
              className="size-3 text-faded cursor-help"
              icon={HelpCircleIcon}
              strokeWidth={2.5}
            />
          </BaseTooltip>
        )}
      </div>
    </th>
  )
}
