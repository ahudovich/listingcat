import { Metadata } from 'next'
import DataTableDirectories from '@/components/app/DataTable/tables/DataTableDirectories'
import PageHeader from '@/components/app/PageHeader'
import BaseScrollArea from '@/components/ui/BaseScrollArea'
import { FREEMIUM_LIMIT } from '@/enums/constants'
import { getSessionState } from '@/lib/cached-functions'
import { getDB, tables } from '@/lib/drizzle'

export const metadata: Metadata = {
  title: 'Directories | Listing Cat',
}

export default async function DirectoriesPage() {
  const { hasProAccess } = await getSessionState()

  let data

  if (hasProAccess) {
    data = await getDB().select().from(tables.directories)
  } else {
    data = await getDB().select().from(tables.directories).limit(FREEMIUM_LIMIT)
  }

  return (
    <>
      <PageHeader
        title="Directories"
        description="List your products or services on various websites."
      />

      <BaseScrollArea className="h-full rounded-b-xl">
        <DataTableDirectories data={data} />
      </BaseScrollArea>
    </>
  )
}
