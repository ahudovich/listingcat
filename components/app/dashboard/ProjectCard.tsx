import Link from 'next/link'
import { ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { BaseIcon } from '@/components/ui/BaseIcon'
import type { Project } from '@/lib/db/schema/tables/projects'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      className="group overflow-hidden p-4 bg-white border border-layout-separator rounded-lg outline-none cursor-pointer transition-all hover:bg-zinc-50 hover:border-zinc-300 focus-visible:ring-2 focus-visible:ring-control-default"
      href={`/app/project/${project.slug}`}
    >
      <div className="flex items-center gap-2.5 mb-2">
        <div className="shrink-0 p-1 rounded-md border border-layout-separator">
          <img
            className="size-4"
            src={`https://www.google.com/s2/favicons?domain=${project.websiteUrl}&sz=32`}
            alt={`${project.name} favicon`}
          />
        </div>

        <h2 className="font-semibold text-sm truncate">{project.name}</h2>

        <BaseIcon
          className="ml-auto shrink-0 size-4 text-zinc-600 transition-all group-hover:text-zinc-700 group-hover:translate-x-1"
          icon={ArrowRight01Icon}
          strokeWidth={2.5}
        />
      </div>

      <p className="text-xs text-faded truncate">{project.websiteUrl}</p>
    </Link>
  )
}
