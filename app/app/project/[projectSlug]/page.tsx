import { Metadata } from 'next'
import { PageHeader } from '@/components/app/PageHeader'
import { getProject, verifySession } from '@/lib/cached-functions'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ projectSlug: string }>
}): Promise<Metadata> {
  const { session } = await verifySession()
  const projectSlug = (await params).projectSlug

  const project = await getProject(session.user.id, projectSlug)

  return {
    title: project.name,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectSlug: string }>
}) {
  const { session } = await verifySession()
  const projectSlug = (await params).projectSlug

  const project = await getProject(session.user.id, projectSlug)

  return <PageHeader title={project.name} />
}
