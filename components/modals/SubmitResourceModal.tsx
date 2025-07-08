'use client'

import { SubmitResourceForm } from '@/components/forms/SubmitResourceForm'
import { BaseModal } from '@/components/ui/BaseModal'

interface SubmitResourceModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function SubmitResourceModal({ isOpen, setIsOpen }: SubmitResourceModalProps) {
  return (
    <BaseModal
      title="Submit a Resource"
      description="You can submit anything related to marketing (directory, tool, service, course, book, etc)"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="px-8 pb-10">
        <SubmitResourceForm />
      </div>
    </BaseModal>
  )
}
