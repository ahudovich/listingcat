'use client'

import { useId, useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { BaseAlert } from '@/components/ui/BaseAlert'
import { BaseButton } from '@/components/ui/BaseButton'
import { BaseInput } from '@/components/ui/BaseInput'
import { BaseModal } from '@/components/ui/BaseModal'
import { deleteProjectAction } from '@/lib/actions/projects'
import type { DeleteProjectFormResult } from '@/lib/actions/projects'
import type { Project } from '@/lib/db/schema/tables'
import type { DeleteProjectFormSchema } from '@/lib/forms/projects'

interface DeleteProjectModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  project: Project
}

export function DeleteProjectModal({ isOpen, setIsOpen, project }: DeleteProjectModalProps) {
  const id = useId()
  const router = useRouter()

  const [state, setState] = useState<DeleteProjectFormResult>({ status: 'idle' })
  const [isPending, startTransition] = useTransition()

  const form = useForm({
    defaultValues: {
      id: project.id,
      slug: project.slug,
      name: '',
    },
  })

  function onSubmit(data: DeleteProjectFormSchema) {
    startTransition(async () => {
      const response = await deleteProjectAction(data)

      startTransition(() => {
        if (response.status === 'success') {
          setIsOpen(false)
          router.replace('/app')
        } else {
          setState(response)
        }
      })
    })
  }

  return (
    <BaseModal
      title="Delete a Project"
      description="Are you sure you want to delete this project? This action cannot be undone."
      modal="trap-focus"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      {state.status === 'error' && (
        <BaseAlert className="mb-4" variant="destructive" aria-live="polite">
          <p>{state.error}</p>
        </BaseAlert>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Hidden fields to pass to the server */}
        <input {...form.register('id')} type="hidden" value={project.id} />
        <input {...form.register('slug')} type="hidden" value={project.slug} />

        <div className="mb-8">
          <Controller
            name="name"
            control={form.control}
            rules={{
              validate: (value) => {
                if (value !== project.name) {
                  return 'Project name does not match.'
                }
              },
            }}
            render={({ field }) => (
              <BaseInput
                {...field}
                id={`${id}-${field.name}`}
                label={`Type "${project.name}" to confirm deletion`}
                type="text"
                autoComplete="off"
                error={form.formState.errors.name?.message}
              />
            )}
          />
        </div>

        <div className="flex justify-end gap-3">
          <BaseButton
            className="min-w-28"
            variant="secondary"
            type="button"
            onClick={() => {
              setIsOpen(false)
              form.reset()
            }}
          >
            Cancel
          </BaseButton>

          <BaseButton
            className="min-w-28"
            type="submit"
            variant="destructive"
            isLoading={isPending}
            disabled={!form.formState.isValid || isPending}
          >
            Delete
          </BaseButton>
        </div>
      </form>
    </BaseModal>
  )
}
