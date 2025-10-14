'use client'

import { useId, useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { BaseAlert } from '@/components/ui/BaseAlert'
import { BaseButton } from '@/components/ui/BaseButton'
import { BaseInput } from '@/components/ui/BaseInput'
import { BaseModal } from '@/components/ui/BaseModal'
import { createProjectAction } from '@/lib/actions/projects'
import { createProjectFormSchema } from '@/lib/forms/projects'
import type { CreateProjectFormResult } from '@/lib/actions/projects'
import type { CreateProjectFormSchema } from '@/lib/forms/projects'

interface CreateProjectModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function CreateProjectModal({ isOpen, setIsOpen }: CreateProjectModalProps) {
  const id = useId()
  const router = useRouter()

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
        if (response.status === 'success') {
          setIsOpen(false)
          form.reset()
          router.push(`/app/project/${response.slug}`)
        } else {
          setState(response)
        }
      })
    })
  }

  return (
    <BaseModal
      title="Create a Project"
      description="Projects help you organize your submissions per each product."
      modal="trap-focus"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="px-8 pb-10">
        {state.status === 'error' && (
          <BaseAlert className="mb-4" variant="destructive" aria-live="polite">
            <p>{state.error}</p>
          </BaseAlert>
        )}

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
            isLoading={isPending}
            disabled={
              !form.formState.isDirty ||
              (form.formState.isSubmitted && !form.formState.isValid) ||
              isPending
            }
          >
            Create
          </BaseButton>
        </form>
      </div>
    </BaseModal>
  )
}
