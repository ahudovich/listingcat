'use client'

import { Dialog } from '@base-ui-components/react/dialog'
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { BaseIcon } from '@/components/ui/BaseIcon'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'

interface BaseModalProps extends React.ComponentProps<typeof Dialog.Root> {
  title: string
  description: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  children: React.ReactNode
}

export function BaseModal({
  isOpen,
  setIsOpen,
  title,
  description,
  children,
  ...props
}: BaseModalProps) {
  useBodyScrollLock({ isOpen })

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen} {...props}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-modal grid place-items-center overflow-y-auto px-4 py-12 bg-zinc-800/25 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0">
          <Dialog.Popup
            className="relative max-w-110 w-full bg-white rounded-lg shadow-md outline-0"
            initialFocus={false}
          >
            <div className="px-4 pt-8 pb-4 text-center xs:px-8 xs:pb-6">
              <Dialog.Title className="mb-2 font-black text-xl text-primary">{title}</Dialog.Title>
              <Dialog.Description className="text-sm text-secondary text-balance">
                {description}
              </Dialog.Description>
            </div>

            {children}

            <Dialog.Close className="absolute right-4 top-4 p-1 cursor-pointer" aria-label="Close">
              <BaseIcon
                className="size-5 text-tertiary transition-colors hover:text-primary"
                icon={Cancel01Icon}
                strokeWidth={2.5}
              />
            </Dialog.Close>
          </Dialog.Popup>
        </Dialog.Backdrop>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
