import { CampaignUrlBuilderFaq } from './components/CampaignUrlBuilderFaq'
import { CampaignUrlBuilderForm } from './components/CampaignUrlBuilderForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free UTM Campaign Builder',
  description:
    'Free UTM campaign builder to generate UTM-tagged links. Create clean, consistent UTM parameters for Google Analytics and other analytics tools.',
  alternates: {
    canonical: '/tools/utm-campaign-builder',
  },
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

      <section className="mb-16">
        <h2 className="mb-6 font-extrabold text-2xl text-primary">
          Why Use a Campaign UTM Builder?
        </h2>

        <div className="prose prose-zinc max-w-none">
          <p className="mb-4 text-secondary leading-relaxed">
            A campaign UTM builder is an essential tool for digital marketers who want to track the
            effectiveness of their marketing campaigns. By adding UTM parameters to your URLs, you
            can identify which marketing channels, campaigns, and content drive the most traffic and
            conversions to your website.
          </p>

          <p className="mb-4 text-secondary leading-relaxed">
            This free campaign URL builder generates Google Analytics-compatible URLs that help you
            measure ROI, optimize your marketing spend, and make data-driven decisions. Whether
            you&apos;re running paid ads, email campaigns, social media marketing, or content
            marketing, UTM parameters provide the insights you need to succeed.
          </p>

          <p className="text-secondary leading-relaxed">
            Our tool is completely free, requires no registration, and generates unlimited campaign
            URLs. Start tracking your marketing campaigns today and unlock the power of data-driven
            marketing.
          </p>
        </div>
      </section>

      <CampaignUrlBuilderFaq />
    </article>
  )
}
