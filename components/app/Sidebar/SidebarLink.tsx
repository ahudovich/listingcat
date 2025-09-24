'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BaseIcon } from '@/components/ui/BaseIcon'
import { cn } from '@/utils/css'
import type { IconSvgElement } from '@hugeicons/react'

interface SidebarLinkProps {
  icon: IconSvgElement
  label: string
  path: string
}

export function SidebarLink({ icon, label, path }: SidebarLinkProps) {
  const pathname = usePathname()

  return (
    <Link
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-zinc-100 [&>svg]:text-tertiary',
        pathname === path &&
          'bg-zinc-200 [&>svg]:text-secondary hover:bg-zinc-200 hover:[&>svg]:text-tertiary'
      )}
      href={path}
    >
      <BaseIcon className="shrink-0 size-4.5 transition-colors" icon={icon} />
      <span className="font-medium text-xs text-secondary">{label}</span>
    </Link>
  )
}
