import { Metadata } from 'next'
import { eq } from 'drizzle-orm'
import DataTableDirectories from '@/components/app/DataTable/tables/DataTableDirectories'
import PageHeader from '@/components/app/PageHeader'
import { ProductCategories } from '@/enums/ProductCategories.enum'
import { getDB, tables } from '@/lib/drizzle'

export const metadata: Metadata = {
  title: 'Boilerplates | Directories | Listing Cat',
}

export default async function BoilerplatesDirectoriesPage() {
  const data = await getDB()
    .select()
    .from(tables.directories)
    .where(eq(tables.directories.category, ProductCategories.Boilerplates))

  return (
    <>
      <PageHeader
        title="Directories for boilerplates"
        description="Here you can find directories that accept only boilerplates or starter kits."
      />

      <DataTableDirectories data={data} />
    </>
  )
}
