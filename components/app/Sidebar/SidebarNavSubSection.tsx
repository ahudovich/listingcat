'use client'

import { useState } from 'react'
import { ArrowUp01Icon, Folder01Icon, Folder02Icon } from '@hugeicons/core-free-icons'
import { Collapsible } from 'radix-ui'
import SidebarLink from '@/components/app/Sidebar/SidebarLink'
import { BaseIcon } from '@/components/ui/BaseIcon'
import type { SidebarNavSection } from '@/types/sidebar'

export function SidebarNavSubSection({ link }: { link: SidebarNavSection }) {
  const [isOpen, setIsOpen] = useState(true)

  const Icon = isOpen ? Folder02Icon : Folder01Icon

  return (
    <Collapsible.Root open={isOpen} onOpenChange={setIsOpen}>
      <Collapsible.Trigger asChild>
        <button className="group flex items-center gap-3 mb-1 px-3 py-2 w-full rounded-lg cursor-pointer transition-colors hover:bg-zinc-100 [&>svg]:text-tertiary">
          <BaseIcon className="shrink-0 size-4.5 transition-colors" icon={Icon} />
          <span className="font-medium text-xs text-secondary">{link.label}</span>
          <BaseIcon
            className="shrink-0 ml-auto size-4 transition-all group-data-[state=closed]:-rotate-180"
            icon={ArrowUp01Icon}
          />
        </button>
      </Collapsible.Trigger>

      <Collapsible.Content asChild>
        <ul className="grid gap-1 pl-3">
          {link.children?.map((link, index) => (
            <li key={index}>
              <SidebarLink label={link.label} path={link.path} icon={link.icon} />
            </li>
          ))}
        </ul>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
