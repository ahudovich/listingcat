'use client'

import { useState } from 'react'
import { ArrowDown01Icon } from '@hugeicons/core-free-icons'
import { Collapsible } from 'radix-ui'
import SidebarLink from '@/components/app/Sidebar/SidebarLink'
import { SidebarNavSubSection } from '@/components/app/Sidebar/SidebarNavSubSection'
import BaseIcon from '@/components/ui/BaseIcon'
import type { SidebarNavItem, SidebarNavSection } from '@/types/sidebar'

interface SidebarNavSectionProps {
  label?: string
  links: Array<SidebarNavItem | SidebarNavSection>
}

export default function SidebarNavSection({ label, links }: SidebarNavSectionProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Collapsible.Root open={isOpen} onOpenChange={setIsOpen}>
      {label && (
        <Collapsible.Trigger asChild>
          <button
            className="group flex items-center gap-1.5 mb-2 py-1 w-full cursor-pointer"
            type="button"
          >
            <BaseIcon
              className="shrink-0 size-3 text-muted transition-transform group-data-[state=closed]:-rotate-90"
              icon={ArrowDown01Icon}
              strokeWidth={3}
            />
            <span className="font-semibold text-[0.625rem] text-muted tracking-wider uppercase">
              {label}
            </span>
          </button>
        </Collapsible.Trigger>
      )}

      <Collapsible.Content asChild>
        <ul className="grid gap-1">
          {links.map((link, index) => (
            <li key={index}>
              {'children' in link ? (
                <SidebarNavSubSection link={link} />
              ) : (
                <SidebarLink label={link.label} path={link.path} icon={link.icon} />
              )}
            </li>
          ))}
        </ul>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
