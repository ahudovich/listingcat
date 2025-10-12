'use client'

import { createColumnHelper } from '@tanstack/react-table'
import { CategoryBadge } from '@/components/app/CategoryBadge'
import { DataTableCellAccount } from '@/components/app/DataTable/DataTableCellAccount'
import { DataTableCellActions } from '@/components/app/DataTable/DataTableCellActions'
import { DataTableCellDomainRating } from '@/components/app/DataTable/DataTableCellDomainRating'
import { DataTableCellLinkAttribute } from '@/components/app/DataTable/DataTableCellLinkAttribute'
import { DataTableCellName } from '@/components/app/DataTable/DataTableCellName'
import { DataTableCellPricing } from '@/components/app/DataTable/DataTableCellPricing'
import { DataTableCellSubmission } from '@/components/app/DataTable/DataTableCellSubmission'
import { DataTableCellTraffic } from '@/components/app/DataTable/DataTableCellTraffic'
import { DataTableWebsites } from '@/components/app/DataTable/tables/DataTableWebsites'
import { SubmissionStatusBadge } from '@/components/app/SubmissionStatusBadge'
import { BaseCheckbox } from '@/components/ui/BaseCheckbox'
import { SubmissionKind } from '@/enums/SubmissionKind.enum'
import { SubmissionStatus } from '@/enums/SubmissionStatus.enum'
import { cn } from '@/utils/css'
import type { DirectoryWithSubmissions } from '@/types/tables'

const columnHelper = createColumnHelper<DirectoryWithSubmissions>()

const columns = [
  columnHelper.display({
    id: 'select',
    header: ({ table }) => (
      <BaseCheckbox
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomeRowsSelected()}
        onCheckedChange={(checked) => table.toggleAllRowsSelected(!!checked)}
      />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <BaseCheckbox
          checked={row.getIsSelected()}
          onCheckedChange={(checked) => row.toggleSelected(!!checked)}
        />
      </div>
    ),
    size: 18,
    enableSorting: false,
  }),

  columnHelper.accessor('name', {
    id: 'name',
    header: 'Name',
    cell: (info) => (
      <DataTableCellName name={info.getValue()} websiteUrl={info.row.original.websiteUrl} />
    ),
    sortingFn: 'alphanumeric',
  }),

  columnHelper.accessor((row) => row.submissions[0]?.status, {
    id: 'submissionStatus',
    header: 'Status',
    cell: (info) => (
      <div className="flex items-center">
        <SubmissionStatusBadge status={info.getValue() ?? SubmissionStatus.Pending} />
      </div>
    ),
    sortingFn: 'alphanumeric',
    filterFn: 'submissionStatusFilter',
  }),

  columnHelper.accessor('dr', {
    header: 'DR',
    cell: (info) => <DataTableCellDomainRating value={info.getValue()} />,
    sortingFn: 'basic',
    size: 84,
    meta: {
      tooltip: 'Domain Rating (by Ahrefs). Updated weekly',
    },
  }),

  columnHelper.accessor('traffic', {
    header: 'Traffic',
    cell: (info) => (
      <DataTableCellTraffic
        value={info.getValue()}
        webAnalyticsUrl={info.row.original.webAnalyticsUrl}
      />
    ),
    sortingFn: 'basic',
    size: 100,
    meta: {
      tooltip:
        'The estimated number of monthly visits from organic search (by Ahrefs). Updated weekly',
    },
  }),

  columnHelper.accessor('spamScore', {
    header: 'Spam Score',
    cell: (info) => (
      <div className={cn('', info.row.original.spamScore === -1 && 'text-faded')}>
        {info.row.original.spamScore !== -1 ? `${info.row.original.spamScore}%` : '--'}
      </div>
    ),
    sortingFn: 'basic',
    size: 130,
    meta: {
      tooltip:
        'Represents the percentage (0-100%) of sites with similar features that were penalized or banned by Google. The lower the score the better (by Moz.com)',
    },
  }),

  columnHelper.accessor('pricingModel', {
    header: 'Pricing',
    cell: (info) => (
      <DataTableCellPricing
        value={info.getValue()}
        pricingInfo={info.row.original.pricingInfo}
        pricingUrl={info.row.original.pricingUrl}
      />
    ),
    sortingFn: 'alphanumeric',
    filterFn: 'pricingModelFilter',
  }),

  columnHelper.accessor('category', {
    header: 'Category',
    cell: (info) => (
      <div className="flex items-center">
        <CategoryBadge category={info.getValue()} />
      </div>
    ),
    sortingFn: 'alphanumeric',
    filterFn: 'categoryFilter',
    meta: {
      tooltip: 'Accepted product types on this platform.',
    },
  }),

  columnHelper.accessor('linkAttribute', {
    header: 'Dofollow',
    cell: (info) => (
      <DataTableCellLinkAttribute
        value={info.getValue()}
        linkAttributeNotes={info.row.original.linkAttributeNotes}
      />
    ),
    enableSorting: false,
    filterFn: 'linkAttributeFilter',
    meta: {
      tooltip: 'Whether the platform gives you a dofollow link.',
    },
  }),

  columnHelper.accessor('isAccountRequired', {
    header: 'Account',
    cell: (info) => <DataTableCellAccount value={info.getValue()} />,
    enableSorting: false,
    meta: {
      tooltip: 'Whether the platform requires an account to submit your product.',
    },
  }),

  columnHelper.accessor('submitUrl', {
    header: 'Submission',
    cell: (info) => (
      <DataTableCellSubmission
        submitUrl={info.getValue()}
        notes={info.row.original.submissionNotes}
      />
    ),
    enableSorting: false,
  }),

  columnHelper.display({
    id: 'actions',
    cell: (info) => (
      <DataTableCellActions
        kind={SubmissionKind.Directory}
        resourceId={info.row.original.id}
        submissions={info.row.original.submissions}
      />
    ),
    enableSorting: false,
  }),
]

export function DataTableDirectories({ data }: { data: Array<DirectoryWithSubmissions> }) {
  return <DataTableWebsites data={data} columns={columns} />
}
