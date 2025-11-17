import { Select } from '@base-ui-components/react/select'
import { ArrowDown01Icon, Tick02Icon } from '@hugeicons/core-free-icons'
import { tv } from 'tailwind-variants'
import { BaseIcon } from '@/components/ui/icon'
import { cn } from '@/utils/css'
import type { VariantProps } from 'tailwind-variants'

const selectVariants = tv({
  slots: {
    label: 'inline-block mb-1.5 text-sm font-medium text-secondary cursor-pointer',
    trigger:
      'relative flex items-center justify-between gap-x-2 px-3 w-full bg-control-default border border-control-default rounded-control outline-none appearance-none cursor-pointer select-none transition-all focus-visible:bg-control-active focus-visible:border-control-active focus-visible:ring-2 focus-visible:ring-control-default focus-visible:text-control-active data-[disabled]:opacity-50',
    value: 'font-medium text-control-default',
  },
  variants: {
    size: {
      xs: {
        label: 'text-xs',
        trigger: 'h-control-xs',
        value: 'text-xs',
      },
      sm: {
        label: 'text-xs',
        trigger: 'h-control-sm',
        value: 'text-xs',
      },
      md: {
        label: 'text-xs',
        trigger: 'h-control-md',
        value: 'text-xs',
      },
      lg: {
        label: 'text-sm',
        trigger: 'h-control-lg',
        value: 'text-sm',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type SelectVariants = VariantProps<typeof selectVariants>

interface BaseSelectProps extends React.ComponentProps<typeof Select.Root> {
  ref?: React.Ref<HTMLInputElement>
  className?: string
  disabled?: boolean
  error?: string
  label?: string
  size?: SelectVariants['size']
}

export function BaseSelect({
  ref,
  id,
  className,
  disabled,
  error,
  label,
  size,
  value,
  children,
  ...props
}: BaseSelectProps) {
  const { label: labelClasses, trigger, value: valueClasses } = selectVariants({ size })

  return (
    <div className={className}>
      {label && (
        <label className={labelClasses()} htmlFor={id}>
          {label}
        </label>
      )}

      <Select.Root inputRef={ref} id={id} disabled={disabled} value={value} {...props}>
        <Select.Trigger
          className={cn(
            trigger({ className }),
            error &&
              'border-control-error ring-2 ring-control-error focus-visible:border-control-error focus-visible:ring-control-error'
          )}
        >
          <Select.Value
            className={valueClasses({ className: !value && 'text-control-placeholder' })}
          />
          <Select.Icon className="shrink-0">
            <BaseIcon
              className="size-4 text-control-icon"
              icon={ArrowDown01Icon}
              strokeWidth={2.5}
            />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Positioner
            className="outline-none select-none z-popup"
            alignItemWithTrigger={false}
            sideOffset={4}
          >
            <Select.Popup className="overflow-hidden p-1 bg-white border border-zinc-200 rounded-lg shadow-lg origin-[var(--transform-origin)] transition-[transform,scale,opacity] data-[starting-style]:scale-90 data-[starting-style]:opacity-0">
              <Select.List>{children}</Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>

      {error && (
        <p className="mt-1.5 text-xs text-control-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export function BaseSelectItem({
  label,
  value,
  children,
}: React.ComponentProps<typeof Select.Item>) {
  return (
    <Select.Item
      className="group grid grid-cols-[1rem_1fr] items-center gap-2 py-1 px-2 min-w-[var(--anchor-width)] rounded-lg outline-none select-none transition-colors cursor-pointer data-[highlighted]:bg-zinc-100"
      label={label}
      value={value}
    >
      <Select.ItemIndicator className="col-start-1">
        <BaseIcon className="size-4 text-control-icon" icon={Tick02Icon} strokeWidth={2.5} />
      </Select.ItemIndicator>
      <Select.ItemText className="col-start-2 text-xs group-data-[selected]:font-medium">
        {children}
      </Select.ItemText>
    </Select.Item>
  )
}
