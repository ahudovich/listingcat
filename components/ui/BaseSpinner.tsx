import { Loading03Icon } from '@hugeicons/core-free-icons'
import { BaseIcon } from '@/components/ui/BaseIcon'
import { cn } from '@/utils/css'

export function BaseSpinner(
  props: Omit<React.ComponentProps<typeof BaseIcon>, 'icon' | 'role' | 'aria-label'>
) {
  return (
    <BaseIcon
      className={cn('size-4 animate-spin-slow', props.className)}
      icon={Loading03Icon}
      role="status"
      aria-label="Loading"
      {...props}
    />
  )
}
