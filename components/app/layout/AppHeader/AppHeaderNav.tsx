'use client'

import { useParams } from 'next/navigation'
import { LinerIcon } from '@hugeicons/core-free-icons'
import { AppHeaderProjectSelector } from '@/components/app/layout/AppHeader/AppHeaderProjectSelector'
import { BaseIcon } from '@/components/ui/BaseIcon'
import type { Project } from '@/lib/db/schema/tables/projects'

export function AppHeaderNav({ projects }: { projects: Array<Project> }) {
  const params = useParams()
  const projectSlug = params.projectSlug as string | undefined

  if (!projectSlug) {
    return null
  }

  return (
    <>
      <BaseIcon
        className="shrink-0 -rotate-24 size-4 text-layout-separator"
        icon={LinerIcon}
        strokeWidth={1.5}
      />

      <AppHeaderProjectSelector projects={projects} projectSlug={projectSlug} />
    </>
  )
}
