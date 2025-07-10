import { Metadata } from 'next'
import { eq } from 'drizzle-orm'
import DataTableDirectories from '@/components/app/DataTable/tables/DataTableDirectories'
import PageHeader from '@/components/app/PageHeader'
import BaseScrollArea from '@/components/ui/BaseScrollArea'
import { ProductCategories } from '@/enums/ProductCategories.enum'
import { getDB, tables } from '@/lib/drizzle'

export const metadata: Metadata = {
  title: 'AI Tools | Directories | Listing Cat',
}

export default async function AiToolsDirectoriesPage() {
  const data = await getDB()
    .select()
    .from(tables.directories)
    .where(eq(tables.directories.category, ProductCategories.AITools))

  return (
    <>
      <PageHeader
        title="Directories for AI tools"
        description="Here you can find directories that accept only AI tools."
      />

      <BaseScrollArea className="h-full rounded-b-xl">
        <DataTableDirectories data={data} />
      </BaseScrollArea>
    </>
  )
}
