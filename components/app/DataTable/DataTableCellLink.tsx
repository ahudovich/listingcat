import Link from 'next/link'
import { LinkSquare02Icon } from '@hugeicons/core-free-icons'
import BaseIcon from '@/components/ui/BaseIcon'

export default function DataTableCellLink({ value }: { value: string }) {
  return (
    <Link className="inline-flex items-center gap-1 text-secondary" href={value} target="_blank">
      Open
      <BaseIcon
        className="shrink-0 size-4 text-secondary"
        icon={LinkSquare02Icon}
        strokeWidth={2.5}
      />
    </Link>
  )
}
