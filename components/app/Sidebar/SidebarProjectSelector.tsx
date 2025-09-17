import Link from 'next/link'
import { Menu } from '@base-ui-components/react/menu'
import { ArrowDown01Icon, Tick02Icon } from '@hugeicons/core-free-icons'
import { BaseIcon } from '@/components/ui/BaseIcon'
import type { Project } from '@/lib/db/schema/tables/projects'

export function SidebarProjectSelector({
  projects,
  projectSlug,
}: {
  projects: Array<Project>
  projectSlug?: string
}) {
  const currentProject = projects.find((project) => project.slug === projectSlug)

  return (
    <Menu.Root>
      <Menu.Trigger className="flex items-center gap-2.5 px-3 py-2 w-full bg-control-default border border-control-default rounded-control font-medium text-xs appearance-none cursor-pointer select-none">
        {currentProject ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="shrink-0 size-4"
              src={`https://www.google.com/s2/favicons?domain=${currentProject.websiteUrl}&sz=32`}
              alt={`${currentProject.name} favicon`}
            />
            {currentProject.name}
          </>
        ) : (
          <span className="text-secondary">Select a project</span>
        )}
        <BaseIcon
          className="shrink-0 ml-auto size-4 text-control-icon"
          icon={ArrowDown01Icon}
          strokeWidth={2.5}
        />
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner
          className="w-[var(--anchor-width)] outline-none select-none z-popup"
          align="start"
          sideOffset={4}
        >
          <Menu.Popup className="overflow-hidden p-1 w-full bg-white border border-zinc-200 rounded-lg shadow-lg transition-[transform,scale,opacity] data-[starting-style]:scale-90 data-[starting-style]:opacity-0">
            {projects.map((project) => (
              <SidebarProjectSelectorItem key={project.id} project={project} />
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}

export function SidebarProjectSelectorItem({ project }: { project: Project }) {
  return (
    <Menu.Item
      className="flex items-center gap-2.5 px-3 py-2 font-medium text-xs rounded-lg outline-none select-none transition-colors cursor-pointer data-[highlighted]:bg-zinc-100"
      render={<Link href={`/app/project/${project.slug}`} />}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="shrink-0 size-4"
        src={`https://www.google.com/s2/favicons?domain=${project.websiteUrl}&sz=32`}
        alt={`${project.name} favicon`}
      />
      {project.name}
      <BaseIcon
        className="shrink-0 ml-auto size-4 text-control-icon"
        icon={Tick02Icon}
        strokeWidth={2.5}
      />
    </Menu.Item>
  )
}
