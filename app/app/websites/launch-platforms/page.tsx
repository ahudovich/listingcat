import { Metadata } from 'next'
import DataTableLaunchPlatforms from '@/components/app/DataTable/tables/DataTableLaunchPlatforms'
import PageHeader from '@/components/app/PageHeader'
import BaseScrollArea from '@/components/ui/BaseScrollArea'
import { FREEMIUM_LIMIT } from '@/enums/constants'
import { getSessionState } from '@/lib/cached-functions'
import { getDB, tables } from '@/lib/drizzle'

export const metadata: Metadata = {
  title: 'Launch Platforms | Listing Cat',
}

export default async function LaunchPlatformsPage() {
  const { hasDatabaseAccess } = await getSessionState()

  let data

  if (hasDatabaseAccess) {
    data = await getDB().select().from(tables.launchPlatforms)
  } else {
    data = await getDB().select().from(tables.launchPlatforms).limit(FREEMIUM_LIMIT)
  }

  return (
    <>
      <PageHeader
        title="Launch Platforms"
        description="Discover platforms where you can launch your products."
      />

      <BaseScrollArea className="h-full rounded-b-xl">
        <DataTableLaunchPlatforms data={data} />
      </BaseScrollArea>
    </>
  )
}
