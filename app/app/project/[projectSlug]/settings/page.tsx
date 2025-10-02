import { Metadata } from 'next'
import { PageHeader } from '@/components/app/PageHeader'

export const metadata: Metadata = {
  title: 'Project Settings',
}

export default async function ProjectSettingsPage() {
  return (
    <>
      <PageHeader title="Project Settings" />
    </>
  )
}
