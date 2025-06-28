import { Metadata } from 'next'
import DataTableMarketplaces from '@/components/app/DataTable/tables/DataTableMarketplaces'
import PageHeader from '@/components/app/PageHeader'
import BaseScrollArea from '@/components/ui/BaseScrollArea'
import { FREEMIUM_LIMIT } from '@/enums/constants'
import { getSessionState } from '@/lib/cached-functions'
import { getDB, tables } from '@/lib/drizzle'

export const metadata: Metadata = {
  title: 'Marketplaces | Listing Cat',
}

export default async function MarketplacesPage() {
  const { hasDatabaseAccess } = await getSessionState()

  let data

  if (hasDatabaseAccess) {
    data = await getDB().select().from(tables.marketplaces)
  } else {
    data = await getDB().select().from(tables.marketplaces).limit(FREEMIUM_LIMIT)
  }

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
