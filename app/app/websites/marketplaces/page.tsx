import PageHeader from '@/components/app/PageHeader'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Marketplaces | Listing Cat',
}

export default function MarketplacesPage() {
  return (
    <>
      <PageHeader title="Marketplaces" />
      <p className="p-4">This section is coming really soon :)</p>
    </>
  )
}
