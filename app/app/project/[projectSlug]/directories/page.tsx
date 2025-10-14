import { Metadata } from 'next'
import { DataTableDirectories } from '@/components/app/DataTable/tables/DataTableDirectories'
import { AppContentHeader } from '@/components/app/layout/AppContent/AppContentHeader'
import { getDirectoriesWithSubmissions, getProject, verifySession } from '@/lib/cached-functions'
import { getInitialPageSize } from '@/lib/cookies/server'

export const metadata: Metadata = {
  title: 'Directories',
}

export default async function DirectoriesPage(
  props: PageProps<'/app/project/[projectSlug]/directories'>
) {
  const { session } = await verifySession()
  const { projectSlug } = await props.params

  const initialPageSize = await getInitialPageSize()

  const project = await getProject(session.user.id, projectSlug)
  const data = await getDirectoriesWithSubmissions(project.id)

  return (
    <>
      <AppContentHeader title="Directories" />
      <DataTableDirectories initialPageSize={initialPageSize} data={data} />
    </>
  )
}
