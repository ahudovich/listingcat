import Link from 'next/link'
import { PageHeader } from '@/components/app/PageHeader'
import { BaseButton } from '@/components/ui/BaseButton'

export default function NotFound() {
  return (
    <>
      <PageHeader
        title="This project does not exist"
        description="Please check the URL and try again."
      />

      <div className="p-4">
        <BaseButton className="place-self-center" asChild>
          <Link href="/app/dashboard">Return to projects</Link>
        </BaseButton>
      </div>
    </>
  )
}
