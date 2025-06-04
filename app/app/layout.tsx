import Sidebar from '@/components/app/Sidebar/Sidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="overflow-hidden grid grid-cols-[auto_1fr] grid-rows-1 h-dvh bg-zinc-50">
      <Sidebar />
      <div className="pr-3 py-3">
        <div className="grid grid-rows-[auto_1fr] h-full bg-white border border-zinc-200 rounded-xl">
          {children}
        </div>
      </div>
    </main>
  )
}
