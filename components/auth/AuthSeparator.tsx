import { Separator } from 'radix-ui'
import { cn } from '@/utils/css'

export default function AuthSeparator({ className }: { className?: string }) {
  return (
    <Separator.Root
      className={cn(
        'relative my-6 text-center before:absolute before:inset-x-0 before:top-1/2 before:-translate-y-[calc(50%_-_1px)] before:h-px before:bg-layout-separator',
        className
      )}
    >
      <span className="relative px-2.5 bg-white font-semibold text-[0.8125rem] leading-none text-muted uppercase">
        Or
      </span>
    </Separator.Root>
  )
}
