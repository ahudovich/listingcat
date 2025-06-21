import { headers } from 'next/headers'
import Link from 'next/link'
import {
  CanvasIcon,
  FolderLibraryIcon,
  Rocket01Icon,
  Store03Icon,
  Wallet03Icon,
} from '@hugeicons/core-free-icons'
import SidebarNavSection from '@/components/app/Sidebar/SidebarNavSection'
import SidebarProfile from '@/components/app/Sidebar/SidebarProfile/SidebarProfile'
import SidebarUpgrade from '@/components/app/Sidebar/SidebarUpgrade'
import BaseBadge from '@/components/ui/BaseBadge'
import BaseLogo from '@/components/ui/BaseLogo'
import { Benefits } from '@/enums/Benefits.enum'
import { auth } from '@/lib/auth'

const navLinks = [
  {
    label: 'Websites',
    links: [
      {
        label: 'Launch Platforms',
        path: '/app/websites/launch-platforms',
        icon: Rocket01Icon,
      },
      {
        label: 'Directories',
        path: '/app/websites/directories',
        icon: FolderLibraryIcon,
      },
      {
        label: 'Marketplaces',
        path: '/app/websites/marketplaces',
        icon: Store03Icon,
      },
      {
        label: 'Showcase',
        path: '/app/websites/showcase',
        icon: CanvasIcon,
      },
      {
        label: 'Sponsorship',
        path: '/app/websites/sponsorship',
        icon: Wallet03Icon,
      },
    ],
  },
]

export default async function Sidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <aside className="flex flex-col w-72 px-5 py-6">
      <div className="flex items-center gap-3 mb-8">
        <Link className="self-start" href="/">
          <BaseLogo className="w-32.5 h-5" />
        </Link>

        {!session?.user.benefits?.includes(Benefits.DatabaseAccess) ? (
          <BaseBadge>Free</BaseBadge>
        ) : (
          <BaseBadge className="uppercase" variant="accent">
            Pro
          </BaseBadge>
        )}
      </div>

      <nav>
        {navLinks.map((link, index) => (
          <SidebarNavSection key={index} label={link.label} links={link.links} />
        ))}
      </nav>

      <div className="mt-auto">
        {!session?.user.benefits?.includes(Benefits.DatabaseAccess) && (
          <SidebarUpgrade className="mb-4" />
        )}

        <SidebarProfile />
      </div>
    </aside>
  )
}
