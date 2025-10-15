'use client'

import { useId, useState, useTransition } from 'react'
import { useParams } from 'next/navigation'
import { Toggle } from '@base-ui-components/react/toggle'
import { Cancel01Icon, FilterIcon } from '@hugeicons/core-free-icons'
import { AnimatePresence, motion } from 'motion/react'
import { BaseButton } from '@/components/ui/BaseButton'
import { BaseIcon } from '@/components/ui/BaseIcon'
import { BaseSearch } from '@/components/ui/BaseSearch'
import { BaseSelect, BaseSelectItem } from '@/components/ui/BaseSelect'
import { BaseSpinner } from '@/components/ui/BaseSpinner'
import { toastManager } from '@/components/ui/BaseToast'
import { ProductCategories } from '@/enums/ProductCategories.enum'
import { SubmissionStatus } from '@/enums/SubmissionStatus.enum'
import { bulkUpdateSubmissionStatusAction } from '@/lib/actions/submissions'
import { cn } from '@/utils/css'
import type { ColumnFiltersState, Table } from '@tanstack/react-table'
import type { SubmissionKind } from '@/enums/SubmissionKind.enum'

interface DataTableFiltersProps<T> {
  className?: string
  table: Table<T>
  kind: SubmissionKind
  globalFilter: string
  setGlobalFilter: (value: string) => void
  columnFilters: ColumnFiltersState
  setColumnFilters: (filters: ColumnFiltersState) => void
}

const bulkActionOptions = [
  { label: 'Bulk Action', value: null },
  { label: 'Submitted', value: SubmissionStatus.Submitted },
  { label: 'Rejected', value: SubmissionStatus.Rejected },
  { label: 'Approved', value: SubmissionStatus.Approved },
]

const submissionStatusOptions = [
  { label: 'Status', value: null },
  { label: 'Pending', value: SubmissionStatus.Pending },
  { label: 'Submitted', value: SubmissionStatus.Submitted },
  { label: 'Rejected', value: SubmissionStatus.Rejected },
  { label: 'Approved', value: SubmissionStatus.Approved },
]

const pricingOptions = [
  { label: 'Pricing', value: null },
  { label: 'Free', value: 'free' },
  { label: 'Paid', value: 'paid' },
]

const categoryOptions = [
  { label: 'Category', value: null },
  { label: ProductCategories.Anything, value: ProductCategories.Anything },
  { label: ProductCategories.AITools, value: ProductCategories.AITools },
  { label: ProductCategories.Directories, value: ProductCategories.Directories },
  { label: ProductCategories.OpenSource, value: ProductCategories.OpenSource },
  { label: ProductCategories.DevTools, value: ProductCategories.DevTools },
  { label: ProductCategories.Boilerplates, value: ProductCategories.Boilerplates },
]

const linkAttributeOptions = [
  { label: 'Link Attribute', value: null },
  { label: 'Dofollow', value: 'dofollow' },
  { label: 'Nofollow', value: 'nofollow' },
]

