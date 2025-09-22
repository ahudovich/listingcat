import { AppHeader } from '@/components/app/layout/AppHeader/AppHeader'
import { SidebarWrapper } from '@/components/app/layout/SidebarWrapper'
import { Sidebar } from '@/components/app/Sidebar/Sidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-rows-[auto_1fr] h-dvh">
      <AppHeader />
      <main className="overflow-hidden lg:grid lg:grid-cols-[auto_1fr] lg:h-full">
        <SidebarWrapper>
          <Sidebar />
        </SidebarWrapper>

        <div className="bg-white lg:grid lg:grid-rows-[auto_1fr] lg:h-full">{children}</div>
      </main>
    </div>
  )
}
