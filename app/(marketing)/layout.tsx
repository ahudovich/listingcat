import { Footer } from '@/components/layout/footer/footer'
import { Header } from '@/components/layout/header'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="overflow-hidden pb-12 md:pb-20">{children}</main>
      <Footer />
    </>
  )
}
