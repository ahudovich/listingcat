'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import {
  DashboardSquare01Icon,
  FolderLibraryIcon,
  Rocket01Icon,
  Settings01Icon,
} from '@hugeicons/core-free-icons'
import { BaseIcon } from '@/components/ui/BaseIcon'
import { cn } from '@/utils/css'
import type { IconSvgElement } from '@hugeicons/react'

const mainNavLinks = [
  {
    label: 'Dashboard',
    path: '.',
    icon: DashboardSquare01Icon,
  },
  {
    label: 'Launch Platforms',
    path: 'launch-platforms',
    icon: Rocket01Icon,
  },
  {
    label: 'Directories',
    path: 'directories',
    icon: FolderLibraryIcon,
  },
]

const secondaryNavLinks = [
  {
    label: 'Project Settings',
    path: 'settings',
    icon: Settings01Icon,
  },
]

export function AppSidebar() {
  const params = useParams<{ projectSlug: string | undefined }>()
  const projectSlug = params.projectSlug

  return (
    <aside className="w-64 h-full bg-zinc-50 border-r border-layout-separator">
      <nav className="flex flex-col justify-between p-2 h-full">
        {projectSlug && (
          <>
            <ul className="grid gap-1">
              {mainNavLinks.map((link) => (
                <li key={link.label}>
                  <AppSidebarLink
                    icon={link.icon}
                    label={link.label}
                    path={
                      link.path === '.'
                        ? `/app/project/${projectSlug}`
                        : `/app/project/${projectSlug}/${link.path}`
                    }
                  />
                </li>
              ))}
            </ul>

            <ul className="grid gap-1">
              {secondaryNavLinks.map((link) => (
                <li key={link.label}>
                  <AppSidebarLink
                    icon={link.icon}
                    label={link.label}
                    path={`/app/project/${projectSlug}/${link.path}`}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </nav>
    </aside>
  )
}

function AppSidebarLink({
  icon,
  label,
  path,
}: {
  icon: IconSvgElement
  label: string
  path: string
}) {
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
