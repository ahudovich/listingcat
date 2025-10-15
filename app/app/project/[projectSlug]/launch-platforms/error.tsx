'use client'

import { useEffect, useState } from 'react'
import * as Sentry from '@sentry/nextjs'
import { BaseButton } from '@/components/ui/BaseButton'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <div className="p-4 max-w-md">
      <p className="mb-4 px-3 py-2.5 bg-red-50 border border-red-500 rounded-md text-xs text-red-800">
        Something went wrong while loading the data.
      </p>

      <BaseButton
        className="w-32"
        isLoading={isLoading}
        disabled={isLoading}
        onClick={() => {
          setIsLoading(true)
          reset()
        }}
      >
        Try again
      </BaseButton>
    </div>
  )
}
