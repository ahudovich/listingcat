'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import {
  DashboardCircleIcon,
  DashboardSquare01Icon,
  FolderLibraryIcon,
  Rocket01Icon,
  Settings01Icon,
  SidebarRightIcon,
} from '@hugeicons/core-free-icons'
import { AnimatePresence, motion } from 'motion/react'
import { BaseIcon } from '@/components/ui/BaseIcon'
import { BaseTooltip } from '@/components/ui/BaseTooltip'
import { cn } from '@/utils/css'
import type { IconSvgElement } from '@hugeicons/react'

const dashboardNavLinks = [
  {
    label: 'Projects',
    path: '.',
    icon: DashboardCircleIcon,
  },
]

const projectNavLinks = [
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
  {
    label: 'Settings',
    path: 'settings',
    icon: Settings01Icon,
  },
]

export function AppSidebar() {
  const params = useParams<{ projectSlug: string | undefined }>()
  const projectSlug = params.projectSlug

  const [isCollapsed, setIsCollapsed] = useState(false)

  const navLinks = projectSlug ? projectNavLinks : dashboardNavLinks

  return (
    <motion.aside
      className="flex flex-col justify-between gap-2 px-2 py-2.5 h-full bg-zinc-50 border-r border-layout-separator"
      initial={false}
      animate={{ width: isCollapsed ? '3.625rem' : '15rem' }}
    >
      <nav>
        <ul className="overflow-hidden grid gap-0.5">
          {navLinks.map((link) => (
            <li key={link.label}>
              <AppSidebarLink
                isCollapsed={isCollapsed}
                icon={link.icon}
                label={link.label}
                path={
                  projectSlug
                    ? link.path === '.'
                      ? `/app/project/${projectSlug}`
                      : `/app/project/${projectSlug}/${link.path}`
                    : link.path === '.'
                      ? '/app'
                      : `/app/${link.path}`
                }
              />
            </li>
          ))}
        </ul>
      </nav>

      <button
        className="self-start flex items-center gap-3 px-3 h-9 rounded-lg transition-colors cursor-pointer hover:bg-zinc-100"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <BaseIcon className="size-4.5 text-tertiary" icon={SidebarRightIcon} />
      </button>
    </motion.aside>
  )
}

function AppSidebarLink({
  isCollapsed,
  icon,
  label,
  path,
}: {
  isCollapsed: boolean
  icon: IconSvgElement
  label: string
  path: string
}) {
  const pathname = usePathname()

  return (
    <BaseTooltip delay={400} disabled={!isCollapsed} side="right" sideOffset={4} text={label}>
      <Link
        className={cn(
          'flex items-center gap-3 px-3 h-9 rounded-lg transition-all duration-300 hover:bg-zinc-100 [&>svg]:text-tertiary',
          pathname === path &&
            'bg-zinc-200 [&>svg]:text-secondary hover:bg-zinc-200 hover:[&>svg]:text-tertiary'
        )}
        href={path}
      >
        <BaseIcon className="shrink-0 size-4.5 transition-colors" icon={icon} />
        <AnimatePresence>
          {!isCollapsed && (
            <motion.span
              key={label}
              className="font-medium text-xs text-secondary whitespace-nowrap"
              exit={{ opacity: 0 }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </Link>
    </BaseTooltip>
  )
}
