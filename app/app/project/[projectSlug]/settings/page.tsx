import { Metadata } from 'next'
import { AppContentBody } from '@/components/app/layout/AppContent/AppContentBody'
import { PageHeader } from '@/components/app/PageHeader'
import { SettingsProjectDelete } from '@/components/app/settings/SettingsProjectDelete'
import { UpdateProjectDetailsForm } from '@/components/forms/UpdateProjectDetailsForm'
import { getProject, verifySession } from '@/lib/cached-functions'

export const metadata: Metadata = {
  title: 'Project Settings',
}

export default async function ProjectSettingsPage(
  props: PageProps<'/app/project/[projectSlug]/settings'>
) {
  const { session } = await verifySession()
  const { projectSlug } = await props.params

  const project = await getProject(session.user.id, projectSlug)

  return (
    <>
      <PageHeader title="Project Settings" />

      <AppContentBody>
        <div className="grid gap-4">
          <div className="grid grid-cols-[1fr_2fr] gap-6 p-4 bg-zinc-50/50 border border-layout-separator rounded-lg">
            <div>
              <h2 className="mb-2 font-display font-medium text-sm text-primary">General</h2>
              <p className="text-xs text-tertiary">Update the project details</p>
            </div>

            <div className="pt-2">
              <UpdateProjectDetailsForm project={project} />
            </div>
          </div>

          <div className="grid grid-cols-[1fr_2fr] gap-6 p-4 bg-red-50/50 border border-red-200 rounded-lg">
            <div>
              <h2 className="mb-2 font-display font-medium text-sm text-red-800">Danger zone</h2>
              <p className="text-xs text-destructive">Permanently delete all project data.</p>
            </div>

            <div className="pt-2">
              <SettingsProjectDelete project={project} />
            </div>
          </div>
        </div>
      </AppContentBody>
    </>
  )
}
