import { Metadata } from 'next'
import { DataTableDirectories } from '@/components/app/DataTable/tables/DataTableDirectories'
import { PageHeader } from '@/components/app/PageHeader'
import { getDB, tables } from '@/lib/drizzle'

export const metadata: Metadata = {
  title: 'Directories',
}

export default async function DirectoriesPage() {
  const data = await getDB().select().from(tables.directories)

  return (
    <>
      <PageHeader title="Directories" />
      <DataTableDirectories data={data} />
    </>
  )
}
