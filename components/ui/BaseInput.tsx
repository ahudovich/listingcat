import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'
import { BaseIcon } from '@/components/ui/BaseIcon'
import type { ChangeEvent, ComponentProps } from 'react'
import type { IconSvgElement } from '@hugeicons/react'
import type { VariantProps } from 'tailwind-variants'

const inputVariants = tv({
  slots: {
    base: '',
    label: 'inline-block mb-1.5 text-sm font-medium text-secondary cursor-pointer',
    icon: 'absolute top-1/2 -translate-y-1/2 size-4',
    input:
      'block w-full bg-control-default border border-control-default rounded-control outline-none font-medium text-control-default appearance-none transition-colors placeholder:text-control-placeholder focus:bg-control-active focus:border-control-active focus:ring-2 focus:ring-control-default focus:text-control-active',
  },
  variants: {
    iconPosition: {
      none: {
        input: 'px-3',
      },
      left: {
        icon: 'left-3',
        input: 'pl-9 pr-3',
      },
      right: {
        icon: 'right-3',
        input: 'pl-3 pr-9',
      },
    },
    size: {
      xs: {
        label: 'text-xs',
        input: 'h-control-xs text-xs',
      },
      sm: {
        label: 'text-xs',
        input: 'h-control-sm text-xs',
      },
      md: {
        label: 'text-xs',
        input: 'h-control-md text-xs',
      },
      lg: {
        label: 'text-sm',
        input: 'h-control-lg text-sm',
      },
    },
  },
  defaultVariants: {
    iconPosition: 'none',
    size: 'md',
  },
})

export type InputVariants = VariantProps<typeof inputVariants>
export type NativeInputProps = Omit<ComponentProps<'input'>, 'size' | 'value' | 'className'>
export type NativeInputValue = ComponentProps<'input'>['value']

interface BaseInputProps {
  id: string
  className?: string
  icon?: IconSvgElement
  iconPosition?: InputVariants['iconPosition']
  rootClasses?: string
  label?: string
  size?: InputVariants['size']
  value?: NativeInputValue
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export function BaseInput({
  className,
  id,
  label,
  rootClasses,
  icon,
  iconPosition,
  size,
  value,
  onChange,
  ...props
}: BaseInputProps & NativeInputProps) {
  const {
    base,
    label: labelClasses,
    input,
    icon: iconClasses,
  } = inputVariants({ iconPosition, size })

  return (
    <div className={twMerge(base(), rootClasses)}>
      {label && (
        <label className={labelClasses()} htmlFor={id}>
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={id}
          className={input({ className })}
          value={value}
          onChange={onChange}
          {...props}
        />

        {icon && <BaseIcon className={iconClasses()} icon={icon} strokeWidth={2.5} />}
      </div>
    </div>
  )
}