export function DataTableFilters<T>({
  className,
  table,
  kind,
  globalFilter,
  setGlobalFilter,
  columnFilters,
  setColumnFilters,
}: DataTableFiltersProps<T>) {
  const id = useId()

  const params = useParams<{ projectSlug: string }>()
  const projectSlug = params.projectSlug

  const [isBulkActionPending, startBulkActionTransition] = useTransition()

  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [bulkStatus, setBulkStatus] = useState<SubmissionStatus | null>(null)

  // Get current filter values from column filters state
  const submissionStatusFilter = columnFilters.find(({ id }) => id === 'submissionStatus')
  const pricingFilter = columnFilters.find(({ id }) => id === 'pricingModel')
  const categoryFilter = columnFilters.find(({ id }) => id === 'category')
  const linkAttributeFilter = columnFilters.find(({ id }) => id === 'linkAttribute')

  const submissionStatus = (submissionStatusFilter?.value as SubmissionStatus) ?? null
  const pricing = (pricingFilter?.value as string) ?? null
  const category = (categoryFilter?.value as ProductCategories) ?? null
  const linkAttribute = (linkAttributeFilter?.value as string) ?? null

  const hasActiveFilters = columnFilters.length > 0

  // Helper function to update column filters
  function updateColumnFilter(columnId: string, value: string | null) {
    setColumnFilters(
      columnFilters
        .filter(({ id }) => id !== columnId)
        .concat(value ? [{ id: columnId, value }] : [])
    )
  }

  function resetFilters() {
    setGlobalFilter('')
    setColumnFilters([])
  }

  function handleBulkAction(value: SubmissionStatus | null) {
    setBulkStatus(value as SubmissionStatus | null)

    if (value) {
      startBulkActionTransition(async () => {
        const response = await bulkUpdateSubmissionStatusAction({
          itemsIds: table.getFilteredSelectedRowModel().rows.map((row) => row.id),
          kind,
          newStatus: value,
          projectSlug,
        })

        startBulkActionTransition(() => {
          if (response.status === 'success') {
            setBulkStatus(null)
            table.resetRowSelection()

            toastManager.add({
              type: 'success',
              title: 'Done!',
              description: 'The submission statuses have been updated successfully.',
            })
          }

          if (response.status === 'error') {
            toastManager.add({
              type: 'error',
              title: 'Oops!',
              description: response.error,
            })
          }
        })
      })
    }
  }

  return (
    <div className={cn('grid gap-3', className)}>
      <div className="flex flex-wrap items-center gap-3 [&>*:first-child]:grow sm:flex-nowrap sm:[&>*:first-child]:grow-0">
        <BaseSearch
          id={`${id}-search`}
          className="sm:w-66"
          placeholder="Search by name or website url"
          size="xs"
          value={globalFilter}
          onChange={(value) => setGlobalFilter(String(value))}
        />

        <div className="relative">
          <Toggle
            pressed={isFiltersOpen}
            onPressedChange={setIsFiltersOpen}
            aria-label="Filters"
            render={(props, state) => (
              <BaseButton
                className={cn('px-2 !rounded-control', state.pressed && 'bg-zinc-100')}
                size="xs"
                variant="outline"
                {...props}
              >
                <BaseIcon icon={FilterIcon} strokeWidth={2.5} />
                <span
                  className={cn(
                    'invisible opacity-0 absolute top-1.75 right-1.75 size-1.75 bg-emerald-600 rounded-full transition-all',
                    hasActiveFilters && 'visible opacity-100'
                  )}
                  aria-label="There are active filters"
                />
              </BaseButton>
            )}
          />
        </div>

        <BaseButton
          className={cn(
            'invisible opacity-0 px-2 !rounded-control transition-all sm:order-last sm:ml-auto sm:px-3',
            (globalFilter || columnFilters.length > 0) && 'visible opacity-100'
          )}
          size="xs"
          variant="outline"
          onClick={resetFilters}
        >
          <BaseIcon className="text-red-700 sm:hidden" icon={Cancel01Icon} strokeWidth={2.5} />
          <span className="hidden font-medium sm:inline">Reset</span>
        </BaseButton>

        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <BaseSelect
              id={`${id}-bulk-action`}
              className="grow sm:w-32"
              items={bulkActionOptions}
              modal={false}
              size="xs"
              disabled={isBulkActionPending}
              value={bulkStatus}
              onValueChange={(value) => handleBulkAction(value as SubmissionStatus | null)}
            >
              {bulkActionOptions.map((option) => (
                <BaseSelectItem key={option.value} label={option.label} value={option.value}>
                  {option.label}
                </BaseSelectItem>
              ))}
            </BaseSelect>

            {isBulkActionPending && <BaseSpinner />}
          </div>
        )}
      </div>

      <AnimatePresence initial={false}>
        {isFiltersOpen && (
          <motion.div
            key="filters"
            className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:flex"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            <BaseSelect
              id={`${id}-submission-status`}
              className="md:w-32"
              items={submissionStatusOptions}
              modal={false}
              size="xs"
              value={submissionStatus}
              onValueChange={(value) =>
                updateColumnFilter('submissionStatus', value as SubmissionStatus | null)
              }
            >
              {submissionStatusOptions.map((option) => (
                <BaseSelectItem key={option.value} label={option.label} value={option.value}>
                  {option.label}
                </BaseSelectItem>
              ))}
            </BaseSelect>

            <BaseSelect
              id={`${id}-pricing`}
              className="md:w-32"
              items={pricingOptions}
              modal={false}
              size="xs"
              value={pricing}
              onValueChange={(value) => updateColumnFilter('pricingModel', value as string | null)}
            >
              {pricingOptions.map((option) => (
                <BaseSelectItem key={option.value} label={option.label} value={option.value}>
                  {option.label}
                </BaseSelectItem>
              ))}
            </BaseSelect>

            <BaseSelect
              id={`${id}-category`}
              className="md:w-36"
              items={categoryOptions}
              modal={false}
              size="xs"
              value={category}
              onValueChange={(value) => updateColumnFilter('category', value as string | null)}
            >
              {categoryOptions.map((option) => (
                <BaseSelectItem key={option.value} label={option.label} value={option.value}>
                  {option.label}
                </BaseSelectItem>
              ))}
            </BaseSelect>

            <BaseSelect
              id={`${id}-link-attribute`}
              className="md:w-36"
              items={linkAttributeOptions}
              modal={false}
              size="xs"
              value={linkAttribute}
              onValueChange={(value) => updateColumnFilter('linkAttribute', value as string | null)}
            >
              {linkAttributeOptions.map((option) => (
                <BaseSelectItem key={option.value} label={option.label} value={option.value}>
                  {option.label}
                </BaseSelectItem>
              ))}
            </BaseSelect>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
