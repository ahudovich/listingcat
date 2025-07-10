import { Metadata } from 'next'
import { eq } from 'drizzle-orm'
import DataTableDirectories from '@/components/app/DataTable/tables/DataTableDirectories'
import PageHeader from '@/components/app/PageHeader'
import BaseScrollArea from '@/components/ui/BaseScrollArea'
import { ProductCategories } from '@/enums/ProductCategories.enum'
import { getDB, tables } from '@/lib/drizzle'

export const metadata: Metadata = {
  title: 'Developer Tools | Directories | Listing Cat',
}

export default async function DevToolsDirectoriesPage() {
  const data = await getDB()
    .select()
    .from(tables.directories)
    .where(eq(tables.directories.category, ProductCategories.DevTools))

  return (
    <>
      <PageHeader
        title="Directories for developer tools"
        description="Here you can find directories that accept only developer tools."
      />

      <BaseScrollArea className="h-full rounded-b-xl">
        <DataTableDirectories data={data} />
      </BaseScrollArea>
    </>
  )
}
