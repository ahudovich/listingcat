import { useActionState, useId } from 'react'
import BaseButton from '@/components/ui/BaseButton'
import BaseInput from '@/components/ui/BaseInput'
import { submitResource } from '@/lib/actions/submissions'

export function SubmitResourceForm() {
  const id = useId()

  const [state, formAction, isPending] = useActionState(submitResource, null)

  return (
    <>
      {state && !state.success && (
        <p
          className="mb-4 px-3 py-2 bg-red-100 border border-red-300 rounded-control text-xs text-red-700"
          aria-live="polite"
        >
          {state.error ?? 'Something went wrong. Please try again.'}
        </p>
      )}

      {state && state.success && (
        <div
          className="px-6 py-3 bg-green-100 border border-green-300 rounded-control text-center"
          aria-live="polite"
        >
          <p className="mb-1 font-semibold text-green-800">Thanks for your submission!</p>
          <p className="text-xs text-green-700 text-balance">
            We&apos;ll review it soon and add it to our database if it&apos;s a good fit.
          </p>
        </div>
      )}

      {(!state || state.error) && (
        <form action={formAction}>
          <div className="mb-4">
            <BaseInput
              id={`${id}-name`}
              name="name"
              label="Name"
              type="text"
              placeholder="Open Alternative"
              autoComplete="off"
            />
          </div>

          <div className="mb-6">
            <BaseInput
              id={`${id}-website-url`}
              name="websiteUrl"
              label="Website or link"
              type="url"
              placeholder="https://openalternative.co"
              autoComplete="url"
              required={true}
            />
          </div>

          <BaseButton className="w-full" type="submit" isLoading={isPending} disabled={isPending}>
            Submit
          </BaseButton>
        </form>
      )}
    </>
  )
}
