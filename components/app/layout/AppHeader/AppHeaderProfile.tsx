'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from '@base-ui-components/react/menu'
import { Home09Icon, Logout03Icon, Mail01Icon, SentIcon } from '@hugeicons/core-free-icons'
import posthog from 'posthog-js'
import { SubmitResourceModal } from '@/components/modals/SubmitResourceModal'
import { BaseAvatar } from '@/components/ui/BaseAvatar'
import { BaseIcon } from '@/components/ui/BaseIcon'
import { EMAILS } from '@/data/emails'
import { authClient } from '@/lib/auth/auth-client'
import { cn } from '@/utils/css'

export function AppHeaderProfile({ className }: { className?: string }) {
  const { data: session } = authClient.useSession()

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)

  const name = session?.user.name
  const email = session?.user.email
  const image = session?.user.image || undefined

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
      <Menu.Root>
        <Menu.Trigger
          className={cn('overflow-hidden rounded-full cursor-pointer select-none', className)}
        >
          <BaseAvatar src={image} name={name || email || ''} />
        </Menu.Trigger>

        <Menu.Portal>
          <Menu.Positioner className="outline-none z-popup" align="end" sideOffset={4}>
            <Menu.Popup className="overflow-hidden w-64 bg-white border border-layout-separator rounded-lg shadow-lg transition-opacity data-[starting-style]:opacity-0">
              <div className="px-4 py-2 text-xs">
                {name && <p className="font-medium truncate">{name}</p>}
                {email && (
                  <p className={cn('text-muted truncate', !name && 'font-medium text-secondary')}>
                    {email}
                  </p>
                )}
              </div>

              <Menu.Separator className="h-px bg-layout-separator" />

              <Menu.Group className="p-1">
                <Menu.Item
                  className="group flex items-center gap-x-3 px-3 py-2 w-full rounded-lg outline-none transition-colors cursor-pointer select-none hover:bg-zinc-100 focus:bg-zinc-100"
                  render={
                    <Link href="/home">
                      <BaseIcon
                        className="shrink-0 size-4.5 text-tertiary transition-colors group-hover:text-secondary group-focus:text-secondary"
                        icon={Home09Icon}
                      />
                      <span className="font-medium text-xs text-secondary">Home page</span>
                    </Link>
                  }
                />
              </Menu.Group>

              <Menu.Separator className="h-px bg-layout-separator" />

              <Menu.Group className="p-1">
                <Menu.Item
                  className="group flex items-center gap-x-3 px-3 py-2 w-full rounded-lg outline-none transition-colors cursor-pointer select-none hover:bg-zinc-100 focus:bg-zinc-100"
                  onClick={() => setIsSubmitModalOpen(true)}
                >
                  <BaseIcon
                    className="shrink-0 size-4.5 text-tertiary transition-colors group-hover:text-secondary group-focus:text-secondary"
                    icon={SentIcon}
                  />
                  <span className="font-medium text-xs text-secondary">Submit resource</span>
                </Menu.Item>

                <Menu.Item
                  className="group flex items-center gap-x-3 px-3 py-2 w-full rounded-lg outline-none transition-colors cursor-pointer select-none hover:bg-zinc-100 focus:bg-zinc-100"
                  render={
                    <a href={`mailto:${EMAILS.SUPPORT}`}>
                      <BaseIcon
                        className="shrink-0 size-4.5 text-tertiary transition-colors group-hover:text-secondary group-focus:text-secondary"
                        icon={Mail01Icon}
                      />
                      <span className="font-medium text-xs text-secondary">Support</span>
                    </a>
                  }
                />
              </Menu.Group>

              <Menu.Separator className="h-px bg-zinc-200" />

              <Menu.Group className="p-1">
                <Menu.Item
                  className="group flex items-center gap-x-3 px-3 py-2 w-full rounded-lg outline-none transition-colors cursor-pointer select-none hover:bg-zinc-100 focus:bg-zinc-100"
                  onClick={handleSignOut}
                >
                  <BaseIcon
                    className="shrink-0 size-4.5 text-tertiary transition-colors group-hover:text-secondary group-focus:text-secondary"
                    icon={Logout03Icon}
                  />
                  <span className="font-medium text-xs text-secondary">Sign out</span>
                </Menu.Item>
              </Menu.Group>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <SubmitResourceModal isOpen={isSubmitModalOpen} setIsOpen={setIsSubmitModalOpen} />
    </>
  )
}
