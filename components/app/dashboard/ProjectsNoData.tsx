'use client'

import { useState } from 'react'
import { CreateProjectModal } from '@/components/modals/CreateProjectModal'
import { BaseButton } from '@/components/ui/BaseButton'

export function ProjectsNoData() {
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false)

  return (
    <div className="grid place-content-center py-8 h-full text-center sm:p-12">
      <h1 className="mb-2 font-display font-bold text-xl text-primary text-balance">
        No projects yet
      </h1>

      <p className="mb-6 text-sm text-balance">
        Get started by creating your first project &ndash; it only takes a few clicks.
      </p>

      <BaseButton className="place-self-center" onClick={() => setIsCreateProjectModalOpen(true)}>
        Create project
      </BaseButton>

      {isCreateProjectModalOpen && (
        <CreateProjectModal
          isOpen={isCreateProjectModalOpen}
          setIsOpen={setIsCreateProjectModalOpen}
        />
      )}
    </div>
  )
}
