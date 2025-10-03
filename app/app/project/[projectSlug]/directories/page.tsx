import { Metadata } from 'next'
import { DataTableDirectories } from '@/components/app/DataTable/tables/DataTableDirectories'
import { PageHeader } from '@/components/app/PageHeader'
import { getDirectoriesWithSubmissions, getProject, verifySession } from '@/lib/cached-functions'

export const metadata: Metadata = {
  title: 'Directories',
}

export default async function DirectoriesPage(
  props: PageProps<'/app/project/[projectSlug]/directories'>
) {
  const { session } = await verifySession()
  const { projectSlug } = await props.params

  const project = await getProject(session.user.id, projectSlug)
  const data = await getDirectoriesWithSubmissions(project.id)

  return (
    <>
      <PageHeader title="Directories" />
      <DataTableDirectories data={data} />
    </>
  )
}
