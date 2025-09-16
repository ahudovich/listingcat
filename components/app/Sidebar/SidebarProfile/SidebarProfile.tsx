import { headers } from 'next/headers'
import { MoreHorizontalCircle01Icon, User03Icon } from '@hugeicons/core-free-icons'
import SidebarProfileDropdown from '@/components/app/Sidebar/SidebarProfile/SidebarProfileDropdown'
import BaseAvatar from '@/components/ui/BaseAvatar'
import { BaseIcon } from '@/components/ui/BaseIcon'
import { auth } from '@/lib/auth'

export async function SidebarProfile({ className }: { className?: string }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const nameOrEmail = session?.user?.name || session?.user?.email || 'John Doe'
  const image = session?.user?.image || ''

  return (
    <div className={className}>
      <SidebarProfileDropdown>
        <button
          className="flex items-center gap-3 px-3 py-2 w-full rounded-lg cursor-pointer transition-colors hover:bg-zinc-100 data-[state=open]:bg-zinc-200"
          type="button"
        >
          {image ? (
            <BaseAvatar className="shrink-0" src={image} name={nameOrEmail} size="sm" />
          ) : (
            <div className="shrink-0 grid place-content-center size-6 bg-zinc-200 rounded-full text-tertiary">
              <BaseIcon className="size-4" icon={User03Icon} />
            </div>
          )}
          <span className="font-medium text-xs truncate">{nameOrEmail}</span>
          <BaseIcon
            className="shrink-0 ml-auto size-5 text-tertiary"
            icon={MoreHorizontalCircle01Icon}
          />
        </button>
      </SidebarProfileDropdown>
    </div>
  )
}
