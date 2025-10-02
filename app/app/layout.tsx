import { AppHeader } from '@/components/app/layout/AppHeader/AppHeader'
import { Sidebar } from '@/components/app/Sidebar/Sidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-rows-[auto_1fr] h-dvh">
      <AppHeader />
      <main className="overflow-hidden lg:grid lg:grid-cols-[auto_1fr] lg:h-full">
        <Sidebar />

        <div className="overflow-hidden bg-white lg:grid lg:grid-rows-[auto_1fr] lg:h-full">
          {children}
        </div>
      </main>
    </div>
  )
}
