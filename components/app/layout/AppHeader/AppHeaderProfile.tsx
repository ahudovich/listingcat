'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Home09Icon, Logout03Icon, Mail01Icon, SentIcon } from '@hugeicons/core-free-icons'
import posthog from 'posthog-js'
import { DropdownMenu } from 'radix-ui'
import { SubmitResourceModal } from '@/components/modals/SubmitResourceModal'
import { BaseAvatar } from '@/components/ui/BaseAvatar'
import { BaseIcon } from '@/components/ui/BaseIcon'
import { EMAILS } from '@/data/emails'
import { authClient } from '@/lib/auth/auth-client'
import { cn } from '@/utils/css'

export function AppHeaderProfile({ className }: { className?: string }) {
  const { data: session } = authClient.useSession()

  const nameOrEmail = session?.user.name || session?.user.email || 'John Doe'
  const image = session?.user.image || ''

  return (
    <AppHeaderProfileDropdown>
      <button
        className={cn(
          'overflow-hidden size-7 rounded-full cursor-pointer transition-colors data-[state=open]:bg-zinc-200',
          className
        )}
        type="button"
      >
        <BaseAvatar src={image} name={nameOrEmail} />
      </button>
    </AppHeaderProfileDropdown>
  )
}

function AppHeaderProfileDropdown({ children }: { children: React.ReactNode }) {
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        async onSuccess() {
          // Unlink previously identified PostHog user
          posthog.reset()

          // Full page reload after sign out
          window.location.href = '/'
        },
      },
    })
  }

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
        <DropdownMenu.Content
          className="overflow-hidden w-62 bg-white border border-zinc-200 rounded-lg shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=top]:slide-in-from-bottom-2"
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
              <Link href="/home">
                <BaseIcon
                  className="shrink-0 size-4.5 text-tertiary transition-colors group-hover:text-secondary group-focus:text-secondary"
                  icon={Home09Icon}
                />
                <span className="font-medium text-xs text-secondary">Home page</span>
              </Link>
            </DropdownMenu.Item>
          </DropdownMenu.Group>

          <DropdownMenu.Separator className="h-px bg-zinc-200" />

          <DropdownMenu.Group className="p-1">
            <DropdownMenu.Item
              className="group flex items-center gap-x-3 px-3 py-2 w-full rounded-lg outline-none transition-colors cursor-pointer hover:bg-zinc-100 focus:bg-zinc-100"
              onClick={() => setIsSubmitModalOpen(true)}
            >
              <BaseIcon
                className="shrink-0 size-4.5 text-tertiary transition-colors group-hover:text-secondary group-focus:text-secondary"
                icon={SentIcon}
              />
              <span className="font-medium text-xs text-secondary">Submit resource</span>
            </DropdownMenu.Item>

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

      <SubmitResourceModal isOpen={isSubmitModalOpen} setIsOpen={setIsSubmitModalOpen} />
    </>
  )
}
