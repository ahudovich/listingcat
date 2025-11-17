import Link from 'next/link'
import { AppHeaderMenuButton } from '@/components/app/layout/header/menu-button'
import { AppHeaderNav } from '@/components/app/layout/header/nav'
import { AppHeaderProfile } from '@/components/app/layout/header/profile'
import { BaseLogo } from '@/components/ui/logo'
import { APP_REDIRECT_URL } from '@/enums/constants'
import { getProjects, verifySession } from '@/lib/cached-functions'

export async function AppHeader() {
  const { session } = await verifySession()
  const projects = await getProjects(session.user.id)

  return (
    <header className="px-4 bg-white border-b border-b-layout-separator">
      <div className="flex items-center h-app-header">
        <Link className="shrink-0 mr-2" href={APP_REDIRECT_URL}>
          <BaseLogo className="size-5" isIconOnly={true} />
        </Link>
        <AppHeaderNav projects={projects} />
        <AppHeaderProfile className="ml-auto" />
        <AppHeaderMenuButton className="ml-1.5 lg:hidden" />
      </div>
    </header>
  )
}
