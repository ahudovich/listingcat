import { Metadata } from 'next'
import DataTableMarketplaces from '@/components/app/DataTable/tables/DataTableMarketplaces'
import PageHeader from '@/components/app/PageHeader'
import BaseScrollArea from '@/components/ui/BaseScrollArea'
import { getDB, tables } from '@/lib/drizzle'

export const metadata: Metadata = {
  title: 'Showcase | Listing Cat',
}

export default async function ShowcasePage() {
  const data = await getDB().select().from(tables.showcases).limit(10)

  return (
    <>
      <PageHeader
        title="Showcase"
        description="Websites where you can showcase your product in some way."
      />

      <BaseScrollArea className="h-full rounded-b-xl">
        <DataTableMarketplaces data={data} />
      </BaseScrollArea>
    </>
  )
}
