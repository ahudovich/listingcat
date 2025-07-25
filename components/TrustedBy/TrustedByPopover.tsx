import { Popover } from 'radix-ui'
import { cn } from '@/utils/css'
import { zIndexes } from '@/utils/z-indexes'

export default function TrustedByPopover({
  className,
  name,
  title,
  product,
  profileUrl,
  children,
}: {
  className?: string
  name: string
  title: string
  profileUrl: string
  product: { name: string; url: string; logo: string }
  children: React.ReactNode
}) {
  return (
    <Popover.Root>
      <Popover.Trigger className="cursor-pointer">{children}</Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className={cn(
            'relative overflow-hidden px-3 py-1.5 bg-white border border-layout-separator rounded-md shadow-lg text-xs text-secondary animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            className
          )}
          side="top"
          sideOffset={4}
          style={{ zIndex: zIndexes.popover }}
        >
          <p className="mb-1 font-medium">
            <a
              className="inline-flex items-center gap-1.25 transition-colors hover:text-accent"
              href={profileUrl}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              {name}
            </a>
          </p>

          <p className="flex items-center gap-1 text-[0.8125rem]">
            {title} of{' '}
            <a
              className="inline-flex items-center gap-1.25 font-semibold transition-colors hover:text-accent"
              href={product.url}
              target="_blank"
              rel="nofollow"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="shrink-0 size-3" src={product.logo} alt={product.name} />
              {product.name}
            </a>
          </p>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
