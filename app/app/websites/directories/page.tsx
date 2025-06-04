import PageHeader from '@/components/app/PageHeader'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Directories | Listing Cat',
}

export default function DirectoriesPage() {
  return (
    <>
      <PageHeader title="Directories" />
      <p className="p-4">This section is coming really soon :)</p>
    </>
  )
}
