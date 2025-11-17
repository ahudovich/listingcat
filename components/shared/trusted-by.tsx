import Image from 'next/image'
import { Popover } from '@base-ui-components/react/popover'
import { cn } from '@/utils/css'

const trustedBy = [
  {
    name: 'Nathan Covey',
    title: 'Founder',
    image: '/home/founders/nathan-covey.png',
    profileUrl: 'https://x.com/nathan_covey',
    product: {
      name: 'Harmony AI',
      url: 'https://harmony.com.ai',
      logo: '/home/founders/logo-harmony.svg',
    },
  },
  {
    name: 'Evgeniy Mikholap',
    title: 'Co‑Founder',
    image: '/home/founders/evgeniy-mikholap.png',
    profileUrl: 'https://x.com/evgeniymikholap',
    product: {
      name: 'Natural Write',
      url: 'https://naturalwrite.com',
      logo: '/home/founders/logo-natural-write.svg',
    },
  },
  {
    name: 'Piotr Kulpinski',
    title: 'Founder',
    image: '/home/founders/piotr-kulpinski.png',
    profileUrl: 'https://x.com/piotrkulpinski',
    product: {
      name: 'Open Alternative',
      url: 'https://openalternative.co',
      logo: '/home/founders/logo-open-alternative.svg',
    },
  },
  {
    name: 'Joschua Builds',
    title: 'Co‑Founder',
    image: '/home/founders/joschua-builds.png',
    profileUrl: 'https://x.com/JoschuaBuilds',
    product: {
      name: 'Postel',
      url: 'https://www.postel.app',
      logo: '/home/founders/logo-postel.svg',
    },
  },
  {
    name: 'Kostya Nesterovich',
    title: 'Founder',
    image: '/home/founders/kostya-nesterovich.png',
    profileUrl: 'https://x.com/nstkostya',
    product: {
      name: 'Seline',
      url: 'https://seline.com',
      logo: '/home/founders/logo-seline.svg',
    },
  },
]

export function TrustedBy({ className }: { className?: string }) {
  return (
    <div className={cn('mb-8 font-medium text-xs text-secondary', className)}>
      <ul className="flex items-center justify-center mb-2">
        {trustedBy.map((founder) => (
          <li key={founder.name} className="-mr-2 cursor-pointer last:mr-0">
            <TrustedByPopover
              name={founder.name}
              title={founder.title}
              product={founder.product}
              profileUrl={founder.profileUrl}
            >
              <Image
                className="block border-2 border-white rounded-full"
                src={founder.image}
                width={36}
                height={36}
                alt={founder.name}
                loading="lazy"
                draggable={false}
              />
            </TrustedByPopover>
          </li>
        ))}
      </ul>
      Trusted by 1,000+ founders
    </div>
  )
}

export function TrustedByPopover({
  className,
  name,
  title,
  product,
  profileUrl,
  children,
}: {
  className?: string
  name: string
  title: string
  profileUrl: string
  product: { name: string; url: string; logo: string }
  children: React.ReactNode
}) {
  return (
    <Popover.Root>
      <Popover.Trigger className="cursor-pointer">{children}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner side="top" sideOffset={4}>
          <Popover.Popup
            className={cn(
              'relative z-popover overflow-hidden px-3 py-1.5 bg-white border border-layout-separator rounded-md shadow-lg text-xs text-secondary origin-[var(--transform-origin)] transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0',
              className
            )}
          >
            <p className="mb-1 font-medium">
              <a
                className="inline-flex items-center gap-1.25 transition-colors hover:text-accent"
                href={profileUrl}
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                {name}
              </a>
            </p>

            <p className="flex items-center gap-1 text-[0.8125rem]">
              {title} of{' '}
              <a
                className="inline-flex items-center gap-1.25 font-semibold transition-colors hover:text-accent"
                href={product.url}
                target="_blank"
                rel="nofollow"
              >
                <img className="shrink-0 size-3" src={product.logo} alt={product.name} />
                {product.name}
              </a>
            </p>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}
