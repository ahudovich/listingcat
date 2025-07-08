import Footer from '@/components/layout/Footer/Footer'
import Header from '@/components/layout/Header'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="pb-12 md:pb-20">{children}</main>
      <Footer />
    </>
  )
}
