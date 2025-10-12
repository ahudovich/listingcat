import { Checkbox } from '@base-ui-components/react/checkbox'
import { Remove01Icon, Tick02Icon } from '@hugeicons/core-free-icons'
import { motion } from 'motion/react'
import { BaseIcon } from '@/components/ui/BaseIcon'

export function BaseCheckbox({
  checked,
  indeterminate,
  onCheckedChange,
}: {
  checked: boolean
  indeterminate?: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  const Icon = indeterminate ? Remove01Icon : Tick02Icon

  return (
    <Checkbox.Root
      className="inline-block size-4.5 bg-control-default border border-control-default rounded-sm outline-none transition-colors cursor-pointer focus-visible:bg-control-active focus-visible:border-control-active focus-visible:ring-2 focus-visible:ring-control-default focus-visible:text-control-active"
      checked={checked}
      indeterminate={indeterminate}
      onCheckedChange={onCheckedChange}
    >
      <Checkbox.Indicator
        keepMounted={true}
        render={
          <motion.span
            initial={false}
            animate={{
              opacity: checked || indeterminate ? 1 : 0,
              scale: checked || indeterminate ? 1 : 0.8,
            }}
            transition={{
              duration: 0.1,
              ease: 'easeInOut',
            }}
          />
        }
      >
        <BaseIcon
          className="mx-auto size-3.75 text-control-default"
          icon={Icon}
          strokeWidth={2.5}
        />
      </Checkbox.Indicator>
    </Checkbox.Root>
  )
}
