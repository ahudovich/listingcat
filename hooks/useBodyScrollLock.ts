import { useEffect, useState } from 'react'
import { useLockBodyScroll } from 'react-use'

export function useBodyScrollLock({ isOpen }: { isOpen: boolean }) {
  const [isLocked, toggleLocked] = useState(false)

  // TODO: Add ref handling
  useLockBodyScroll(isLocked)

  useEffect(() => {
    toggleLocked(isOpen)
  }, [isOpen])
}
