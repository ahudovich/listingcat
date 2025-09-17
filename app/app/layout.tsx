import { SidebarWrapper } from '@/components/app/layout/SidebarWrapper'
import Sidebar from '@/components/app/Sidebar/Sidebar'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="lg:overflow-hidden lg:grid lg:grid-cols-[auto_1fr] lg:grid-rows-1 lg:h-dvh lg:bg-zinc-50">
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>

      <div className="pb-4 lg:pr-3 lg:py-3">
        <div className="bg-white lg:grid lg:grid-rows-[auto_1fr] lg:h-full lg:border lg:border-zinc-200 lg:rounded-xl">
          {children}
        </div>
      </div>
    </main>
  )
}
