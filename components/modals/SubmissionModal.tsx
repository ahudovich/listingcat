'use client'

import { useId, useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { BaseAlert } from '@/components/ui/BaseAlert'
import { BaseButton } from '@/components/ui/BaseButton'
import { BaseInput } from '@/components/ui/BaseInput'
import { BaseModal } from '@/components/ui/BaseModal'
import { BaseSelect, BaseSelectItem } from '@/components/ui/BaseSelect'
import { SubmissionKind } from '@/enums/SubmissionKind.enum'
import { SubmissionStatus } from '@/enums/SubmissionStatus.enum'
import { editSubmissionAction } from '@/lib/actions/submissions'
import { editSubmissionFormSchema } from '@/lib/forms/submissions'
import type { EditSubmissionFormResult } from '@/lib/actions/submissions'
import type { DirectorySubmission } from '@/lib/db/schema/tables/directory-submissions'
import type { LaunchPlatformSubmission } from '@/lib/db/schema/tables/launch-platform-submissions'
import type { EditSubmissionFormSchema } from '@/lib/forms/submissions'

const submissionStatusOptions = [
  { label: 'Select status', value: null },
  { label: 'Submitted', value: SubmissionStatus.Submitted },
  { label: 'Rejected', value: SubmissionStatus.Rejected },
  { label: 'Approved', value: SubmissionStatus.Approved },
]

interface SubmissionModalProps {
  kind: SubmissionKind
  resourceId: string
  submissions: Array<DirectorySubmission> | Array<LaunchPlatformSubmission>
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function SubmissionModal({
  kind,
  resourceId,
  submissions,
  isOpen,
  setIsOpen,
}: SubmissionModalProps) {
  const id = useId()
  const params = useParams()
  const projectSlug = params.projectSlug as string

  const [state, setState] = useState<EditSubmissionFormResult>({ status: 'idle' })
  const [isPending, startTransition] = useTransition()

  const form = useForm({
    resolver: zodResolver(editSubmissionFormSchema),
    defaultValues: {
      resourceId,
      projectSlug,
      kind,
      // Even if `submissions` is an array, we only have one submission per resource
      status: submissions[0]?.status ?? null,
      listingUrl: submissions[0]?.listingUrl ?? '',
    },
  })

  function onSubmit(data: EditSubmissionFormSchema) {
    startTransition(async () => {
      const response = await editSubmissionAction(data)

      startTransition(() => {
        if (response.status === 'success') {
          setIsOpen(false)
        } else {
          setState(response)
        }
      })
    })
  }

  return (
    <BaseModal
      title="Edit submission"
      description="You can update the submission details here."
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
        <div className="grid gap-4 mb-8">
          {/* Hidden fields to pass to the server */}
          <input {...form.register('resourceId')} type="hidden" value={resourceId} />
          <input {...form.register('kind')} type="hidden" value={kind} />
          <input {...form.register('projectSlug')} type="hidden" value={projectSlug} />

          {/* Status */}
          <Controller
            name="status"
            control={form.control}
            render={({ field }) => (
              <BaseSelect
                ref={field.ref}
                id={`${id}-${field.name}`}
                name={field.name}
                label="Status"
                items={submissionStatusOptions}
                modal={false}
                error={form.formState.errors.status?.message}
                value={field.value}
                onValueChange={field.onChange}
              >
                {submissionStatusOptions.map((option) => (
                  <BaseSelectItem key={option.label} label={option.label} value={option.value}>
                    {option.label}
                  </BaseSelectItem>
                ))}
              </BaseSelect>
            )}
          />

          {/* Listing URL */}
          {form.watch('status') === SubmissionStatus.Approved && (
            <Controller
              name="listingUrl"
              control={form.control}
              render={({ field }) => (
                <BaseInput
                  {...field}
                  id={`${id}-${field.name}`}
                  label="Listing URL"
                  type="text"
                  placeholder="https://openalternative.co/supabase"
                  autoComplete="off"
                  error={form.formState.errors.listingUrl?.message}
                />
              )}
            />
          )}
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
          Update
        </BaseButton>
      </form>
    </BaseModal>
  )
}
