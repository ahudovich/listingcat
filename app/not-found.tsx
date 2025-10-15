import Link from 'next/link'
import { Footer } from '@/components/layout/Footer/Footer'
import { Header } from '@/components/layout/Header'
import { BaseButton } from '@/components/ui/BaseButton'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="container-article py-12 md:pb-20">
        <h1 className="mb-2 text-primary text-2xl font-bold sm:text-3xl">Page Not Found</h1>
        <p className="mb-6">The page you are looking for does not exist.</p>
        <BaseButton render={<Link href="/" />}>Return to home</BaseButton>
      </main>
      <Footer />
    </>
  )
}
