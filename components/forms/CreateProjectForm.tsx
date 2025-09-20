'use client'

import { useActionState, useId } from 'react'
import Link from 'next/link'
import { ArrowRight02Icon } from '@hugeicons/core-free-icons'
import { revalidateLogic, useForm } from '@tanstack/react-form'
import { BaseButton } from '@/components/ui/BaseButton'
import { BaseIcon } from '@/components/ui/BaseIcon'
import { BaseInput } from '@/components/ui/BaseInput'
import { createProjectAction } from '@/lib/actions/projects'
import { createProjectFormOptions, createProjectSchema } from '@/lib/forms/options'

export function CreateProjectForm() {
  const id = useId()

  const [state, formAction] = useActionState(createProjectAction, null)

  const form = useForm({
    ...createProjectFormOptions,
    validationLogic: revalidateLogic({
      mode: 'submit',
      modeAfterSubmission: 'change',
    }),
  })

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (!form.state.canSubmit || form.state.isPristine) {
      event.preventDefault()
    }

    form.handleSubmit()
  }

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
        <form action={formAction} onSubmit={handleSubmit}>
          <div className="mb-4">
            <form.Field name="name" validators={{ onDynamic: createProjectSchema.shape.name }}>
              {(field) => (
                <>
                  <BaseInput
                    id={`${id}-${field.name}`}
                    name={field.name}
                    label="Project name"
                    type="text"
                    placeholder="Tesla"
                    autoComplete="off"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />

                  {!field.state.meta.isValid && (
                    <p className="mt-1 font-medium text-xs text-red-500" role="alert">
                      {field.state.meta.errors.map((error) => error?.message).join(', ')}
                    </p>
                  )}
                </>
              )}
            </form.Field>
          </div>

          <div className="mb-8">
            <form.Field
              name="websiteUrl"
              validators={{ onDynamic: createProjectSchema.shape.websiteUrl }}
            >
              {(field) => (
                <>
                  <BaseInput
                    id={`${id}-${field.name}`}
                    name={field.name}
                    label="Project website (full URL)"
                    type="text"
                    placeholder="https://tesla.com"
                    autoComplete="off"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />

                  {!field.state.meta.isValid && (
                    <p className="mt-1 font-medium text-xs text-red-500" role="alert">
                      {field.state.meta.errors.map((error) => error?.message).join(', ')}
                    </p>
                  )}
                </>
              )}
            </form.Field>
          </div>

          <form.Subscribe selector={(formState) => [formState.canSubmit, formState.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <BaseButton
                className="w-full"
                type="submit"
                disabled={!canSubmit}
                isLoading={isSubmitting}
              >
                Create
              </BaseButton>
            )}
          </form.Subscribe>
        </form>
      )}
    </>
  )
}
