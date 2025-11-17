'use client'

import { Menu01Icon } from '@hugeicons/core-free-icons'
import { BaseIcon } from '@/components/ui/icon'
import { useSidebar } from '@/contexts/sidebar'
import { cn } from '@/utils/css'

export function AppHeaderMenuButton({ className }: { className?: string }) {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar()

  return (
    <button
      className={cn('p-1 translate-x-1 cursor-pointer', className)}
      type="button"
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
    >
      <BaseIcon className="size-5" icon={Menu01Icon} />
    </button>
  )
}
