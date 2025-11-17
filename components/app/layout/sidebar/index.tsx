import { cookies } from 'next/headers'
import { AppSidebarContent } from '@/components/app/layout/sidebar/content'
import { COOKIE_SIDEBAR_COLLAPSED } from '@/enums/constants'

export async function AppSidebar() {
  const cookieStore = await cookies()
  const sidebarCollapsedCookie = cookieStore.get(COOKIE_SIDEBAR_COLLAPSED)
  const initialCollapsed = sidebarCollapsedCookie?.value === 'true'

  return <AppSidebarContent initialCollapsed={initialCollapsed} />
}
