import { Metadata } from 'next'
import { CancelCircleIcon, CheckmarkCircle01Icon, SentIcon } from '@hugeicons/core-free-icons'
import { AppContentBody } from '@/components/app/layout/AppContent/AppContentBody'
import { AppContentHeader } from '@/components/app/layout/AppContent/AppContentHeader'
import { BaseIcon } from '@/components/ui/BaseIcon'
import { SubmissionStatus } from '@/enums/SubmissionStatus.enum'
import {
  getDirectoriesWithSubmissions,
  getLaunchPlatformsWithSubmissions,
  getProject,
  verifySession,
} from '@/lib/cached-functions'
import { cn } from '@/utils/css'
import type { IconSvgElement } from '@hugeicons/react'
import type { DirectoryWithSubmissions, LaunchPlatformWithSubmissions } from '@/types/tables'

export async function generateMetadata(
  props: PageProps<'/app/project/[projectSlug]'>
): Promise<Metadata> {
  const { session } = await verifySession()
  const { projectSlug } = await props.params

  const project = await getProject(session.user.id, projectSlug)

  return {
    title: project.name,
  }
}

export default async function ProjectPage(props: PageProps<'/app/project/[projectSlug]'>) {
  const { session } = await verifySession()
  const { projectSlug } = await props.params

  const project = await getProject(session.user.id, projectSlug)

  const [directories, launchPlatforms] = await Promise.all([
    getDirectoriesWithSubmissions(project.id),
    getLaunchPlatformsWithSubmissions(project.id),
  ])

  return (
    <>
      <AppContentHeader title={project.name} />

      <AppContentBody>
        <div className="grid gap-6">
          <Section title="Launch Platforms" data={launchPlatforms} />
          <Section title="Directories" data={directories} />
        </div>
      </AppContentBody>
    </>
  )
}

function Section({
  title,
  data,
}: {
  title: string
  data: Array<DirectoryWithSubmissions> | Array<LaunchPlatformWithSubmissions>
}) {
  const submittedCount = data.reduce(
    (acc, item) =>
      acc +
      item.submissions.filter((submission) => submission.status === SubmissionStatus.Submitted)
        .length,
    0
  )

  const rejectedCount = data.reduce(
    (acc, item) =>
      acc +
      item.submissions.filter((submission) => submission.status === SubmissionStatus.Rejected)
        .length,
    0
  )

  const approvedCount = data.reduce(
    (acc, item) =>
      acc +
      item.submissions.filter((submission) => submission.status === SubmissionStatus.Approved)
        .length,
    0
  )

  return (
    <section>
      <h2 className="mb-3 font-display font-bold text-primary">{title}</h2>

      <div className="grid grid-cols-3 gap-4">
        <SectionCard
          count={submittedCount}
          title="Submitted"
          variant={SubmissionStatus.Submitted}
        />
        <SectionCard count={rejectedCount} title="Rejected" variant={SubmissionStatus.Rejected} />
        <SectionCard count={approvedCount} title="Approved" variant={SubmissionStatus.Approved} />
      </div>
    </section>
  )
}

function SectionCard({
  count,
  title,
  variant,
}: {
  count: number
  title: string
  variant: SubmissionStatus
}) {
  const iconMap: Partial<Record<SubmissionStatus, { icon: IconSvgElement; className: string }>> = {
    [SubmissionStatus.Submitted]: {
      icon: SentIcon,
      className: 'text-blue-700',
    },
    [SubmissionStatus.Rejected]: {
      icon: CancelCircleIcon,
      className: 'text-red-700',
    },
    [SubmissionStatus.Approved]: {
      icon: CheckmarkCircle01Icon,
      className: 'text-green-700',
    },
  }

  return (
    <div className="p-4 bg-zinc-50/50 border border-layout-separator rounded-lg">
      <h3 className="mb-2 flex items-center gap-2 font-display font-medium text-sm">
        {iconMap[variant] && (
          <BaseIcon
            className={cn('shrink-0 size-4', iconMap[variant].className)}
            icon={iconMap[variant].icon}
            strokeWidth={2.25}
          />
        )}
        {title}
      </h3>

      <p className="font-medium text-xl">{count}</p>
    </div>
  )
}
