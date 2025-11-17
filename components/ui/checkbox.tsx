import { Checkbox } from '@base-ui-components/react/checkbox'

export function BaseCheckbox({
  checked,
  indeterminate,
  onCheckedChange,
}: {
  checked: boolean
  indeterminate?: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <Checkbox.Root
      className="relative inline-flex justify-center items-center size-4.5 bg-control-default border border-control-default rounded-sm outline-none transition-colors cursor-pointer focus-visible:bg-control-active focus-visible:border-control-active focus-visible:ring-2 focus-visible:ring-control-default focus-visible:text-control-active"
      checked={checked}
      indeterminate={indeterminate}
      onCheckedChange={onCheckedChange}
    >
      <Checkbox.Indicator className="grid">
        {indeterminate ? (
          // Minus sign
          <span className="block w-2.5 h-0.5 bg-zinc-700 rounded-lg" />
        ) : (
          // Checkmark
          <span className="block -translate-y-px rotate-45 w-1.5 h-2.5 border-b-2 border-r-2 border-zinc-700" />
        )}
      </Checkbox.Indicator>
    </Checkbox.Root>
  )
}
