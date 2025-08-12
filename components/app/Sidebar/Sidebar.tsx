import Link from 'next/link'
import {
  CanvasIcon,
  DashboardSquare01Icon,
  FolderLibraryIcon,
  MarketingIcon,
  OpenSourceIcon,
  Pot01Icon,
  Robot01Icon,
  Rocket01Icon,
  Settings02Icon,
  Store03Icon,
  TestTube01Icon,
} from '@hugeicons/core-free-icons'
import SidebarNavSection from '@/components/app/Sidebar/SidebarNavSection'
import SidebarProfile from '@/components/app/Sidebar/SidebarProfile/SidebarProfile'
import SidebarService from '@/components/app/Sidebar/SidebarService'
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
        children: [
          {
            label: 'Anything',
            path: '/app/websites/directories/anything',
            icon: FolderLibraryIcon,
          },
          {
            label: 'AI Tools',
            path: '/app/websites/directories/ai-tools',
            icon: Robot01Icon,
          },
          {
            label: 'Developer Tools',
            path: '/app/websites/directories/dev-tools',
            icon: Settings02Icon,
          },
          {
            label: 'Open Source',
            path: '/app/websites/directories/open-source',
            icon: OpenSourceIcon,
          },
          {
            label: 'Directories',
            path: '/app/websites/directories/directories',
            icon: DashboardSquare01Icon,
          },
          {
            label: 'Boilerplates',
            path: '/app/websites/directories/boilerplates',
            icon: Pot01Icon,
          },
        ],
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
    <aside className="w-72 h-full">
      <div className="flex flex-col px-5 py-6 h-full">
        <div className="flex items-center gap-3 mb-8">
          <Link className="self-start" href="/">
            <BaseLogo className="w-32.5 h-5" />
          </Link>
        </div>

        <nav className="grid gap-3 mb-6">
          {navLinks.map((link, index) => (
            <SidebarNavSection key={index} label={link.label} links={link.links} />
          ))}
        </nav>

        <div className="mt-auto">
          <SidebarService className="mb-4" />
          <SidebarProfile />
        </div>
      </div>
    </aside>
  )
}
