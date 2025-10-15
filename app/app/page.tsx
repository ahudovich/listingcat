import { Metadata } from 'next'
import { ProjectList } from '@/components/app/dashboard/ProjectList'
import { ProjectsNoData } from '@/components/app/dashboard/ProjectsNoData'
import { AppContentBody } from '@/components/app/layout/AppContent/AppContentBody'
import { AppContentHeader } from '@/components/app/layout/AppContent/AppContentHeader'
import { getProjects, verifySession } from '@/lib/cached-functions'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function DashboardPage() {
  const { session } = await verifySession()
  const projects = await getProjects(session.user.id)

  return (
    <>
      <AppContentHeader
        title="Projects"
        description="Projects help you organize your submissions per each product."
      />

      <AppContentBody>
        {projects.length > 0 ? <ProjectList projects={projects} /> : <ProjectsNoData />}
      </AppContentBody>
    </>
  )
}
