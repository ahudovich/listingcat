import { PageHeader } from '@/components/app/PageHeader'
import { CreateProjectForm } from '@/components/forms/CreateProjectForm'

export default function CreateProjectPage() {
  return (
    <>
      <PageHeader
        title="Create a Project"
        description="Projects help you organize your submissions per each product."
      />

      <div className="px-4">
        <CreateProjectForm />
      </div>
    </>
  )
}
