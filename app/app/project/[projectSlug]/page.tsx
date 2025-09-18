import { Metadata } from 'next'
import { PageHeader } from '@/components/app/PageHeader'
import { getProject, verifySession } from '@/lib/cached-functions'

export async function generateMetadata(
  props: PageProps<'/app/project/[projectSlug]'>
): Promise<Metadata> {
  const { session } = await verifySession()
  const { projectSlug } = await props.params

  const project = await getProject(session.user.id, projectSlug)

  return {
    title: project.name,
  }
}

export default async function ProjectPage(props: PageProps<'/app/project/[projectSlug]'>) {
  const { session } = await verifySession()
  const { projectSlug } = await props.params

  const project = await getProject(session.user.id, projectSlug)

  return <PageHeader title={project.name} />
}
