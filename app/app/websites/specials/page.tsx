import { Metadata } from 'next'
import { DataTableUpgradeOverlay } from '@/components/app/DataTable/DataTableUpgradeOverlay'
import DataTableSpecials from '@/components/app/DataTable/tables/DataTableSpecials'
import PageHeader from '@/components/app/PageHeader'
import BaseScrollArea from '@/components/ui/BaseScrollArea'
import { FREEMIUM_LIMIT } from '@/enums/constants'
import { getSessionState } from '@/lib/cached-functions'
import { TABLE_NAMES } from '@/lib/db/schema/helpers/enums'
import { getDB, tables } from '@/lib/drizzle'

export const metadata: Metadata = {
  title: 'Specials | Listing Cat',
}

export default async function SpecialsPage() {
  const { hasProAccess } = await getSessionState()

  let data

  if (hasProAccess) {
    data = await getDB().select().from(tables.specials)
  } else {
    data = await getDB().select().from(tables.specials).limit(FREEMIUM_LIMIT)
  }

  return (
    <>
      <PageHeader
        title="Specials"
        description="Websites that are not suitable for the other categories but worth attention."
      />

      <BaseScrollArea className="h-full rounded-b-xl">
        <DataTableSpecials data={data} />
        {!hasProAccess && <DataTableUpgradeOverlay tableName={TABLE_NAMES.SPECIALS} />}
      </BaseScrollArea>
    </>
  )
}
