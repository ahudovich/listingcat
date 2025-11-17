import { mergeProps } from '@base-ui-components/react/merge-props'
import { useRender } from '@base-ui-components/react/use-render'
import { Loading03Icon } from '@hugeicons/core-free-icons'
import { tv } from 'tailwind-variants'
import { BaseIcon } from '@/components/ui/icon'
import { cn } from '@/utils/css'
import type { ReactNode } from 'react'
import type { VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'group inline-flex justify-center items-center gap-1.5 rounded-full outline-none font-semibold whitespace-nowrap transition-all cursor-pointer focus-visible:ring-2 disabled:opacity-50 disabled:cursor-default [&>svg]:shrink-0 [&>svg]:fill-current',
  variants: {
    size: {
      xs: 'px-4 h-control-xs text-xs [&_svg]:!size-3.5',
      sm: 'px-5 h-control-sm text-xs [&_svg]:!size-4',
      md: 'px-6 h-control-md text-xs [&_svg]:!size-4.5',
      lg: 'px-7 h-control-lg text-sm [&_svg]:!size-5',
    },
    variant: {
      primary: 'bg-accent text-contrast focus-visible:ring-control-default',
      secondary:
        'bg-control-default border border-control-default text-primary focus-visible:ring-control-default',
      outline:
        'bg-control-default border border-control-default hover:bg-zinc-100 focus-visible:ring-control-default',
      ghost: 'bg-transparent text-primary hover:bg-zinc-100 focus-visible:ring-control-default',
      destructive: 'bg-red-600 text-contrast hover:bg-red-700 focus-visible:ring-control-error',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
})

type ButtonVariants = VariantProps<typeof buttonVariants>

interface BaseButtonProps extends useRender.ComponentProps<'button'> {
  className?: string
  isLoading?: boolean
  size?: ButtonVariants['size']
  variant?: ButtonVariants['variant']
  children: ReactNode
}

export function BaseButton({
  render,
  className,
  isLoading,
  size,
  variant,
  children,
  ...props
}: BaseButtonProps) {
  const defaultProps: useRender.ElementProps<'button'> = {
    className: cn(buttonVariants({ size, variant }), className),
    children: isLoading ? (
      <BaseIcon className="animate-spin-slow" icon={Loading03Icon} />
    ) : (
      children
    ),
  }

  const element = useRender({
    defaultTagName: 'button',
    render,
    props: mergeProps<'button'>(defaultProps, props),
  })

  return element
}
