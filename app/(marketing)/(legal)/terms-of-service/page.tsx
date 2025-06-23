import Link from 'next/link'
import { EMAILS } from '@/data/emails'

export const metadata = {
  title: 'Terms and Conditions | Listing Cat',
  description: 'Learn how Listing Cat handles terms and conditions.',
}

export default function TermsOfServicePage() {
  return (
    <article className="container pt-12 max-w-3xl prose prose-headings:font-bold prose-h1:font-black prose-h1:my-4 prose-h2:mt-8 prose-h2:mb-3 prose-strong:font-medium">
      <h1 className="!mt-0">Terms and Conditions</h1>
      <p>
        <strong className="font-medium">Effective Date: 23 June 2025</strong>
      </p>

      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using this website, you agree to be bound by these Terms and Conditions.
          If you disagree with any part of the terms, you may not use this website.
        </p>
      </section>

      <section>
        <h2>2. Description of Service</h2>
        <p>
          This website provides a marketing database that can be useful for startups and indie
          hackers.
        </p>
      </section>

      <section>
        <h2>3. Payment and Refunds</h2>
        <p>
          In case of purchasing anything on this website, the payment is processed through a payment
          provider (Stripe, Inc.). The refund policy, as detailed separately, forms part of these
          Terms and Conditions. Please refer to the <Link href="/refund-policy">Refund Policy</Link>{' '}
          for more information.
        </p>
      </section>

      <section>
        <h2>4. Limitation of Liability</h2>
        <p>
          We strive to provide high-quality services, but we cannot guarantee specific outcomes or
          results when purchasing anything on this website.
        </p>
      </section>

      <section>
        <h2>5. Modifications to Terms</h2>
        <p>
          We reserve the right to modify these Terms and Conditions at any time. Changes will be
          effective immediately upon posting on this website. Your continued use of this website
          after changes constitutes acceptance of the modified terms.
        </p>
      </section>

      <section>
        <h2>6. Governing Law</h2>
        <p>
          These Terms and Conditions are governed by and construed in accordance with the laws of
          Poland. Any disputes relating to these terms and conditions will be subject to the
          exclusive jurisdiction of the courts of Poland.
        </p>

        <p>
          For any questions or concerns regarding these Terms and Conditions, please contact us at{' '}
          <a href={`mailto:${EMAILS.SUPPORT}`}>{EMAILS.SUPPORT}</a>
        </p>

        <p className="!mb-0">
          By using this website, you acknowledge that you have read, understood, and agreed to these
          Terms and Conditions.
        </p>
      </section>
    </article>
  )
}
