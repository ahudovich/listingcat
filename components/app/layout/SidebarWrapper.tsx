'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Cancel01Icon, Menu01Icon } from '@hugeicons/core-free-icons'
import { BaseIcon } from '@/components/ui/BaseIcon'
import BaseLogo from '@/components/ui/BaseLogo'
import BaseScrollArea from '@/components/ui/BaseScrollArea'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { cn } from '@/utils/css'
import { zIndexes } from '@/utils/z-indexes'
import type { RefObject } from 'react'

export function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useBodyScrollLock({ isOpen: isSidebarOpen, rootRef: sidebarRef as RefObject<HTMLDivElement> })

  // Close sidebar when user navigates to a different page
  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathname])

  return (
    <>
      {/* Mobile header */}
      <header className="flex items-center gap-4 px-4 h-16 border-b border-b-layout-separator lg:hidden">
        <button
          className="shrink-0 grid size-8 cursor-pointer"
          type="button"
          onClick={() => setIsSidebarOpen(true)}
        >
          <BaseIcon className="m-auto size-6 text-primary" icon={Menu01Icon} strokeWidth={2.5} />
        </button>

        <Link className="shrink-0" href="/">
          <BaseLogo className="w-32.5 h-5" />
        </Link>
      </header>

      {/* Mobile sidebar overlay */}
      <div
        className={cn(
          'fixed inset-0 invisible size-full bg-zinc-500/50 opacity-0 duration-200 transition-all lg:hidden',
          isSidebarOpen && 'visible opacity-100'
        )}
        style={{ zIndex: zIndexes.mobileSidebar - 1 }}
        onClick={() => setIsSidebarOpen(false)}
      />

      <div
        ref={sidebarRef}
        className={cn(
          'fixed left-0 inset-y-0 -translate-x-full bg-zinc-50 duration-200 transition-transform lg:static lg:!translate-x-0 lg:bg-transparent',
          isSidebarOpen && 'translate-x-0'
        )}
        style={{ zIndex: zIndexes.mobileSidebar }}
      >
        <BaseScrollArea className="h-full">
          <div className="relative h-full">
            <button
              className="absolute right-4 top-4 z-[1] grid size-8 cursor-pointer lg:hidden"
              type="button"
              onClick={() => setIsSidebarOpen(false)}
            >
              <BaseIcon
                className="m-auto size-6 text-primary"
                icon={Cancel01Icon}
                strokeWidth={2.5}
              />
            </button>

            {/* Sidebar goes here*/}
            {children}
          </div>
        </BaseScrollArea>
      </div>
    </>
  )
}
