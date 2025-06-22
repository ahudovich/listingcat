import Link from 'next/link'
import {
  CanvasIcon,
  FolderLibraryIcon,
  Rocket01Icon,
  Store03Icon,
  TestTube01Icon,
  // Wallet03Icon,
} from '@hugeicons/core-free-icons'
import SidebarNavSection from '@/components/app/Sidebar/SidebarNavSection'
import BaseLogo from '@/components/ui/BaseLogo'
import SidebarProfile from './SidebarProfile/SidebarProfile'

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
      // {
      //   label: 'Sponsorship',
      //   path: '/app/websites/sponsorship',
      //   icon: Wallet03Icon,
      // },
      {
        label: 'Specials',
        path: '/app/websites/specials',
        icon: TestTube01Icon,
      },
    ],
  },
]

export default function Sidebar() {
  return (
    <aside className="flex flex-col w-72 px-5 py-6">
      <div className="flex items-center gap-3 mb-8">
        <Link className="self-start" href="/">
          <BaseLogo className="w-32.5 h-5" />
        </Link>
        <span className="font-bold text-[10px] text-zinc-400 uppercase">Early Access</span>
      </div>

      <nav>
        {navLinks.map((link, index) => (
          <SidebarNavSection key={index} label={link.label} links={link.links} />
        ))}
      </nav>

      <SidebarProfile className="mt-auto" />
    </aside>
  )
}
