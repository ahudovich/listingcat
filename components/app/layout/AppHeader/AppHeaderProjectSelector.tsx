'use client'

import { useEffect, useId, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Combobox } from '@base-ui-components/react/combobox'
import {
  Add01Icon,
  Search01FreeIcons,
  Tick02Icon,
  UnfoldMoreIcon,
} from '@hugeicons/core-free-icons'
import { CreateProjectModal } from '@/components/modals/CreateProjectModal'
import { BaseIcon } from '@/components/ui/BaseIcon'
import type { Project } from '@/lib/db/schema/tables/projects'

export function AppHeaderProjectSelector({
  projects,
  projectSlug,
}: {
  projects: Array<Project>
  projectSlug: string
}) {
  const id = useId()
  const router = useRouter()

  // Project is guaranteed to be found
  const currentProject = projects.find((project) => project.slug === projectSlug)

  const [value, setValue] = useState(currentProject)
  const [open, setOpen] = useState(false)
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false)

  // Sync state when URL parameter changes
  useEffect(() => {
    const newProject = projects.find((project) => project.slug === projectSlug)

    if (newProject && newProject.id !== value?.id) {
      setValue(newProject)
    }
  }, [projectSlug, projects, value?.id])

  // Use the useFilter hook for filtering
  const { contains } = Combobox.useFilter({
    value,
  })

  // Handle project selection and navigation
  function handleValueChange(selectedProject: Project) {
    if (selectedProject) {
      setValue(selectedProject)
      setOpen(false)

      router.push(`/app/project/${selectedProject.slug}`)
    }
  }

  return (
    <>
      <Combobox.Root
        items={projects}
        open={open}
        onOpenChange={setOpen}
        value={value}
        onValueChange={handleValueChange}
        filter={contains}
        itemToStringLabel={(project) => project.name}
        itemToStringValue={(project) => project.slug}
      >
        <Combobox.Trigger className="flex items-center gap-2.5 px-2 py-1 max-w-72 bg-control-default rounded-control font-medium text-xs appearance-none cursor-pointer select-none">
          <Combobox.Value>
            {(selectedProject: Project) => (
              <>
                <img
                  className="shrink-0 size-4"
                  src={`https://www.google.com/s2/favicons?domain=${selectedProject.websiteUrl}&sz=32`}
                  width={16}
                  height={16}
                  alt={`${selectedProject.name} favicon`}
                />
                <span className="truncate">{selectedProject.name}</span>
              </>
            )}
          </Combobox.Value>

          <Combobox.Icon
            render={
              <BaseIcon
                className="shrink-0 size-3.5 text-control-icon"
                icon={UnfoldMoreIcon}
                strokeWidth={2.5}
              />
            }
          />
        </Combobox.Trigger>

        <Combobox.Portal>
          <Combobox.Positioner
            className="outline-none select-none z-popup"
            align="start"
            sideOffset={4}
          >
            <Combobox.Popup className="overflow-hidden w-[var(--anchor-width)] min-w-64 bg-white border border-layout-separator rounded-lg shadow-lg origin-[var(--transform-origin)] transition-[transform,scale,opacity] ease-out data-[starting-style]:scale-90 data-[starting-style]:opacity-0">
              {/* Search */}
              <div className="group relative">
                <BaseIcon
                  className="absolute top-1/2 left-4 -translate-y-1/2 size-4 text-control-icon"
                  icon={Search01FreeIcons}
                  strokeWidth={2.5}
                />

                <Combobox.Input
                  id={`${id}-search`}
                  placeholder="Find project..."
                  className="pl-10.5 pr-4 py-2 w-full font-medium text-xs outline-none"
                />
              </div>

              <Combobox.Separator className="w-full h-px bg-layout-separator" />

              {/* Empty state */}
              <Combobox.Empty className="px-4 py-3 font-medium text-xs empty:p-0">
                No projects found
              </Combobox.Empty>

              {/* Projects list */}
              <Combobox.List className="overflow-y-auto scroll-py-1 p-1 max-h-47 empty:p-0">
                {(project: Project) => (
                  <Combobox.Item
                    key={project.id}
                    className="flex items-center gap-2.5 px-3 py-2 font-medium text-xs rounded-lg select-none transition-colors cursor-pointer data-[highlighted]:bg-zinc-100"
                    value={project}
                  >
                    <img
                      className="shrink-0 size-4"
                      src={`https://www.google.com/s2/favicons?domain=${project.websiteUrl}&sz=32`}
                      alt={`${project.name} favicon`}
                    />
                    <span className="truncate">{project.name}</span>

                    <Combobox.ItemIndicator
                      render={
                        <BaseIcon
                          className="shrink-0 ml-auto size-4 text-control-icon"
                          icon={Tick02Icon}
                          strokeWidth={2.5}
                        />
                      }
                    />
                  </Combobox.Item>
                )}
              </Combobox.List>

              <Combobox.Separator className="w-full h-px bg-layout-separator" />

              {/* Create project */}
              <div className="p-1">
                <Combobox.Item
                  nativeButton={true}
                  render={
                    <button
                      className="flex items-center gap-2.5 px-3 py-2 w-full font-medium text-xs rounded-lg select-none transition-colors cursor-pointer data-[highlighted]:bg-zinc-100"
                      onClick={() => setIsCreateProjectModalOpen(true)}
                    >
                      <BaseIcon className="shrink-0 size-4 text-control-icon" icon={Add01Icon} />
                      Create project
                    </button>
                  }
                />
              </div>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>

      {isCreateProjectModalOpen && (
        <CreateProjectModal
          isOpen={isCreateProjectModalOpen}
          setIsOpen={setIsCreateProjectModalOpen}
        />
      )}
    </>
  )
}
