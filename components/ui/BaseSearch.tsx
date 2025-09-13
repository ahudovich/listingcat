import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import { Cancel01Icon, Search01Icon } from '@hugeicons/core-free-icons'
import { BaseIcon } from '@/components/ui/BaseIcon'
import { BaseInput } from '@/components/ui/BaseInput'
import { cn } from '@/utils/css'
import type { ChangeEvent } from 'react'
import type { InputVariants, NativeInputProps } from '@/components/ui/BaseInput'

interface BaseSearchProps {
  id: string
  className?: string
  value: string
  onChange: (value: string) => void
  size?: InputVariants['size']
  debounceMs?: number
}

export function BaseSearch({
  id,
  className,
  size,
  value,
  onChange,
  debounceMs = 250,
  ...props
}: NativeInputProps & BaseSearchProps) {
  const [internalValue, setInternalValue] = useState(value ?? '')
  const [isClearing, setIsClearing] = useState(false)

  // Keep internalValue in sync if external value changes
  useEffect(() => {
    setInternalValue(value ?? '')
  }, [value])

  // Debounced propagation to parent (but skip when clearing)
  useDebounce(
    () => {
      if (!isClearing) {
        onChange(internalValue)
      }
      setIsClearing(false)
    },
    debounceMs,
    [internalValue]
  )

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInternalValue(event.target.value)
  }

  function handleClear() {
    setIsClearing(true)
    setInternalValue('')
    onChange('') // Call immediately to bypass debounce
  }

  return (
    <div className="relative">
      <BaseInput
        id={`${id}-search`}
        className={cn(className, internalValue && 'pr-8')}
        icon={Search01Icon}
        iconPosition="left"
        size={size}
        autoComplete="off"
        value={internalValue}
        onChange={handleChange}
        {...props}
      />

      <button
        className={cn(
          'invisible absolute top-1/2 right-2 -translate-y-1/2 grid place-items-center size-4 bg-zinc-100 rounded-full cursor-pointer opacity-0 transition-all hover:bg-zinc-200',
          internalValue && 'visible opacity-100'
        )}
        type="button"
        onClick={handleClear}
      >
        <BaseIcon
          className="shrink-0 size-2.5 text-tertiary transition-all group-hover:text-primary group-data-[state=open]:-rotate-180"
          icon={Cancel01Icon}
          strokeWidth={3}
        />
      </button>
    </div>
  )
}
