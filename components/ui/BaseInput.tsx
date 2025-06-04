import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'
import type { ChangeEvent, ComponentProps } from 'react'
import type { VariantProps } from 'tailwind-variants'

const inputVariants = tv({
  slots: {
    base: '',
    label: 'inline-block mb-1.5 text-sm font-medium text-secondary cursor-pointer',
    input:
      'block px-3 w-full bg-control-default border border-control-default rounded-control outline-none font-medium text-control-default appearance-none transition-colors placeholder:text-control-placeholder focus:bg-control-active focus:border-control-active focus:ring-2 focus:ring-control-default focus:text-control-active',
  },
  variants: {
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
    size: 'md',
  },
})

type InputVariants = VariantProps<typeof inputVariants>

interface BaseInputProps {
  id: string
  value?: string
  className?: string
  rootClasses?: string
  label?: string
  size?: InputVariants['size']
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function BaseInput({
  className,
  id,
  label,
  rootClasses,
  size,
  value,
  onChange,
  ...props
}: BaseInputProps & ComponentProps<'input'>) {
  const { base, label: labelVariants, input } = inputVariants({ size })

  return (
    <div className={twMerge(base(), rootClasses)}>
      {label && (
        <label className={labelVariants()} htmlFor={id}>
          {label}
        </label>
      )}

      <input
        id={id}
        className={input({ className })}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  )
}
