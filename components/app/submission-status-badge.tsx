import { tv } from 'tailwind-variants'
import { SubmissionStatus } from '@/enums/submission'
import { cn } from '@/utils/css'
import type { ComponentProps } from 'react'
import type { VariantProps } from 'tailwind-variants'

const submissionStatusBadgeVariants = tv({
  base: 'inline-block px-3 py-0.5 rounded-full font-semibold text-[0.625rem] leading-[0.875rem] tracking-[0.01rem] whitespace-nowrap uppercase',
  variants: {
    status: {
      [SubmissionStatus.Pending]: 'text-zinc-800 bg-zinc-100 border border-zinc-600/50',
      [SubmissionStatus.Submitted]: 'text-blue-800 bg-blue-100 border border-blue-600/50',
      [SubmissionStatus.Rejected]: 'text-red-800 bg-red-100 border border-red-600/50',
      [SubmissionStatus.Approved]: 'text-green-800 bg-green-100 border border-green-600/50',
    },
  },
  defaultVariants: {
    status: SubmissionStatus.Pending,
  },
})

type SubmissionStatusBadgeVariants = VariantProps<typeof submissionStatusBadgeVariants>

interface SubmissionStatusBadgeProps {
  className?: string
  status?: SubmissionStatusBadgeVariants['status']
}

export function SubmissionStatusBadge({
  className,
  status,
}: SubmissionStatusBadgeProps & ComponentProps<'span'>) {
  return <span className={cn(submissionStatusBadgeVariants({ status }), className)}>{status}</span>
}
