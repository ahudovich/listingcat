import { AppHeader } from '@/components/app/layout/AppHeader/AppHeader'
import { AppSidebar } from '@/components/app/layout/AppSidebar'
import { BaseToast } from '@/components/ui/BaseToast'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="grid grid-rows-[auto_1fr] h-dvh">
        <AppHeader />
        <main className="overflow-hidden lg:grid lg:grid-cols-[auto_1fr] lg:h-full">
          <AppSidebar />

          <div className="overflow-hidden bg-white lg:grid lg:grid-rows-[auto_1fr] lg:h-full">
            {children}
          </div>
        </main>
      </div>

      <BaseToast />
    </>
  )
}
