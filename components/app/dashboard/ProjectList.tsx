'use client'

import { useId, useState } from 'react'
import { ProjectCard } from '@/components/app/dashboard/ProjectCard'
import { CreateProjectModal } from '@/components/modals/CreateProjectModal'
import { BaseButton } from '@/components/ui/BaseButton'
import { BaseSearch } from '@/components/ui/BaseSearch'
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
      <div className="flex items-center justify-between gap-4 mb-4">
        <BaseSearch
          id={id}
          className="w-66"
          placeholder="Search for a project"
          size="xs"
          value={query}
          onChange={(value) => setQuery(String(value))}
        />
        <BaseButton size="xs" onClick={() => setIsCreateProjectModalOpen(true)}>
          Create project
        </BaseButton>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <CreateProjectModal
        isOpen={isCreateProjectModalOpen}
        setIsOpen={setIsCreateProjectModalOpen}
      />
    </>
  )
}
