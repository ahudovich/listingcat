import { CampaignUrlBuilderFaq } from './components/CampaignUrlBuilderFaq'
import { CampaignUrlBuilderForm } from './components/CampaignUrlBuilderForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free UTM Campaign Builder | Listing Cat',
  description:
    'Free UTM campaign builder to generate UTM-tagged links. Create clean, consistent UTM parameters for Google Analytics and other analytics tools.',
}

export default function Page() {
  return (
    <article className="container pt-8 sm:pt-12 max-w-4xl">
      <header className="mb-6">
        <h1 className="font-black text-2xl text-primary sm:text-4xl">Free UTM Campaign Builder</h1>

        <p className="mt-3 text-sm-relaxed text-balance sm:text-md-relaxed">
          Use this free UTM campaign builder to generate clean, consistent UTM parameters for your
          marketing links. Track traffic sources, mediums, and campaigns across ads, email, social,
          partnerships, and more &ndash; all in a format that works seamlessly with Google Analytics
          and other web analytics tools.
        </p>
      </header>

      <section className="mb-16">
        <CampaignUrlBuilderForm />
      </section>

      <CampaignUrlBuilderFaq />
    </article>
  )
}
