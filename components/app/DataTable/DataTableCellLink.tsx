import Link from 'next/link'
import { LinkSquare02Icon, Mail01Icon } from '@hugeicons/core-free-icons'
import { BaseIcon } from '@/components/ui/BaseIcon'

export default function DataTableCellLink({
  value,
  type = 'link',
}: {
  value: string
  type?: 'link' | 'email'
}) {
  const Icon = type === 'email' ? Mail01Icon : LinkSquare02Icon

  return (
    <Link className="inline-flex items-center gap-1 text-secondary" href={value} target="_blank">
      {type === 'email' ? 'Send' : 'Open'}
      <BaseIcon className="shrink-0 size-4 text-secondary" icon={Icon} strokeWidth={2.25} />
    </Link>
  )
}
