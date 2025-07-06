'use client'

import { useEffect, useState } from 'react'
import { useLockBodyScroll } from 'react-use'
import { ArrowRight02Icon, Cancel01Icon, CheckmarkCircle03Icon } from '@hugeicons/core-free-icons'
import { isUndefined, omitBy } from 'lodash-es'
import posthog from 'posthog-js'
import { Dialog } from 'radix-ui'
import BaseButton from '@/components/ui/BaseButton'
import BaseIcon from '@/components/ui/BaseIcon'
import { EMAILS } from '@/data/emails'
import { PostHogEvents } from '@/enums/PostHogEvents.enum'
import { useCheckout } from '@/hooks/useCheckout'
import { zIndexes } from '@/utils/z-indexes'
import type { TableName } from '@/lib/db/schema/helpers/enums'

const features = [
  <>
    <strong className="font-bold">Unlimited lifetime</strong> access and updates
  </>,
  <>
    <strong className="font-bold">New resources</strong> added every week
  </>,
  <>
    <strong className="font-bold">Discount</strong> for our submission service{' '}
    <span className="text-muted">(soon)</span>
  </>,
  <>
    <strong className="font-bold">Discounts</strong> for paid directories{' '}
    <span className="text-muted">(soon)</span>
  </>,
  <>
    <strong className="font-bold">Places to sponsor</strong>{' '}
    <span className="text-muted">(coming soon)</span>
  </>,
  <>
    <strong className="font-bold">Subreddits</strong>{' '}
    <span className="text-muted">(coming soon)</span>
  </>,
  <>
    <strong className="font-bold">Newsletters</strong>{' '}
    <span className="text-muted">(coming soon)</span>
  </>,
  'And a lot more in the works!',
]

interface UpgradeModalProps {
  initiator: 'sidebar' | 'table_overlay'
  tableName?: TableName
  children?: React.ReactNode
}

export function UpgradeModal({ children, initiator, tableName }: UpgradeModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLocked, toggleLocked] = useState(false)

  const { checkoutError, handleCheckout } = useCheckout()

  useLockBodyScroll(isLocked)

  useEffect(() => {
    toggleLocked(isOpen)
  }, [isOpen])

  // Track upgrade modal events
  useEffect(() => {
    if (isOpen) {
      const eventProperties = {
        initiator,
        table_name: tableName,
      }

      posthog.capture(PostHogEvents.UpgradeModalOpened, omitBy(eventProperties, isUndefined))
    }
  }, [isOpen, initiator, tableName])

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      {children && <Dialog.Trigger asChild>{children}</Dialog.Trigger>}

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
              <Dialog.Title className="mb-2 font-black text-2xl text-primary">
                Listing Cat Pro
              </Dialog.Title>

              <Dialog.Description className="text-sm text-secondary text-balance">
                Unlock full access to our database.
              </Dialog.Description>

              {checkoutError && (
                <p className="mt-4 px-3 py-2.5 bg-red-50/75 border border-red-300 rounded-md text-xs text-red-700">
                  Something went wrong. Please try again or contact support at{' '}
                  <a className="underline" href={`mailto:${EMAILS.SUPPORT}`}>
                    {EMAILS.SUPPORT}
                  </a>
                </p>
              )}
            </div>

            <div className="px-4 py-5 bg-zinc-100 border-y border-zinc-200 text-center xs:px-8">
              <h3 className="mb-1.5 font-semibold text-md text-primary">🔥 Limited-time offer</h3>
              <p className="mb-2.5 text-xs text-secondary">
                Secure the best price before it goes up.
              </p>

              <div className="flex justify-center items-center gap-2">
                <span className="translate-y-2 font-normal text-xl text-muted line-through">
                  $79
                </span>
                <span className="font-extrabold text-5xl text-primary">$49</span>
                <span className="flex flex-col items-start">
                  <span className="mb-0.5 font-medium text-xs text-muted">USD</span>
                  <span className="px-2 py-1 bg-green-200 rounded-md font-semibold text-[11px] leading-none text-green-700">
                    Save $30
                  </span>
                </span>
              </div>
            </div>

            <div className="px-6 py-6 xs:px-10">
              <div className="mb-6 xs:mb-8">
                <ul className="space-y-1.5 text-[0.9375rem] text-secondary xs:text-sm">
                  {features.map((feature, index) => (
                    <li className="flex items-start gap-2" key={index}>
                      <BaseIcon
                        className="shrink-0 translate-y-0.75 size-4 text-current"
                        icon={CheckmarkCircle03Icon}
                        strokeWidth={2.5}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center">
                <BaseButton
                  className="group mb-3 w-full max-w-72"
                  size="lg"
                  onClick={handleCheckout}
                >
                  Unlock Full Access Now
                  <BaseIcon
                    className="group-hover:translate-x-1 transition-transform"
                    icon={ArrowRight02Icon}
                    strokeWidth={2.5}
                  />
                </BaseButton>

                <p className="font-medium text-xs text-secondary">Pay once, use forever!</p>
              </div>
            </div>

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
