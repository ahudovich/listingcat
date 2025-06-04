import { HugeiconsIcon } from '@hugeicons/react'
import { cn } from '@/utils/css'
import type { IconSvgElement } from '@hugeicons/react'

export default function BaseIcon({
  className,
  icon,
  label,
  strokeWidth = 1.9,
  ...props
}: {
  className?: string
  icon: IconSvgElement
  label?: string
  strokeWidth?: number
}) {
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
