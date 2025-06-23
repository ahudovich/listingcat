import { EMAILS } from '@/data/emails'

export const metadata = {
  title: 'Refund Policy | Listing Cat',
  description: 'Learn how Listing Cat handles refunds.',
}

export default function RefundPolicyPage() {
  return (
    <article className="container pt-12 max-w-3xl prose prose-headings:font-bold prose-h1:font-black prose-h1:my-4 prose-h2:mt-8 prose-h2:mb-3 prose-strong:font-medium">
      <h1 className="!mt-0">Refund Policy</h1>
      <p>
        <strong className="font-medium">Effective Date: 23 June 2025</strong>
      </p>

      <section>
        <h2>1. No Refunds after you purchase database access</h2>
        <p>
          Due to the nature of our service, all sales are final. Once you purchase the database
          access, you will be given the <u>full access</u> to our data, hence you will not be
          eligible for a refund.
        </p>
      </section>

      <section>
        <h2>2. Exceptions to the No-Refund Policy</h2>
        <p>As per EU consumer rights, we adhere to the following regulations:</p>
        <p>
          - <strong>Digital Content or Services</strong>: Under the EU Consumer Rights Directive
          (2011/83/EU), consumers are entitled to a 14-day cooling-off period for certain goods and
          services purchased online. However, by agreeing to our terms at the time of purchase, you
          expressly waive this right to withdraw once you have purchased the database access.
        </p>
      </section>

      <section>
        <h2>3. Issues and Discrepancies</h2>
        <p>
          In the event of any issues related to the performance of our service, please contact us as
          soon as possible at <a href={`mailto:${EMAILS.SUPPORT}`}>{EMAILS.SUPPORT}</a>, and we will
          make every effort to resolve the issue.
        </p>
      </section>

      <section>
        <h2>4. Legal Rights</h2>
        <p>
          This refund policy does not affect your statutory rights as a consumer under applicable EU
          laws.
        </p>
        <p>
          You may have additional rights in your country of residence. For further questions or
          inquiries, please contact us at <a href={`mailto:${EMAILS.SUPPORT}`}>{EMAILS.SUPPORT}</a>
        </p>
        <p className="!mb-0">
          By purchasing database access on this website, you acknowledge that you have read,
          understood, and agreed to this Refund Policy.
        </p>
      </section>
    </article>
  )
}
