'use client'

import { useEffect, useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import {
  Cancel01Icon,
  DashboardCircleIcon,
  DashboardSquare01Icon,
  FolderLibraryIcon,
  Rocket01Icon,
  Settings01Icon,
  SidebarRightIcon,
} from '@hugeicons/core-free-icons'
import { setCookie } from 'cookies-next/client'
import { AnimatePresence, motion } from 'motion/react'
import { BaseIcon } from '@/components/ui/BaseIcon'
import { BaseLogo } from '@/components/ui/BaseLogo'
import { BaseTooltip } from '@/components/ui/BaseTooltip'
import { useSidebar } from '@/contexts/sidebar'
import { APP_REDIRECT_URL, COOKIE_SIDEBAR_COLLAPSED } from '@/enums/constants'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useBreakpointLg } from '@/hooks/useBreakpoints'
import { cookieOptions } from '@/lib/cookies/client'
import { cn } from '@/utils/css'
import type { RefObject } from 'react'
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

export function AppSidebarContent({ initialCollapsed }: { initialCollapsed: boolean }) {
  const params = useParams<{ projectSlug: string | undefined }>()
  const projectSlug = params.projectSlug

  const pathname = usePathname()
  const isBreakpointLg = useBreakpointLg(initialCollapsed)

  const sidebarRef = useRef<HTMLDivElement>(null)

  const { isSidebarOpen, setIsSidebarOpen } = useSidebar()
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed)

  const navLinks = projectSlug ? projectNavLinks : dashboardNavLinks

  useBodyScrollLock({
    isOpen: isSidebarOpen,
    rootRef: sidebarRef as RefObject<HTMLDivElement>,
  })

  useHotkeys('mod+b', () => {
    toggleSidebar()
  })

  // Close sidebar when user navigates to a different page
  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathname, setIsSidebarOpen])

  function toggleSidebar() {
    const newIsCollapsed = !isCollapsed

    setIsCollapsed(newIsCollapsed)
    setCookie(COOKIE_SIDEBAR_COLLAPSED, String(newIsCollapsed), cookieOptions)
  }

  return (
    <>
      {/* Mobile sidebar overlay */}
      <div
        className={cn(
          'fixed inset-0 z-(--z-index-modal) invisible size-full bg-zinc-500/50 opacity-0 duration-300 transition-all lg:hidden',
          isSidebarOpen && 'visible opacity-100'
        )}
        onClick={() => setIsSidebarOpen(false)}
      />

      <div
        className={cn(
          'fixed left-0 inset-y-0 -translate-x-full z-[calc(var(--z-index-modal)_+_1)] h-full transition-all duration-300 lg:static lg:translate-x-0 lg:border-r lg:border-layout-separator lg:transition-none',
          isSidebarOpen && 'translate-x-0'
        )}
      >
        <motion.aside
          ref={sidebarRef}
          className="h-full bg-zinc-50"
          initial={false}
          animate={{ width: isBreakpointLg ? (isCollapsed ? '3.625rem' : '15rem') : '15rem' }}
          transition={isBreakpointLg ? undefined : { duration: 0 }}
        >
          <div className="flex flex-col gap-2.5 pb-2.5 h-full lg:justify-between lg:px-2 lg:pt-2.5">
            <div className="shrink-0 flex items-center justify-between px-2 h-[calc(var(--height-app-header)_+_1px)] border-b border-b-layout-separator lg:hidden">
              <Link href={APP_REDIRECT_URL}>
                <BaseLogo className="ml-2.5 size-5" isIconOnly={true} />
              </Link>

              <button
                className="p-1 cursor-pointer"
                type="button"
                onClick={() => setIsSidebarOpen(false)}
              >
                <BaseIcon className="size-5" icon={Cancel01Icon} />
              </button>
            </div>

            <nav className="px-2 lg:px-0">
              <ul className="overflow-hidden grid gap-0.5">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <AppSidebarLink
                      initialCollapsed={initialCollapsed}
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
              className="hidden lg:flex self-start items-center gap-3 px-3 h-9 rounded-lg transition-colors cursor-pointer hover:bg-zinc-100"
              aria-label="Toggle sidebar"
              onClick={toggleSidebar}
            >
              <BaseIcon className="size-4.5 text-tertiary" icon={SidebarRightIcon} />
            </button>
          </div>
        </motion.aside>
      </div>
    </>
  )
}

function AppSidebarLink({
  initialCollapsed,
  isCollapsed,
  icon,
  label,
  path,
}: {
  initialCollapsed: boolean
  isCollapsed: boolean
  icon: IconSvgElement
  label: string
  path: string
}) {
  const pathname = usePathname()
  const isBreakpointLg = useBreakpointLg(initialCollapsed)

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
          {(isBreakpointLg ? !isCollapsed : true) && (
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
