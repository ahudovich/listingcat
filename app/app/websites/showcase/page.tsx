import PageHeader from '@/components/app/PageHeader'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Showcase | Listing Cat',
}

export default function ShowcasePage() {
  return (
    <>
      <PageHeader title="Showcase" />
      <p className="p-4">This section is coming really soon :)</p>
    </>
  )
}
