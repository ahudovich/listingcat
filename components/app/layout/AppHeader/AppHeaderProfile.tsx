import { User03Icon } from '@hugeicons/core-free-icons'
import SidebarProfileDropdown from '@/components/app/Sidebar/SidebarProfile/SidebarProfileDropdown'
import { BaseAvatar } from '@/components/ui/BaseAvatar'
import { BaseIcon } from '@/components/ui/BaseIcon'
import { verifySession } from '@/lib/cached-functions'

export async function AppHeaderProfile() {
  const { session } = await verifySession()

  const nameOrEmail = session.user.name || session.user.email || 'John Doe'
  const image = session.user.image || null

  return (
    <SidebarProfileDropdown>
      <button
        className="overflow-hidden size-7 rounded-full cursor-pointer transition-colors hover:bg-zinc-100 data-[state=open]:bg-zinc-200"
        type="button"
      >
        {image ? (
          <BaseAvatar src={image} name={nameOrEmail} size="sm" />
        ) : (
          <div className="grid place-content-center size-full bg-zinc-200 rounded-full text-tertiary">
            <BaseIcon className="size-4" icon={User03Icon} />
          </div>
        )}
      </button>
    </SidebarProfileDropdown>
  )
}
