import { Metadata } from 'next'
import DataTableMarketplaces from '@/components/app/DataTable/tables/DataTableMarketplaces'
import PageHeader from '@/components/app/PageHeader'
import BaseScrollArea from '@/components/ui/BaseScrollArea'
import { getDB, tables } from '@/lib/drizzle'

export const metadata: Metadata = {
  title: 'Marketplaces | Listing Cat',
}

export default async function MarketplacesPage() {
  const data = await getDB().select().from(tables.marketplaces).limit(10)

  return (
    <>
      <PageHeader
        title="Marketplaces"
        description="Websites where you can sell products, provide services, share deals, etc."
      />

      <BaseScrollArea className="h-full rounded-b-xl">
        <DataTableMarketplaces data={data} />
      </BaseScrollArea>
    </>
  )
}
