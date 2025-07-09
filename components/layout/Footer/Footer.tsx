import Link from 'next/link'
import { BlueskyIcon, NewTwitterIcon, ThreadsIcon } from '@hugeicons/core-free-icons'
import { FooterSubmitButton } from '@/components/layout/Footer/FooterSubmitButton'
import BaseIcon from '@/components/ui/BaseIcon'
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

const socialLinks = [
  {
    icon: NewTwitterIcon,
    url: 'https://x.com/ListingCat',
  },
  {
    icon: BlueskyIcon,
    url: 'https://bsky.app/profile/listingcat.com',
  },
  {
    icon: ThreadsIcon,
    url: 'https://www.threads.com/@listingcat',
  },
]

export default function Footer() {
  return (
    <footer className="sticky top-[100vh] bg-gray-100 border-t border-zinc-200">
      <div className="container py-10 lg:flex">
        <div className="mb-8">
          <BaseLogo className="mb-3 w-35.5 h-5.5" />
          <p className="mb-3 text-xs-relaxed">Marketing database for startups and indie hackers.</p>
          <ul className="flex items-center gap-3.5 mb-4">
            {socialLinks.map((link) => (
              <li key={link.url}>
                <Link className="group" href={link.url} target="_blank">
                  <BaseIcon
                    className="size-4.5 text-tertiary transition-colors group-hover:text-primary"
                    icon={link.icon}
                    strokeWidth={2}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-6 sm:flex sm:gap-x-20 lg:ml-auto">
          {links.map((section) => (
            <div className="text-xs" key={section.label}>
              <div className="mb-2.5 font-medium text-xs text-primary">{section.label}</div>
              <ul>
                {section.items.map((link) => (
                  <li className="mb-2 last:mb-0" key={link.name}>
                    <Link
                      className="inline-block py-0.5 transition-colors hover:text-primary"
                      href={link.url}
                      target={link.isExternal ? '_blank' : undefined}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}

                {section.label === 'Links' && (
                  <li className="mb-2 last:mb-0">
                    <FooterSubmitButton />
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="py-6 border-t border-zinc-200">
          <p className="text-[0.8125rem] text-secondary">
            &copy; {new Date().getFullYear()} Listing Cat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
