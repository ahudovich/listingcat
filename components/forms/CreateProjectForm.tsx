import { useActionState, useId } from 'react'
import Link from 'next/link'
import { ArrowRight02Icon } from '@hugeicons/core-free-icons'
import { BaseButton } from '@/components/ui/BaseButton'
import { BaseIcon } from '@/components/ui/BaseIcon'
import { BaseInput } from '@/components/ui/BaseInput'
import { createProject } from '@/lib/actions/projects'

export function CreateProjectForm() {
  const id = useId()

  const [state, formAction, isPending] = useActionState(createProject, null)

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

      {state && state.success ? (
        <div
          className="px-6 py-3 bg-green-100 border border-green-300 rounded-control text-center"
          aria-live="polite"
        >
          <p className="mb-1 font-semibold text-green-800">Project created successfully!</p>
          <p className="mb-4 text-xs text-green-700 text-balance">
            You can now start submitting resources.
          </p>

          <BaseButton asChild>
            <Link href={`/app/project/${state.slug}`}>
              Go to project
              <BaseIcon
                className="text-current group-hover:translate-x-1 transition-transform"
                icon={ArrowRight02Icon}
                strokeWidth={2.5}
              />
            </Link>
          </BaseButton>
        </div>
      ) : (
        <form action={formAction}>
          <div className="mb-4">
            <BaseInput
              id={`${id}-name`}
              name="name"
              label="Project name"
              type="text"
              placeholder="Tesla"
              autoComplete="off"
              required={true}
            />
          </div>

          <div className="mb-8">
            <BaseInput
              id={`${id}-website-url`}
              name="websiteUrl"
              label="Project website (full URL)"
              type="url"
              placeholder="https://tesla.com"
              autoComplete="off"
              required={true}
            />
          </div>

          <BaseButton className="w-full" type="submit" isLoading={isPending} disabled={isPending}>
            Create
          </BaseButton>
        </form>
      )}
    </>
  )
}
