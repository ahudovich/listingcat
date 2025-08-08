import { ArrowDown01Icon } from '@hugeicons/core-free-icons'
import { Accordion } from 'radix-ui'
import BaseIcon from '@/components/ui/BaseIcon'

const faqItems: Array<{ id: string; question: string; answer: string }> = [
  {
    id: 'q1',
    question: 'What is a UTM campaign builder?',
    answer:
      'A UTM campaign builder is a tool that appends UTM parameters to your website links so you can accurately track traffic sources, mediums, and campaigns in analytics platforms.',
  },
  {
    id: 'q2',
    question: 'Which UTM parameters are required?',
    answer:
      'UTM campaign source, medium, and name are required. Other parameters can be left empty.',
  },
  {
    id: 'q3',
    question: 'Will this work with Google Analytics and GA4?',
    answer:
      'Yes. UTM parameters are supported by Google Analytics (including GA4) and most other analytics tools. Use consistent naming to keep reports clear and comparable across campaigns and channels.',
  },
  {
    id: 'q4',
    question: 'How should I name utm_source, utm_medium, and utm_campaign?',
    answer:
      'Keep names lowercase, descriptive, and consistent. Examples: utm_source=google, utm_medium=cpc, utm_campaign=launch_q3. Avoid spaces and special characters; use hyphens or underscores instead.',
  },
  {
    id: 'q5',
    question: 'Can I add UTM tags to URLs that already have query parameters?',
    answer:
      'Yes. Existing query parameters are preserved. If a UTM parameter already exists in the URL, this builder will overwrite it with your new value to keep the link consistent.',
  },
  {
    id: 'q6',
    question: 'What does utm_term mean and when should I use it?',
    answer:
      'utm_term is commonly used for paid search keywords or audience names. It helps you analyze which queries or segments drive performance inside your campaign reports.',
  },
  {
    id: 'q7',
    question: 'What is utm_content used for?',
    answer:
      'utm_content distinguishes different creatives or placements within the same campaign, such as button vs. text link, banner A vs. banner B, or hero vs. footer link.',
  },
  {
    id: 'q8',
    question: 'Should I use uppercase or lowercase in UTM parameters?',
    answer:
      'Use lowercase consistently to avoid fragmenting your analytics reports. Mixing cases can create multiple rows for what is effectively the same source, medium, or campaign.',
  },
  {
    id: 'q9',
    question: 'Do UTM parameters impact SEO?',
    answer:
      'No. UTM parameters do not change the content of your page and generally do not affect organic rankings. They are primarily for tracking campaign attribution in analytics.',
  },
  {
    id: 'q10',
    question: 'What happens if I share a shortened link with UTM parameters?',
    answer:
      'Link shorteners preserve the full destination URL, including UTM parameters. Your analytics platform will record the attribution when users click through to the final URL.',
  },
]

export function CampaignUrlBuilderFaq() {
  return (
    <section>
      <h2 className="mb-6 font-extrabold text-2xl text-primary">FAQ</h2>

      <Accordion.Root type="single" collapsible>
        {faqItems.map((item) => (
          <Accordion.Item
            className="border-t border-layout-separator"
            value={item.id}
            key={item.id}
          >
            <h3>
              <Accordion.Trigger className="group flex w-full items-center gap-2 py-3 font-semibold text-sm text-primary text-left cursor-pointer">
                <span className="grow">{item.question}</span>
                <BaseIcon
                  className="shrink-0 size-4.5 text-tertiary transition-all group-hover:text-primary group-data-[state=open]:-rotate-180"
                  icon={ArrowDown01Icon}
                  strokeWidth={2.5}
                />
              </Accordion.Trigger>
            </h3>

            <Accordion.Content className="pt-1 pb-4 text-sm text-secondary">
              {item.answer}
            </Accordion.Content>
          </Accordion.Item>
        ))}
        <div className="border-b border-layout-separator" />
      </Accordion.Root>
    </section>
  )
}
