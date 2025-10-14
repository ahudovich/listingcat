import { ScrollArea } from '@base-ui-components/react/scroll-area'
import { cn } from '@/utils/css'

export function BaseScrollArea({ className, children, ...props }: ScrollArea.Root.Props) {
  return (
    <ScrollArea.Root className={cn('relative overflow-hidden', className)} {...props}>
      <ScrollArea.Viewport className="overscroll-contain size-full [&>div]:h-full">
        {children}
      </ScrollArea.Viewport>

      <BaseScrollAreaScrollbar className="w-3.5" orientation="vertical" />
      <BaseScrollAreaScrollbar className="h-3.5" orientation="horizontal" />
    </ScrollArea.Root>
  )
}

function BaseScrollAreaScrollbar({ className, ...props }: ScrollArea.Scrollbar.Props) {
  return (
    <ScrollArea.Scrollbar
      className={cn(
        'flex p-1 bg-zinc-100 opacity-0 transition-opacity delay-300 pointer-events-none data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[hovering]:duration-75 data-[hovering]:pointer-events-auto data-[scrolling]:opacity-100 data-[scrolling]:delay-0 data-[scrolling]:duration-75 data-[scrolling]:pointer-events-auto',
        className
      )}
      {...props}
    >
      <ScrollArea.Thumb className="flex-1 bg-zinc-400/70 rounded-full transition-colors hover:bg-zinc-400" />
    </ScrollArea.Scrollbar>
  )
}
