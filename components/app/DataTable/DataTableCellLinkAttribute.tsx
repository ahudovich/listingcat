import {
  Cancel01Icon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
} from '@hugeicons/core-free-icons'
import BaseIcon from '@/components/ui/BaseIcon'
import BaseTooltip from '@/components/ui/BaseTooltip'
import { LinkAttributes } from '@/enums/LinkAttributes.enum'
import { cn } from '@/utils/css'

export default function DataTableCellLinkAttribute({
  value,
  linkAttributeNotes,
}: {
  value: LinkAttributes
  linkAttributeNotes: string | null
}) {
  const isDofollow = value === LinkAttributes.Dofollow

  return (
    <div className="flex items-center gap-1.5 capitalize">
      <div
        className={cn(
          'inline-flex items-center justify-center gap-1 px-2 py-0.5 min-w-24 rounded-full font-semibold text-[0.625rem] leading-[0.875rem] tracking-[0.01rem] whitespace-nowrap uppercase',
          isDofollow
            ? 'text-green-800 bg-green-100 border border-green-600/50'
            : 'text-red-800 bg-red-100 border border-red-600/50'
        )}
      >
        <BaseIcon
          className={cn('shrink-0 size-3', isDofollow ? 'text-green-700' : 'text-red-700')}
          icon={isDofollow ? CheckmarkCircle02Icon : Cancel01Icon}
          strokeWidth={2.5}
        />
        {isDofollow ? 'Dofollow' : 'NoFollow'}
      </div>

      {linkAttributeNotes && (
        <BaseTooltip className="max-w-56" text={linkAttributeNotes}>
          <BaseIcon
            className="size-3 text-faded cursor-help"
            icon={InformationCircleIcon}
            strokeWidth={2.5}
          />
        </BaseTooltip>
      )}
    </div>
  )
}
