import { Tooltip } from 'radix-ui'
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
    <Tooltip.TooltipProvider delayDuration={250}>
      <Tooltip.Root>
        <Tooltip.TooltipTrigger asChild>{children}</Tooltip.TooltipTrigger>

        <Tooltip.TooltipPortal>
          <Tooltip.TooltipContent
            className={cn(
              'overflow-hidden px-3 py-1.5 rounded-md bg-zinc-800 shadow-md text-[0.75rem] text-zinc-50 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
              className
            )}
            sideOffset={sideOffset}
            style={{ zIndex: zIndexes.tooltip }}
            {...props}
          >
            {text}
          </Tooltip.TooltipContent>
        </Tooltip.TooltipPortal>
      </Tooltip.Root>
    </Tooltip.TooltipProvider>
  )
}
