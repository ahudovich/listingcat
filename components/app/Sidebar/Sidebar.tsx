import {
  CanvasIcon,
  DashboardSquare01Icon,
  FolderLibraryIcon,
  OpenSourceIcon,
  Pot01Icon,
  Robot01Icon,
  Rocket01Icon,
  Settings02Icon,
  Store03Icon,
  TestTube01Icon,
} from '@hugeicons/core-free-icons'
import { SidebarLink } from '@/components/app/Sidebar/SidebarLink'
import { SidebarNavSection } from '@/components/app/Sidebar/SidebarNavSection'

const navLinks = [
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
]

export default async function Sidebar() {
  return (
    <aside className="w-72 h-full">
      <div className="flex flex-col px-5 py-6 h-full">
        <nav className="grid gap-1 mb-6">
          {navLinks.map((link, index) => (
            <ul key={index} className="grid gap-1">
              <li key={index}>
                {'children' in link ? (
                  <SidebarNavSection link={link} />
                ) : (
                  <SidebarLink label={link.label} path={link.path} icon={link.icon} />
                )}
              </li>
            </ul>
          ))}
        </nav>
      </div>
    </aside>
  )
}
