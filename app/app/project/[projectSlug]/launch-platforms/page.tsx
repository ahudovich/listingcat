import { Metadata } from 'next'
import { DataTableLaunchPlatforms } from '@/components/app/data-table/tables/launch-platforms'
import { AppContentHeader } from '@/components/app/layout/content/header'
import {
  getLaunchPlatformsWithSubmissions,
  getProject,
  verifySession,
} from '@/lib/cached-functions'
import { getInitialPageSize } from '@/lib/cookies/server'

export const metadata: Metadata = {
  title: 'Launch Platforms',
}

export default async function LaunchPlatformsPage(
  props: PageProps<'/app/project/[projectSlug]/launch-platforms'>
) {
  const { session } = await verifySession()
  const { projectSlug } = await props.params

  const initialPageSize = await getInitialPageSize()

  const project = await getProject(session.user.id, projectSlug)
  const data = await getLaunchPlatformsWithSubmissions(project.id)

  return (
    <>
      <AppContentHeader title="Launch Platforms" />
      <DataTableLaunchPlatforms initialPageSize={initialPageSize} data={data} />
    </>
  )
}
