import { ScrollArea } from 'radix-ui'
import { cn } from '@/utils/css'

export default function BaseScrollArea({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <ScrollArea.Root className={cn('relative overflow-hidden', className)} type="auto" {...props}>
      <ScrollArea.ScrollAreaViewport className="size-full [&>div]:h-full">
        {children}
      </ScrollArea.ScrollAreaViewport>

      <ScrollArea.ScrollAreaScrollbar
        className="flex p-1 w-3.5 bg-zinc-100 select-none touch-none"
        orientation="vertical"
      >
        <ScrollArea.ScrollAreaThumb className="flex-1 bg-zinc-400/70 rounded-full transition-colors hover:bg-zinc-400" />
      </ScrollArea.ScrollAreaScrollbar>
    </ScrollArea.Root>
  )
}
