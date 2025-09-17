'use client'

import { CreateProjectForm } from '@/components/forms/CreateProjectForm'
import { BaseModal } from '@/components/ui/BaseModal'

interface CreateProjectModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function CreateProjectModal({ isOpen, setIsOpen }: CreateProjectModalProps) {
  return (
    <BaseModal
      title="Create a Project"
      description="Projects help you organize your submissions per each product."
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="px-8 pb-10">
        <CreateProjectForm />
      </div>
    </BaseModal>
  )
}
