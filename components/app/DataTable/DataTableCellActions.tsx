'use client'

import { useState } from 'react'
import { PencilEdit02Icon } from '@hugeicons/core-free-icons'
import { SubmissionModal } from '@/components/modals/SubmissionModal'
import { BaseIcon } from '@/components/ui/BaseIcon'
import { SubmissionKind } from '@/enums/SubmissionKind.enum'
import type { DirectorySubmission } from '@/lib/db/schema/tables/directory-submissions'
import type { LaunchPlatformSubmission } from '@/lib/db/schema/tables/launch-platform-submissions'

export function DataTableCellActions({
  kind,
  resourceId,
  submissions,
}: {
  kind: SubmissionKind
  resourceId: string
  submissions: Array<DirectorySubmission> | Array<LaunchPlatformSubmission>
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        className="flex items-center gap-1 text-secondary cursor-pointer select-none"
        onClick={() => setIsModalOpen(true)}
      >
        <BaseIcon
          className="shrink-0 size-4 text-secondary"
          icon={PencilEdit02Icon}
          strokeWidth={2.25}
        />
        <span className="font-medium text-xs text-secondary">Edit</span>
      </button>

      {isModalOpen && (
        <SubmissionModal
          kind={kind}
          resourceId={resourceId}
          submissions={submissions}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
      )}
    </>
  )
}
