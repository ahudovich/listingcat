'use client'

import { useId, useState, useTransition } from 'react'
import { useParams } from 'next/navigation'
import { revalidateLogic, useForm } from '@tanstack/react-form'
import { BaseAlert } from '@/components/ui/BaseAlert'
import { BaseButton } from '@/components/ui/BaseButton'
import { BaseInput } from '@/components/ui/BaseInput'
import { BaseModal } from '@/components/ui/BaseModal'
import { BaseSelect, BaseSelectItem } from '@/components/ui/BaseSelect'
import { SubmissionKind } from '@/enums/SubmissionKind.enum'
import { SubmissionState } from '@/enums/SubmissionState.enum'
import { editSubmissionAction } from '@/lib/actions/submissions'
import { editSubmissionSchema, getEditSubmissionFormOptions } from '@/lib/forms/submissions'
import type { EditSubmissionResult } from '@/lib/actions/submissions'
import type { DirectorySubmission } from '@/lib/db/schema/tables/directory-submissions'
import type { LaunchPlatformSubmission } from '@/lib/db/schema/tables/launch-platform-submissions'

const submissionStatusOptions = [
  { label: 'Select status', value: null },
  { label: 'Submitted', value: SubmissionState.Submitted },
  { label: 'Rejected', value: SubmissionState.Rejected },
  { label: 'Approved', value: SubmissionState.Approved },
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
  const projectSlug = params.projectSlug as string | undefined

  const [state, setState] = useState<EditSubmissionResult | null>(null)
  const [isPending, startTransition] = useTransition()

  const form = useForm({
    // Even if `submissions` is an array, we only have one submission per resource
    ...getEditSubmissionFormOptions(resourceId, projectSlug, kind, submissions[0]),
    validationLogic: revalidateLogic({
      mode: 'submit',
      modeAfterSubmission: 'change',
    }),
    validators: {
      onDynamic: editSubmissionSchema,
    },
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Trigger form validation
    await form.handleSubmit()

    // Only submit to server if form is valid
    if (form.state.canSubmit && !form.state.isPristine && !form.state.isDefaultValue) {
      startTransition(async () => {
        const formData = new FormData(event.target as HTMLFormElement)
        const response = await editSubmissionAction(formData)

        setState(response)
      })
    }
  }

  return (
    <BaseModal
      title="Edit submission"
      description="You can update the submission details here."
      modal="trap-focus"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="px-8 pb-10">
        {/* Error state */}
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
          // Success state
          <BaseAlert className="px-6 py-3 text-center" aria-live="polite">
            <p className="mb-2 font-semibold text-green-800">Submission updated successfully!</p>
            <BaseButton onClick={() => setIsOpen(false)}>Close</BaseButton>
          </BaseAlert>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Resource ID (hidden field) */}
            <form.Field name="resourceId">
              {(field) => (
                <input
                  id={`${id}-${field.name}`}
                  name={field.name}
                  type="hidden"
                  value={field.state.value}
                />
              )}
            </form.Field>

            {/* Kind (hidden field) */}
            <form.Field name="kind">
              {(field) => (
                <input
                  id={`${id}-${field.name}`}
                  name={field.name}
                  type="hidden"
                  value={field.state.value}
                />
              )}
            </form.Field>

            {/* Project slug (hidden field) */}
            <form.Field name="projectSlug">
              {(field) => (
                <input
                  id={`${id}-${field.name}`}
                  name={field.name}
                  type="hidden"
                  value={field.state.value}
                />
              )}
            </form.Field>

            {/* Status */}
            <div className="mb-4">
              <form.Field name="status">
                {(field) => (
                  <BaseSelect
                    id={`${id}-${field.name}`}
                    name={field.name}
                    label="Status"
                    items={submissionStatusOptions}
                    modal={false}
                    error={field.state.meta.errors[0]?.message}
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value as SubmissionState)}
                  >
                    {submissionStatusOptions.map((option) => (
                      <BaseSelectItem key={option.label} label={option.label} value={option.value}>
                        {option.label}
                      </BaseSelectItem>
                    ))}
                  </BaseSelect>
                )}
              </form.Field>
            </div>

            {/* Listing URL */}
            <div className="mb-8">
              <form.Field name="listingUrl">
                {(field) => (
                  <BaseInput
                    id={`${id}-${field.name}`}
                    name={field.name}
                    label="Listing URL"
                    type="text"
                    placeholder="https://openalternative.co/supabase"
                    autoComplete="off"
                    error={field.state.meta.errors[0]?.message}
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />
                )}
              </form.Field>
            </div>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isPristine, state.isDefaultValue]}
            >
              {([canSubmit, isPristine, isDefaultValue]) => (
                <BaseButton
                  className="w-full"
                  type="submit"
                  disabled={!canSubmit || isPristine || isDefaultValue}
                  isLoading={isPending}
                >
                  Update
                </BaseButton>
              )}
            </form.Subscribe>
          </form>
        )}
      </div>
    </BaseModal>
  )
}
