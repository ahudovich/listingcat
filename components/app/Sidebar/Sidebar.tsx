'use client'

import { useParams } from 'next/navigation'
import {
  DashboardSquare01Icon,
  FolderLibraryIcon,
  Rocket01Icon,
  Settings01Icon,
} from '@hugeicons/core-free-icons'
import { SidebarLink } from '@/components/app/Sidebar/SidebarLink'

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

export function Sidebar() {
  const params = useParams()
  const projectSlug = params.projectSlug as string | undefined

  return (
    <aside className="w-64 h-full bg-zinc-50 border-r border-layout-separator">
      <nav className="flex flex-col justify-between p-2 h-full">
        {projectSlug && (
          <>
            <ul className="grid gap-1">
              {mainNavLinks.map((link) => (
                <li key={link.label}>
                  <SidebarLink
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
                  <SidebarLink
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
