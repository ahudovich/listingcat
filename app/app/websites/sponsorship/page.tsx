import PageHeader from '@/components/app/PageHeader'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sponsorship | Listing Cat',
}

export default function SponsorshipPage() {
  return (
    <>
      <PageHeader title="Sponsorship" />
      <p className="p-4">This section is coming really soon :)</p>
    </>
  )
}
