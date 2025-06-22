'use client'

import { createColumnHelper } from '@tanstack/react-table'
import CategoryBadge from '@/components/app/CategoryBadge'
import DataTableCellAccount from '@/components/app/DataTable/DataTableCellAccount'
import DataTableCellDomainRating from '@/components/app/DataTable/DataTableCellDomainRating'
import DataTableCellLink from '@/components/app/DataTable/DataTableCellLink'
import DataTableCellLinkAttribute from '@/components/app/DataTable/DataTableCellLinkAttribute'
import DataTableCellName from '@/components/app/DataTable/DataTableCellName'
import DataTableCellPricing from '@/components/app/DataTable/DataTableCellPricing'
import DataTableWebsites from '@/components/app/DataTable/tables/DataTableWebsites'
import type { Directory } from '@/lib/db/schema/tables/directories'

const columnHelper = createColumnHelper<Directory>()

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
    cell: (info) => <DataTableCellDomainRating value={info.getValue()} withIcon={true} />,
    sortingFn: 'basic',
    size: 84,
    meta: {
      tooltip: 'Domain Rating (by Ahrefs). Updated weekly.',
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

export default function DataTableDirectories({ data }: { data: Array<Directory> }) {
  return <DataTableWebsites data={data} columns={columns} />
}
