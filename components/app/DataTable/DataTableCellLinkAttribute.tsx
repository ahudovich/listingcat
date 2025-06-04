import { Cancel01Icon, InformationCircleIcon, Tick02Icon } from '@hugeicons/core-free-icons'
import BaseIcon from '@/components/ui/BaseIcon'
import BaseTooltip from '@/components/ui/BaseTooltip'
import { LinkAttributes } from '@/enums/LinkAttributes.enum'

export default function DataTableCellLinkAttribute({
  value,
  linkAttributeNotes,
}: {
  value: LinkAttributes
  linkAttributeNotes: string | null
}) {
  function getText() {
    switch (value) {
      case LinkAttributes.Dofollow:
        return 'Yes'
      case LinkAttributes.Mixed:
        return 'Mixed'
      default:
        return 'No'
    }
  }

  return (
    <div className="flex items-center gap-1 capitalize">
      <BaseIcon
        className="shrink-0 size-4 text-secondary"
        icon={value ? Tick02Icon : Cancel01Icon}
        strokeWidth={2.5}
      />
      {getText()}
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
