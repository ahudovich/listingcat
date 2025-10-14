import Link from 'next/link'
import { AppContentBody } from '@/components/app/layout/AppContent/AppContentBody'
import { PageHeader } from '@/components/app/PageHeader'
import { BaseButton } from '@/components/ui/BaseButton'

export default function NotFound() {
  return (
    <>
      <PageHeader
        title="This project does not exist"
        description="Please check the URL and try again."
      />

      <AppContentBody>
        <BaseButton className="place-self-center" render={<Link href="/app" />}>
          Return to projects
        </BaseButton>
      </AppContentBody>
    </>
  )
}
