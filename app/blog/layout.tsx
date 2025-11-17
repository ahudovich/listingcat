import { BlogCTA } from '@/components/blog/cta'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="pt-7 pb-16 sm:pt-12 md:pb-20">
        {children}
        <BlogCTA />
      </main>
      <Footer />
    </>
  )
}
