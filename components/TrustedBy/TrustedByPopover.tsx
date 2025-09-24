import { Popover } from '@base-ui-components/react/popover'
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
        <Popover.Positioner side="top" sideOffset={4}>
          <Popover.Popup
            className={cn(
              'relative overflow-hidden px-3 py-1.5 bg-white border border-layout-separator rounded-md shadow-lg text-xs text-secondary origin-[var(--transform-origin)] transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0',
              className
            )}
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
                <img className="shrink-0 size-3" src={product.logo} alt={product.name} />
                {product.name}
              </a>
            </p>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}
