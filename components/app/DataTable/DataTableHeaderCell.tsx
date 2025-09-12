import { ArrowDown02Icon, ArrowUp02Icon, HelpCircleIcon } from '@hugeicons/core-free-icons'
import { BaseIcon } from '@/components/ui/BaseIcon'
import BaseTooltip from '@/components/ui/BaseTooltip'
import { cn } from '@/utils/css'
import type { SortDirection } from '@tanstack/react-table'

interface DataTableHeaderCellProps {
  children: React.ReactNode
  isSortable: boolean
  sortingDirection: SortDirection | false
  size?: number
  tooltip?: string
  onClick?: (event: unknown) => void
}

export default function DataTableHeaderCell({
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
      <Component
        className={cn(
          'relative flex items-center px-4 h-10.5 w-full bg-zinc-100 border-b border-b-zinc-200 font-medium text-xs whitespace-nowrap select-none',
          isSortable && 'text-left cursor-pointer'
        )}
        type={isSortable ? 'button' : undefined}
        onClick={(event) => isSortable && onClick?.(event)}
      >
        <span className="relative">
          {children}

          {icon && (
            <BaseIcon
              className="absolute -right-4 top-1/2 -translate-y-1/2 size-3 text-secondary"
              icon={icon}
              strokeWidth={2.5}
            />
          )}
          {tooltip && (
            <BaseTooltip className="max-w-56" text={tooltip}>
              <BaseIcon
                className={cn(
                  'absolute top-1/2 -translate-y-1/2 size-3 text-faded cursor-help',
                  icon ? '-right-8' : '-right-4'
                )}
                icon={HelpCircleIcon}
                strokeWidth={2.5}
              />
            </BaseTooltip>
          )}
        </span>
      </Component>
    </th>
  )
}
