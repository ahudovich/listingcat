import { Metadata } from 'next'
import DataTableLaunchPlatforms from '@/components/app/DataTable/tables/DataTableLaunchPlatforms'
import { PageHeader } from '@/components/app/PageHeader'
import { getDB, tables } from '@/lib/drizzle'

export const metadata: Metadata = {
  title: 'Launch Platforms',
}

export default async function LaunchPlatformsPage() {
  const data = await getDB().select().from(tables.launchPlatforms)

  return (
    <>
      <PageHeader
        title="Launch Platforms"
        description="Discover platforms where you can launch your products."
      />

      <DataTableLaunchPlatforms data={data} />
    </>
  )
}
