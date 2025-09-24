import { Tooltip } from '@base-ui-components/react/tooltip'
import { cn } from '@/utils/css'
import { zIndexes } from '@/utils/z-indexes'

export default function BaseTooltip({
  className,
  children,
  sideOffset = 4,
  text,
  ...props
}: {
  className?: string
  children: React.ReactNode
  sideOffset?: number
  text: string
}) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root delay={250}>
        <Tooltip.Trigger>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner sideOffset={sideOffset}>
            <Tooltip.Popup
              className={cn(
                'overflow-hidden origin-[var(--transform-origin)] px-3 py-1.5 rounded-md bg-zinc-800 shadow-md text-[0.75rem] text-zinc-50 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[instant]:duration-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0',
                className
              )}
              style={{ zIndex: zIndexes.tooltip }}
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
