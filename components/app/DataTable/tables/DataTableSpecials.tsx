'use client'

import { createColumnHelper } from '@tanstack/react-table'
import CategoryBadge from '@/components/app/CategoryBadge'
import DataTableCellAccount from '@/components/app/DataTable/DataTableCellAccount'
import DataTableCellDomainRating from '@/components/app/DataTable/DataTableCellDomainRating'
import DataTableCellLink from '@/components/app/DataTable/DataTableCellLink'
import DataTableCellLinkAttribute from '@/components/app/DataTable/DataTableCellLinkAttribute'
import DataTableCellName from '@/components/app/DataTable/DataTableCellName'
import DataTableCellPricing from '@/components/app/DataTable/DataTableCellPricing'
import { DataTableCellTraffic } from '@/components/app/DataTable/DataTableCellTraffic'
import DataTableWebsites from '@/components/app/DataTable/tables/DataTableWebsites'
import type { Special } from '@/lib/db/schema/tables/specials'

const columnHelper = createColumnHelper<Special>()

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => (
      <DataTableCellName name={info.getValue()} websiteUrl={info.row.original.websiteUrl} />
    ),
    sortingFn: 'alphanumeric',
  }),

  columnHelper.accessor('dr', {
    header: 'DR',
    cell: (info) => <DataTableCellDomainRating value={info.getValue()} />,
    sortingFn: 'basic',
    size: 84,
    meta: {
      tooltip: 'Domain Rating (by Ahrefs). Updated weekly.',
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
        'The estimated number of monthly visits from organic search (by Ahrefs). Updated weekly.',
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
    cell: (info) => <CategoryBadge category={info.getValue()} />,
    sortingFn: 'alphanumeric',
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
    cell: (info) =>
      info.getValue() ? <DataTableCellLink value={info.getValue() as string} /> : '-',
    enableSorting: false,
  }),
]

export default function DataTableSpecials({ data }: { data: Array<Special> }) {
  return <DataTableWebsites data={data} columns={columns} />
}
