'use client'

import { useState } from 'react'
import { DeleteProjectModal } from '@/components/modals/DeleteProjectModal'
import { BaseButton } from '@/components/ui/BaseButton'
import type { Project } from '@/lib/db/schema/tables'

export function SettingsProjectDelete({ project }: { project: Project }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <BaseButton
        className="min-w-24"
        size="sm"
        variant="destructive"
        onClick={() => setIsOpen(true)}
      >
        Delete project
      </BaseButton>

      {isOpen && <DeleteProjectModal isOpen={isOpen} setIsOpen={setIsOpen} project={project} />}
    </>
  )
}
