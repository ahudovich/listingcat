import { LinkSquare02Icon } from '@hugeicons/core-free-icons'
import BaseIcon from '@/components/ui/BaseIcon'
import { Service } from '@/lib/db/schema/tables/services'

export function ServiceSocialCard({ service }: { service: Service }) {
  return (
    <a
      className="group/link block p-4 border border-zinc-200 rounded-xl transition-all hover:border-zinc-300 hover:shadow-md hover:shadow-zinc-200/50"
      href={service.websiteUrl}
    >
      <h2 className="flex items-center gap-2 mb-2 font-semibold text-xs">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="shrink-0 size-4"
          src={`https://www.google.com/s2/favicons?domain=${service.websiteUrl}&sz=32`}
          alt={`${service.name} favicon`}
        />
        {service.name}
        <BaseIcon
          className="ml-auto size-3.5 opacity-0 text-faded transition-all group-hover/link:opacity-100"
          icon={LinkSquare02Icon}
          strokeWidth={2.5}
        />
      </h2>

      <p className="text-xs text-gray-500">{service.shortDescription}</p>
    </a>
  )
}
