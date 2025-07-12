import { LinkSquare02Icon } from '@hugeicons/core-free-icons'
import BaseIcon from '../ui/BaseIcon'

export default function ExternalLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <a
      className="group inline-flex items-center gap-1.5 font-medium"
      href={`${href}?ref=listingcat.com`}
      target="_blank"
      rel="nofollow noopener noreferrer"
    >
      {children}
      <BaseIcon
        className="size-4 text-tertiary transition-colors group-hover:text-secondary"
        icon={LinkSquare02Icon}
        strokeWidth={2.5}
      />
    </a>
  )
}
