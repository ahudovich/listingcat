import { Metadata } from 'next'
import { PageHeader } from '@/components/app/PageHeader'
import { ServiceSocialCard } from '@/components/app/Services/ServiceSocialCard'
import BaseScrollArea from '@/components/ui/BaseScrollArea'
import { getDB, tables } from '@/lib/drizzle'

export const metadata: Metadata = {
  title: 'Social marketing',
}

export default async function SocialMarketingPage() {
  const data = await getDB().select().from(tables.services)

  return (
    <>
      <PageHeader
        title="Social marketing"
        description="Find the best social marketing services for your products."
      />

      <BaseScrollArea>
        <div className="grid grid-cols-1 gap-4 p-4 xs:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {data.map((service) => (
            <ServiceSocialCard key={service.id} service={service} />
          ))}
        </div>
      </BaseScrollArea>
    </>
  )
}
