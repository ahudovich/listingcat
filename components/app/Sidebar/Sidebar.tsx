import Link from 'next/link'
import {
  CanvasIcon,
  FolderLibraryIcon,
  MarketingIcon,
  Rocket01Icon,
  Store03Icon,
  TestTube01Icon,
} from '@hugeicons/core-free-icons'
import SidebarNavSection from '@/components/app/Sidebar/SidebarNavSection'
import SidebarProfile from '@/components/app/Sidebar/SidebarProfile/SidebarProfile'
import BaseLogo from '@/components/ui/BaseLogo'

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
        label: 'Specials',
        path: '/app/websites/specials',
        icon: TestTube01Icon,
      },
    ],
  },
  {
    label: 'Services',
    links: [
      {
        label: 'Social marketing',
        path: '/app/services/social-marketing',
        icon: MarketingIcon,
      },
    ],
  },
]

export default async function Sidebar() {
  return (
    <aside className="flex flex-col w-72 px-5 py-6">
      <div className="flex items-center gap-3 mb-8">
        <Link className="self-start" href="/">
          <BaseLogo className="w-32.5 h-5" />
        </Link>
      </div>

      <nav className="grid gap-6">
        {navLinks.map((link, index) => (
          <SidebarNavSection key={index} label={link.label} links={link.links} />
        ))}
      </nav>

      <div className="mt-auto">
        <SidebarProfile />
      </div>
    </aside>
  )
}
