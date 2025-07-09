'use client'

import { useState } from 'react'
import { SubmitResourceModal } from '@/components/modals/SubmitResourceModal'

export function FooterSubmitButton() {
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)

  return (
    <>
      <button
        className="cursor-pointer transition-colors hover:text-primary"
        onClick={() => setIsSubmitModalOpen(true)}
      >
        Submit resource
      </button>

      <SubmitResourceModal isOpen={isSubmitModalOpen} setIsOpen={setIsSubmitModalOpen} />
    </>
  )
}
