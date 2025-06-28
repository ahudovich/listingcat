import Link from 'next/link'
import BaseLogo from '@/components/ui/BaseLogo'
import { EMAILS } from '@/data/emails'

const links: Array<{
  label: string
  items: Array<{
    name: string
    url: string
    isExternal?: boolean
  }>
}> = [
  {
    label: 'Links',
    items: [
      {
        name: 'Contact us',
        url: `mailto:${EMAILS.SUPPORT}`,
      },
    ],
  },
  {
    label: 'Legal',
    items: [
      {
        name: 'Terms of Service',
        url: '/terms-of-service',
      },
      {
        name: 'Privacy Policy',
        url: '/privacy-policy',
      },
      {
        name: 'Refund Policy',
        url: '/refund-policy',
      },
    ],
  },
  {
    label: 'Our partners',
    items: [
      {
        name: 'Find Business Ideas',
        url: 'https://www.businessideasdb.com',
        isExternal: true,
      },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="sticky top-[100vh] bg-gray-100 border-t border-zinc-200">
      <div className="container py-10 lg:flex">
        <div className="mb-8">
          <BaseLogo className="mb-3 w-35.5 h-5.5" />
          <p className="text-xs-relaxed">Marketing database for startups and indie hackers</p>
        </div>

        <div className="grid gap-6 sm:flex sm:gap-x-20 lg:ml-auto">
          {links.map((section) => (
            <div className="text-xs" key={section.label}>
              <div className="mb-2.5 font-medium text-xs text-primary">{section.label}</div>
              <ul>
                {section.items.map((link) => (
                  <li className="mb-2 last:mb-0" key={link.name}>
                    <Link
                      className="inline-block py-0.5"
                      href={link.url}
                      target={link.isExternal ? '_blank' : undefined}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="py-6 border-t border-zinc-200">
          <p className="text-[13px] text-secondary">
            &copy; {new Date().getFullYear()} Listing Cat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
