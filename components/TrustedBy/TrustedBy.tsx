import Image from 'next/image'
import { cn } from '@/utils/css'
import { TrustedByPopover } from './TrustedByPopover'

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
