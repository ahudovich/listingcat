import { Metadata } from 'next'
import DataTableMarketplaces from '@/components/app/DataTable/tables/DataTableMarketplaces'
import PageHeader from '@/components/app/PageHeader'
import BaseScrollArea from '@/components/ui/BaseScrollArea'
import { FREEMIUM_LIMIT } from '@/enums/constants'
import { getSessionState } from '@/lib/cached-functions'
import { getDB, tables } from '@/lib/drizzle'

export const metadata: Metadata = {
  title: 'Showcase | Listing Cat',
}

export default async function ShowcasePage() {
  const { hasDatabaseAccess } = await getSessionState()

  let data

  if (hasDatabaseAccess) {
    data = await getDB().select().from(tables.showcases)
  } else {
    data = await getDB().select().from(tables.showcases).limit(FREEMIUM_LIMIT)
  }

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
