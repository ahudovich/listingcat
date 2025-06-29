import { AlertDiamondIcon, ZapIcon } from '@hugeicons/core-free-icons'
import { UpgradeModal } from '@/components/modals/UpgradeModal'
import BaseButton from '@/components/ui/BaseButton'
import BaseIcon from '@/components/ui/BaseIcon'
import { cn } from '@/utils/css'

export default function SidebarUpgrade({ className }: { className?: string }) {
  return (
    <div className={cn('p-4 bg-white border border-zinc-200 rounded-lg', className)}>
      <p className="flex items-center gap-x-1.5 mb-1.5 font-semibold text-xs">
        <BaseIcon
          className="shrink-0 size-5 fill-current"
          icon={AlertDiamondIcon}
          strokeWidth={2}
        />
        Limited Access
      </p>

      <p className="mb-3 text-xs-relaxed">
        Upgrade to Pro version to get the most out of Listing Cat!
      </p>

      <UpgradeModal>
        <BaseButton className="w-full">
          <BaseIcon icon={ZapIcon} strokeWidth={2.5} />
          Upgrade
        </BaseButton>
      </UpgradeModal>
    </div>
  )
}
