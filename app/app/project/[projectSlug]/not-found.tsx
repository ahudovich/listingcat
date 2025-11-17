import Link from 'next/link'
import { AppContentBody } from '@/components/app/layout/content/body'
import { AppContentHeader } from '@/components/app/layout/content/header'
import { BaseButton } from '@/components/ui/button'

export default function NotFound() {
  return (
    <>
      <AppContentHeader
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
