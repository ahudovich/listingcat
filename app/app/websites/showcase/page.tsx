import { Metadata } from 'next'
import DataTableMarketplaces from '@/components/app/DataTable/tables/DataTableMarketplaces'
import PageHeader from '@/components/app/PageHeader'
import { getDB, tables } from '@/lib/drizzle'

export const metadata: Metadata = {
  title: 'Showcase',
}

export default async function ShowcasePage() {
  const data = await getDB().select().from(tables.showcases)

  return (
    <>
      <PageHeader
        title="Showcase"
        description="Websites where you can showcase your product in some way."
      />

      <DataTableMarketplaces data={data} />
    </>
  )
}
