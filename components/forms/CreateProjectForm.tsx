'use client'

import { useId, useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight02Icon } from '@hugeicons/core-free-icons'
import { BaseAlert } from '@/components/ui/BaseAlert'
import { BaseButton } from '@/components/ui/BaseButton'
import { BaseIcon } from '@/components/ui/BaseIcon'
import { BaseInput } from '@/components/ui/BaseInput'
import { createProjectAction } from '@/lib/actions/projects'
import { createProjectFormSchema } from '@/lib/forms/projects'
import type { CreateProjectFormResult } from '@/lib/actions/projects'
import type { CreateProjectFormSchema } from '@/lib/forms/projects'

export function CreateProjectForm() {
  const id = useId()

  const [state, setState] = useState<CreateProjectFormResult>({ status: 'idle' })
  const [isPending, startTransition] = useTransition()

  const form = useForm({
    resolver: zodResolver(createProjectFormSchema),
    defaultValues: {
      name: '',
      websiteUrl: '',
    },
  })

  function onSubmit(data: CreateProjectFormSchema) {
    startTransition(async () => {
      const response = await createProjectAction(data)

      startTransition(() => {
        setState(response)
      })
    })
  }

  return (
    <>
      {state.status === 'error' && (
        <BaseAlert className="mb-4" variant="destructive" aria-live="polite">
          <p>{state.error}</p>
        </BaseAlert>
      )}

      {state.status === 'success' ? (
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field }) => (
                <BaseInput
                  {...field}
                  id={`${id}-${field.name}`}
                  label="Project name"
                  type="text"
                  placeholder="Tesla"
                  autoComplete="off"
                  error={form.formState.errors.name?.message}
                />
              )}
            />
          </div>

          <div className="mb-8">
            <Controller
              name="websiteUrl"
              control={form.control}
              render={({ field }) => (
                <BaseInput
                  {...field}
                  id={`${id}-${field.name}`}
                  label="Project website (full URL)"
                  type="text"
                  placeholder="https://tesla.com"
                  autoComplete="off"
                  error={form.formState.errors.websiteUrl?.message}
                />
              )}
            />
          </div>

          <BaseButton
            className="w-full"
            type="submit"
            disabled={
              !form.formState.isDirty ||
              (form.formState.isSubmitted && !form.formState.isValid) ||
              isPending
            }
            isLoading={isPending}
          >
            Create
          </BaseButton>
        </form>
      )}
    </>
  )
}
