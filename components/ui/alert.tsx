import { tv } from 'tailwind-variants'
import type { ComponentProps } from 'react'
import type { VariantProps } from 'tailwind-variants'

const alertVariants = tv({
  base: 'px-3 py-2 border rounded-control text-xs',
  variants: {
    variant: {
      destructive: 'bg-red-100 border-red-300 text-red-700',
      success: 'bg-green-100 border-green-300 text-green-700',
    },
  },
  defaultVariants: {
    variant: 'success',
  },
})

type AlertVariants = VariantProps<typeof alertVariants>

interface BaseAlertProps {
  children: React.ReactNode
  className?: string
  variant?: AlertVariants['variant']
}

export function BaseAlert({
  children,
  className,
  variant,
  ...props
}: BaseAlertProps & ComponentProps<'div'>) {
  return (
    <div className={alertVariants({ variant, className })} role="alert" {...props}>
      {children}
    </div>
  )
}
