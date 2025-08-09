import { EMAILS } from '@/data/emails'

export const metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Listing Cat protects your privacy and data.',
  alternates: {
    canonical: '/privacy-policy',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <article className="container pt-12 max-w-3xl prose prose-headings:font-bold prose-h1:font-black prose-h1:my-4 prose-h2:mt-8 prose-h2:mb-3 prose-strong:font-medium">
      <h1 className="!mt-0">Privacy Policy</h1>
      <p>
        <strong className="font-medium">Effective Date: 23 June 2025</strong>
      </p>

      <section>
        <h2>1. Introduction</h2>
        <p>
          We respect your privacy and we are committed to protecting your personal data. This
          privacy policy will inform you about how we look after your personal data when you use our
          website and tell you about your privacy rights and how the law protects you.
        </p>
      </section>

      <section>
        <h2>2. How Your Data Is Collected</h2>
        <p>This website collects and processes the following data:</p>
        <ul>
          <li>
            <strong>Website and product analytics</strong> - anonymous data on usage of our website
            collected and processed via PostHog, Inc.
          </li>
          <li>
            <strong>Payment information</strong> - processed securely through a payment provider
            Stripe, Inc., that effects you only in case of making a purchase.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Data Sharing and Transfers</h2>
        <p>
          We do not sell, trade, or rent your personal information to third parties. However, we may
          share your information with trusted third-party service providers, such as Stripe, Inc.,
          to process payments and provide services on our behalf.
        </p>
      </section>

      <section>
        <h2>4. Data Security</h2>
        <p>
          We have implemented appropriate technical and organizational measures to ensure a level of
          security appropriate to the risk, including encryption of personal data and regular
          security assessments.
        </p>
      </section>

      <section>
        <h2>5. Your Data Protection Rights</h2>
        <p>Under GDPR, you have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Correct inaccurate personal data</li>
          <li>Request erasure of your personal data</li>
          <li>Object to processing of your personal data</li>
          <li>Request restriction of processing your personal data</li>
          <li>Request transfer of your personal data</li>
          <li>Withdraw consent</li>
        </ul>
      </section>

      <section>
        <h2>6. Cookies</h2>
        <p>We use cookies to track your authentication status.</p>
      </section>

      <section>
        <h2>7. Changes to This Privacy Policy</h2>
        <p>
          We may update this privacy policy from time to time. We will notify you of any changes by
          posting the new privacy policy on this page and updating the effective date at the top of
          this privacy policy.
        </p>
      </section>

      <section>
        <h2>8. Contact Us</h2>
        <p>
          If you have any questions about this privacy policy, please contact us at{' '}
          <a href={`mailto:${EMAILS.SUPPORT}`}>{EMAILS.SUPPORT}</a>
        </p>
        <p className="!mb-0">
          By using this website, you acknowledge that you have read and understood this Privacy
          Policy.
        </p>
      </section>
    </article>
  )
}
