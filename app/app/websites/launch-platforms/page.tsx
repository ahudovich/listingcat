import { Metadata } from 'next'
import DataTableLaunchPlatforms from '@/components/app/DataTable/tables/DataTableLaunchPlatforms'
import PageHeader from '@/components/app/PageHeader'
import BaseScrollArea from '@/components/ui/BaseScrollArea'
import { BASE_URL } from '@/enums/constants'

export const metadata: Metadata = {
  title: 'Launch Platforms | Listing Cat',
}

export default async function LaunchPlatformsPage() {
  const response = await fetch(`${BASE_URL}/api/websites/launch-platforms`)

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`)
  }

  const data = await response.json()

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
