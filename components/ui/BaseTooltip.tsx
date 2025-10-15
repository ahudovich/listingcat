import { Tooltip } from '@base-ui-components/react/tooltip'
import { cn } from '@/utils/css'

export function BaseTooltip({
  className,
  children,
  delay = 250,
  disabled,
  side,
  sideOffset = 4,
  text,
  ...props
}: {
  className?: string
  children: React.ReactNode
  delay?: React.ComponentProps<typeof Tooltip.Root>['delay']
  disabled?: React.ComponentProps<typeof Tooltip.Root>['disabled']
  side?: React.ComponentProps<typeof Tooltip.Positioner>['side']
  sideOffset?: React.ComponentProps<typeof Tooltip.Positioner>['sideOffset']
  text: string
} & React.ComponentProps<typeof Tooltip.Root>) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root delay={delay} disabled={disabled}>
        <Tooltip.Trigger render={<div />}>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner side={side} sideOffset={sideOffset}>
            <Tooltip.Popup
              className={cn(
                'z-tooltip overflow-hidden origin-[var(--transform-origin)] px-3 py-1.5 rounded-md bg-zinc-800 shadow-md text-[0.75rem] text-zinc-50 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[instant]:duration-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0',
                className
              )}
              {...props}
            >
              {text}
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
