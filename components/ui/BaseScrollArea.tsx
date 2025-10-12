import { ScrollArea } from '@base-ui-components/react/scroll-area'
import { cn } from '@/utils/css'

export function BaseScrollArea({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <ScrollArea.Root className={cn('relative overflow-hidden', className)} {...props}>
      <ScrollArea.Viewport className="overscroll-contain size-full [&>div]:h-full">
        {children}
      </ScrollArea.Viewport>

      <ScrollArea.Scrollbar
        className="flex p-1 w-3.5 bg-zinc-100 pointer-events-none data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[hovering]:duration-75 data-[hovering]:pointer-events-auto data-[scrolling]:opacity-100 data-[scrolling]:delay-0 data-[scrolling]:duration-75 data-[scrolling]:pointer-events-auto"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="flex-1 bg-zinc-400/70 rounded-full transition-colors hover:bg-zinc-400" />
      </ScrollArea.Scrollbar>

      <ScrollArea.Scrollbar
        className="flex p-1 h-3.5 bg-zinc-100 pointer-events-none data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[hovering]:duration-75 data-[hovering]:pointer-events-auto data-[scrolling]:opacity-100 data-[scrolling]:delay-0 data-[scrolling]:duration-75 data-[scrolling]:pointer-events-auto"
        orientation="horizontal"
      >
        <ScrollArea.Thumb className="flex-1 bg-zinc-400/70 rounded-full transition-colors hover:bg-zinc-400" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}
