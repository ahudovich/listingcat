'use client'

import { useRouter } from 'next/navigation'
import { Logout03Icon, Mail01Icon } from '@hugeicons/core-free-icons'
import { DropdownMenu } from 'radix-ui'
import BaseIcon from '@/components/ui/BaseIcon'
import { EMAILS } from '@/data/emails'
import { authClient } from '@/lib/auth/auth-client'

export default function SidebarProfileDropdown({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        async onSuccess() {
          router.replace('/') // TODO: Add full page reload like in Nuxt?
        },
      },
    })
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Content
        className="overflow-hidden w-[15.5rem] bg-white border border-zinc-200 rounded-lg shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=top]:slide-in-from-bottom-2"
        loop={true}
        side="top"
        sideOffset={8}
        onCloseAutoFocus={(event) => event.preventDefault()}
      >
        <DropdownMenu.Group className="p-1">
          <DropdownMenu.Item
            className="group flex items-center gap-x-3 px-3 py-2 w-full rounded-lg outline-none transition-colors cursor-pointer hover:bg-zinc-100 focus:bg-zinc-100"
            asChild
          >
            <a href={`mailto:${EMAILS.SUPPORT}`}>
              <BaseIcon
                className="shrink-0 size-4.5 text-tertiary transition-colors group-hover:text-secondary group-focus:text-secondary"
                icon={Mail01Icon}
              />
              <span className="font-medium text-xs text-secondary">Support</span>
            </a>
          </DropdownMenu.Item>
        </DropdownMenu.Group>

        <DropdownMenu.Separator className="h-px bg-zinc-200" />

        <DropdownMenu.Group className="p-1">
          <DropdownMenu.Item
            className="group flex items-center gap-x-3 px-3 py-2 w-full rounded-lg outline-none transition-colors cursor-pointer hover:bg-zinc-100 focus:bg-zinc-100"
            onClick={handleSignOut}
          >
            <BaseIcon
              className="shrink-0 size-4.5 text-tertiary transition-colors group-hover:text-secondary group-focus:text-secondary"
              icon={Logout03Icon}
            />
            <span className="font-medium text-xs text-secondary">Sign out</span>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
