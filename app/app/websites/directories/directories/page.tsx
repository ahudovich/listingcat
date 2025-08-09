import { Metadata } from 'next'
import { eq } from 'drizzle-orm'
import DataTableDirectories from '@/components/app/DataTable/tables/DataTableDirectories'
import PageHeader from '@/components/app/PageHeader'
import { ProductCategories } from '@/enums/ProductCategories.enum'
import { getDB, tables } from '@/lib/drizzle'

export const metadata: Metadata = {
  title: 'Directories of directories',
}

export default async function DirectoriesOfDirectoriesPage() {
  const data = await getDB()
    .select()
    .from(tables.directories)
    .where(eq(tables.directories.category, ProductCategories.Directories))

  return (
    <>
      <PageHeader
        title="Directories of directories"
        description="Here you can find directories that accept only other directories."
      />

      <DataTableDirectories data={data} />
    </>
  )
}
