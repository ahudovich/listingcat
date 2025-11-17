'use client'

import { useId, useState } from 'react'
import { ProjectCard } from '@/components/app/projects/project-card'
import { CreateProjectModal } from '@/components/modals/create-project'
import { BaseButton } from '@/components/ui/button'
import { BaseSearch } from '@/components/ui/search'
import type { Project } from '@/lib/db/schema/tables/projects'

export function ProjectList({ projects }: { projects: Array<Project> }) {
  const id = useId()
  const [query, setQuery] = useState('')
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false)

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 [&>div]:grow">
        <BaseSearch
          id={id}
          className="w-full min-w-48 max-w-66"
          placeholder="Search for a project"
          size="xs"
          value={query}
          onChange={(value) => setQuery(String(value))}
        />

        <BaseButton size="xs" onClick={() => setIsCreateProjectModalOpen(true)}>
          Create project
        </BaseButton>
      </div>

      <div className="grid gap-4 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {isCreateProjectModalOpen && (
        <CreateProjectModal
          isOpen={isCreateProjectModalOpen}
          setIsOpen={setIsCreateProjectModalOpen}
        />
      )}
    </>
  )
}
