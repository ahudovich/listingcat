import { Metadata } from 'next'
import DataTableSpecials from '@/components/app/DataTable/tables/DataTableSpecials'
import PageHeader from '@/components/app/PageHeader'
import { getDB, tables } from '@/lib/drizzle'

export const metadata: Metadata = {
  title: 'Specials',
}

export default async function SpecialsPage() {
  const data = await getDB().select().from(tables.specials)

  return (
    <>
      <PageHeader
        title="Specials"
        description="Websites that are not suitable for the other categories but worth attention."
      />

      <DataTableSpecials data={data} />
    </>
  )
}
