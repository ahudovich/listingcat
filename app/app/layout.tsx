import { AppHeader } from '@/components/app/layout/AppHeader/AppHeader'
import { AppSidebar } from '@/components/app/layout/AppSidebar/AppSidebar'
import { BaseToast } from '@/components/ui/BaseToast'
import { SidebarProvider } from '@/contexts/sidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <div className="lg:grid lg:grid-rows-[auto_1fr] lg:h-dvh">
          <AppHeader />
          <main className="lg:overflow-hidden lg:grid lg:grid-cols-[auto_1fr] lg:h-full">
            <AppSidebar />

            <div className="bg-white lg:overflow-hidden lg:grid lg:grid-rows-[auto_1fr] lg:h-full">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>

      <BaseToast />
    </>
  )
}
