import Link from 'next/link'
import { LinkSquare02Icon } from '@hugeicons/core-free-icons'
import { BaseIcon } from '@/components/ui/BaseIcon'

export function DataTableCellName({ name, websiteUrl }: { name: string; websiteUrl: string }) {
  return (
    <div className="flex items-center">
      <Link
        className="group/link inline-flex items-center gap-2 text-secondary leading-4.5 whitespace-nowrap"
        href={websiteUrl}
        target="_blank"
      >
        <img
          className="shrink-0 size-4"
          src={`https://www.google.com/s2/favicons?domain=${websiteUrl}&sz=32`}
          alt={`${name} favicon`}
        />
        <span className="border-y border-y-transparent transition-colors group-hover/link:border-b-zinc-400">
          {name}
        </span>
        <BaseIcon
          className="-ml-1 size-3 opacity-0 text-faded transition-all group-hover/link:opacity-100"
          icon={LinkSquare02Icon}
          strokeWidth={2.5}
        />
      </Link>
    </div>
  )
}
