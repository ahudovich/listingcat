'use client'

import { useId, useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BaseAlert } from '@/components/ui/alert'
import { BaseButton } from '@/components/ui/button'
import { BaseInput } from '@/components/ui/input'
import { toastManager } from '@/components/ui/toast'
import { updateProjectAction } from '@/lib/actions/projects'
import { updateProjectFormSchema } from '@/lib/forms/projects'
import type { UpdateProjectFormResult } from '@/lib/actions/projects'
import type { Project } from '@/lib/db/schema/tables'
import type { UpdateProjectFormSchema } from '@/lib/forms/projects'

export function UpdateProjectDetailsForm({
  className,
  project,
}: {
  className?: string
  project: Project
}) {
  const id = useId()

  const [state, setState] = useState<UpdateProjectFormResult>({ status: 'idle' })
  const [isPending, startTransition] = useTransition()

  const form = useForm({
    resolver: zodResolver(updateProjectFormSchema),
    defaultValues: {
      id: project.id,
      name: project.name,
      slug: project.slug,
      websiteUrl: project.websiteUrl,
    },
  })

  function onSubmit(data: UpdateProjectFormSchema) {
    startTransition(async () => {
      const response = await updateProjectAction(data)

      startTransition(() => {
        if (response.status === 'success') {
          toastManager.add({
            type: 'success',
            title: 'Done!',
            description: 'The project details have been updated successfully.',
          })
        } else {
          setState(response)
        }
      })
    })
  }

  return (
    <div className={className}>
      {state.status === 'error' && (
        <BaseAlert className="mb-4" variant="destructive" aria-live="polite">
          <p>{state.error}</p>
        </BaseAlert>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Hidden fields to pass to the server */}
        <input {...form.register('id')} type="hidden" value={project.id} />

        <div className="grid gap-4 mb-8">
          <Controller
            name="name"
            control={form.control}
            render={({ field }) => (
              <BaseInput
                {...field}
                id={`${id}-${field.name}`}
                label="Project name"
                size="sm"
                type="text"
                placeholder="Tesla"
                autoComplete="off"
                error={form.formState.errors.name?.message}
              />
            )}
          />

          <Controller
            name="slug"
            control={form.control}
            render={({ field }) => (
              <BaseInput
                {...field}
                id={`${id}-${field.name}`}
                label="Project slug"
                size="sm"
                type="text"
                disabled={true}
                placeholder="tesla"
                autoComplete="off"
                error={form.formState.errors.slug?.message}
              />
            )}
          />

          <Controller
            name="websiteUrl"
            control={form.control}
            render={({ field }) => (
              <BaseInput
                {...field}
                id={`${id}-${field.name}`}
                label="Project website (full URL)"
                size="sm"
                type="text"
                placeholder="https://tesla.com"
                autoComplete="off"
                error={form.formState.errors.websiteUrl?.message}
              />
            )}
          />
        </div>

        <div className="flex justify-end">
          <BaseButton
            className="min-w-24"
            type="submit"
            size="sm"
            isLoading={isPending}
            disabled={
              !form.formState.isDirty ||
              (form.formState.isSubmitted && !form.formState.isValid) ||
              isPending
            }
          >
            Save
          </BaseButton>
        </div>
      </form>
    </div>
  )
}
