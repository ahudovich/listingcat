'use client'

import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { Dialog } from 'radix-ui'
import { BaseIcon } from '@/components/ui/BaseIcon'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { zIndexes } from '@/utils/z-indexes'

interface BaseModalProps {
  title: string
  description: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  children: React.ReactNode
}

export function BaseModal({ isOpen, setIsOpen, title, description, children }: BaseModalProps) {
  useBodyScrollLock({ isOpen })

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 grid place-items-center overflow-y-auto px-4 py-12 bg-zinc-800/25 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          style={{ zIndex: zIndexes.modal }}
        >
          <Dialog.Content
            className="relative max-w-110 w-full bg-white rounded-lg shadow-md outline-0"
            onOpenAutoFocus={(event) => event.preventDefault()}
          >
            <div className="px-4 pt-8 pb-4 text-center xs:px-8 xs:pb-6">
              <Dialog.Title className="mb-2 font-black text-xl text-primary">{title}</Dialog.Title>

              <Dialog.Description className="text-sm text-secondary text-balance">
                {description}
              </Dialog.Description>
            </div>

            {children}

            <Dialog.Close asChild>
              <button className="absolute right-4 top-4 p-1 cursor-pointer" aria-label="Close">
                <BaseIcon
                  className="size-5 text-tertiary transition-colors hover:text-primary"
                  icon={Cancel01Icon}
                  strokeWidth={2.5}
                />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
