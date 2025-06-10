import Link from 'next/link'
import { Globe02Icon } from '@hugeicons/core-free-icons'
import BaseIcon from '@/components/ui/BaseIcon'

export default function DataTableCellName({
  name,
  faviconUrl,
  websiteUrl,
}: {
  name: string
  faviconUrl: string | null
  websiteUrl: string
}) {
  return (
    <Link className="flex items-center gap-2 text-secondary" href={websiteUrl} target="_blank">
      {faviconUrl ? (
        <img
          className="shrink-0 size-4"
          src={`${websiteUrl}/favicon.ico`}
          alt={`${name} favicon`}
        />
      ) : (
        <BaseIcon className="shrink-0 size-4 text-faded" icon={Globe02Icon} strokeWidth={2} />
      )}
      <span className="border-b border-b-transparent hover:border-b-current">{name}</span>
    </Link>
  )
}
