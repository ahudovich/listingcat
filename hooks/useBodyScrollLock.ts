import { useEffect, useState } from 'react'
import { useLockBodyScroll } from 'react-use'
import type { RefObject } from 'react'

export function useBodyScrollLock({
  isOpen,
  rootRef,
}: {
  isOpen: boolean
  rootRef?: RefObject<HTMLElement> | null
}) {
  const [isLocked, toggleLocked] = useState(false)

  useLockBodyScroll(isLocked, rootRef ?? undefined)

  useEffect(() => {
    toggleLocked(isOpen)
  }, [isOpen])
}
