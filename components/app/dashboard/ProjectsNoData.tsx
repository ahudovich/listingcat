'use client'

import { useState } from 'react'
import { CreateProjectModal } from '@/components/modals/CreateProjectModal'
import { BaseButton } from '@/components/ui/BaseButton'

export function ProjectsNoData() {
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false)

  return (
    <div className="grid place-content-center p-12 h-full text-center">
      <h1 className="mb-2 font-display font-bold text-xl text-primary">
        You don&apos;t have any projects yet.
      </h1>

      <p className="mb-6 text-sm">
        Let&apos;s start by creating one. It&apos;s just a few clicks away.
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
