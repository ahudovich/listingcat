import { HugeiconsIcon } from '@hugeicons/react'
import { cn } from '@/utils/css'
import type { HugeiconsProps, IconSvgElement } from '@hugeicons/react'

interface BaseIconProps extends HugeiconsProps {
  className?: string
  icon: IconSvgElement
  label?: string
}

export function BaseIcon({ className, icon, label, strokeWidth = 2, ...props }: BaseIconProps) {
  return (
    <span className={cn('grid', className)}>
      {label && <span className="sr-only">{label}</span>}
      <HugeiconsIcon
        className="size-full"
        icon={icon}
        strokeWidth={strokeWidth}
        aria-hidden="true"
        focusable={false}
        {...props}
      />
    </span>
  )
}
