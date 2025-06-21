import { tv } from 'tailwind-variants'
import { cn } from '@/utils/css'
import type { ReactNode } from 'react'
import type { VariantProps } from 'tailwind-variants'

const badgeVariants = tv({
  base: 'inline-flex items-center justify-center gap-2 px-2 h-4.5 rounded font-semibold text-[11px]',
  variants: {
    variant: {
      zinc: 'bg-zinc-200 text-zinc-700',
      accent: 'bg-accent text-white',
    },
  },
  defaultVariants: {
    variant: 'zinc',
  },
})

type BadgeVariants = VariantProps<typeof badgeVariants>

interface BaseBadgeProps {
  children: ReactNode
  className?: string
  variant?: BadgeVariants['variant']
}

export default function BaseBadge({ children, className, variant }: BaseBadgeProps) {
  return <span className={cn(badgeVariants({ className, variant }))}>{children}</span>
}
