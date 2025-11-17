'use client'

import { SubmitResourceForm } from '@/components/forms/submit-resource'
import { BaseModal } from '@/components/ui/modal'

interface SubmitResourceModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function SubmitResourceModal({ isOpen, setIsOpen }: SubmitResourceModalProps) {
  return (
    <BaseModal
      title="Submit a Resource"
      description="You can submit anything related to marketing (directory, tool, service, course, book, etc)"
      modal="trap-focus"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <SubmitResourceForm />
    </BaseModal>
  )
}
