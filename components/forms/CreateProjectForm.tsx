'use client'

import { useActionState, useId } from 'react'
import Link from 'next/link'
import { ArrowRight02Icon } from '@hugeicons/core-free-icons'
import { revalidateLogic, useForm } from '@tanstack/react-form'
import { BaseAlert } from '@/components/ui/BaseAlert'
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
        <BaseAlert className="mb-4" variant="destructive" aria-live="polite">
          {state.errors ? (
            <ul className="space-y-0.5 pl-4 list-disc list-outside">
              {state.errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          ) : (
            <p>Something went wrong. Please try again.</p>
          )}
        </BaseAlert>
      )}

      {state && state.success ? (
        <BaseAlert className="px-6 py-3 text-center" aria-live="polite">
          <p className="mb-1 font-semibold text-green-800">Project created successfully!</p>
          <p className="mb-4 text-xs text-green-700 text-balance">
            You can now start submitting resources.
          </p>

          <BaseButton render={<Link href={`/app/project/${state.slug}`} />}>
            Go to project
            <BaseIcon
              className="text-current group-hover:translate-x-1 transition-transform"
              icon={ArrowRight02Icon}
              strokeWidth={2.5}
            />
          </BaseButton>
        </BaseAlert>
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
                    error={field.state.meta.errors[0]?.message}
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
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
                    error={field.state.meta.errors[0]?.message}
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
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
