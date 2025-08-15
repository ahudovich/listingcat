import Image from 'next/image'
import Link from 'next/link'
import { BlueskyIcon, NewTwitterIcon, ThreadsIcon } from '@hugeicons/core-free-icons'
import { FooterSubmitButton } from '@/components/layout/Footer/FooterSubmitButton'
import BaseIcon from '@/components/ui/BaseIcon'
import BaseLogo from '@/components/ui/BaseLogo'
import { EMAILS } from '@/data/emails'
import { LINKS } from '@/data/links'

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
        name: 'Blog',
        url: '/blog',
      },
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

const toolLinks = [
  {
    name: 'UTM Campaign Builder',
    url: '/tools/utm-campaign-builder',
  },
]

export default function Footer() {
  return (
    <footer className="sticky top-[100vh] bg-gray-100 border-t border-zinc-200">
      <div className="container py-10 lg:flex">
        <div className="mb-8 text-center lg:mb-0 sm:text-left">
          <BaseLogo className="mx-auto mb-3 w-35.5 h-5.5 sm:mx-0" />
          <p className="mb-4 text-xs-relaxed">Discover the best places to promote your startup.</p>
          <ul className="flex items-center justify-center gap-3.5 mb-6 sm:justify-start">
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

          <div className="inline-block px-6 py-3 bg-emerald-50 border border-emerald-600/75 ring-3 ring-emerald-600/25 rounded-xl text-xs text-secondary">
            <p className="mb-1">Looking for a submission service?</p>
            <p>
              <a
                className="font-semibold text-emerald-700 hover:text-emerald-800"
                href={LINKS.PARTNERS.SUBMISSION_SERVICE}
                rel="sponsored"
                target="_blank"
              >
                Submit your startup to 100+ directories
              </a>
            </p>
          </div>
        </div>

        <div className="grid gap-6 text-center sm:flex sm:gap-x-20 sm:text-left lg:ml-auto">
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
        <div className="py-4 border-t border-zinc-200 text-center sm:text-left">
          <div className="mb-2.5 font-medium text-xs text-primary">Free tools</div>
          <ul className="flex items-center justify-center gap-4 sm:justify-start">
            {toolLinks.map((link) => (
              <li className="text-xs" key={link.name}>
                <Link
                  className="inline-block py-0.5 transition-colors hover:text-primary"
                  href={link.url}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container">
        <div className="flex flex-col items-center py-6 border-t border-zinc-200 sm:flex-row sm:justify-between">
          <p className="mb-2.5 text-[0.8125rem] text-secondary sm:mb-0">
            &copy; {new Date().getFullYear()} Listing Cat. All rights reserved.
          </p>

          <p className="flex items-center gap-x-1.5 text-[0.8125rem] text-secondary">
            Made by
            <a
              className="inline-flex items-center gap-x-1.5 text-secondary transition-colors hover:text-primary"
              href={LINKS.AUTHOR.X}
              target="_blank"
              rel="nofollow"
            >
              <Image
                className="size-4 rounded-full"
                src="/layout/footer/andrei-hudovich.png"
                width={16}
                height={16}
                alt="Andrei Hudovich"
              />
              Andrei Hudovich
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
