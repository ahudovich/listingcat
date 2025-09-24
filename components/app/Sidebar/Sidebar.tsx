'use client'

import { useParams } from 'next/navigation'
import { FolderLibraryIcon, Rocket01Icon } from '@hugeicons/core-free-icons'
import { SidebarLink } from '@/components/app/Sidebar/SidebarLink'

const navLinks = [
  {
    label: 'Launch Platforms',
    path: `launch-platforms`,
    icon: Rocket01Icon,
  },
  {
    label: 'Directories',
    path: `directories`,
    icon: FolderLibraryIcon,
  },
]

export function Sidebar() {
  const params = useParams()
  const projectSlug = params.projectSlug as string | undefined

  return (
    <aside className="w-64 h-full bg-zinc-50 border-r border-layout-separator">
      <nav className="p-2">
        {projectSlug && (
          <ul className="grid gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <SidebarLink
                  icon={link.icon}
                  label={link.label}
                  path={`/app/project/${projectSlug}/${link.path}`}
                />
              </li>
            ))}
          </ul>
        )}
      </nav>
    </aside>
  )
}
