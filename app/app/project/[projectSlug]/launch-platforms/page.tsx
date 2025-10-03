import { Metadata } from 'next'
import { DataTableLaunchPlatforms } from '@/components/app/DataTable/tables/DataTableLaunchPlatforms'
import { PageHeader } from '@/components/app/PageHeader'
import {
  getLaunchPlatformsWithSubmissions,
  getProject,
  verifySession,
} from '@/lib/cached-functions'

export const metadata: Metadata = {
  title: 'Launch Platforms',
}

export default async function LaunchPlatformsPage(
  props: PageProps<'/app/project/[projectSlug]/launch-platforms'>
) {
  const { session } = await verifySession()
  const { projectSlug } = await props.params

  const project = await getProject(session.user.id, projectSlug)
  const data = await getLaunchPlatformsWithSubmissions(project.id)

  return (
    <>
      <PageHeader title="Launch Platforms" />
      <DataTableLaunchPlatforms data={data} />
    </>
  )
}
