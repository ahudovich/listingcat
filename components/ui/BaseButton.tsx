import { Loading03Icon } from '@hugeicons/core-free-icons'
import { Slot } from 'radix-ui'
import { tv } from 'tailwind-variants'
import BaseIcon from '@/components/ui/BaseIcon'
import type { ComponentProps, ReactNode } from 'react'
import type { VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'inline-flex justify-center items-center gap-1.5 rounded-full outline-none font-semibold whitespace-nowrap transition-colors cursor-pointer focus:ring-2 focus:ring-control-default disabled:opacity-75 disabled:cursor-not-allowed [&>svg]:shrink-0 [&>svg]:fill-current',
  variants: {
    size: {
      sm: 'px-5 h-control-sm text-xs [&>svg]:size-4',
      md: 'px-6 h-control-md text-xs [&>svg]:size-4',
      lg: 'px-7 h-control-lg text-sm [&>svg]:size-4.5',
    },
    variant: {
      primary: 'bg-accent text-contrast',
      secondary: 'bg-control-default border border-control-default text-primary',
      ghost: 'bg-transparent text-primary',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
})

type ButtonVariants = VariantProps<typeof buttonVariants>

interface BaseButtonProps {
  asChild?: boolean
  children: ReactNode
  className?: string
  isLoading?: boolean
  size?: ButtonVariants['size']
  variant?: ButtonVariants['variant']
}

export default function BaseButton({
  asChild,
  children,
  className,
  isLoading,
  size,
  variant,
  ...props
}: BaseButtonProps & ComponentProps<'button'>) {
  const Component = asChild ? Slot.Root : 'button'

  return (
    <Component className={buttonVariants({ size, variant, className })} {...props}>
      {isLoading ? (
        <BaseIcon className="animate-spin-slow" icon={Loading03Icon} />
      ) : (
        <Slot.Slottable>{children}</Slot.Slottable>
      )}
    </Component>
  )
}
