import { SquareUnlock02Icon } from '@hugeicons/core-free-icons'
import { UpgradeModal } from '@/components/modals/UpgradeModal'
import BaseButton from '@/components/ui/BaseButton'
import BaseIcon from '@/components/ui/BaseIcon'
import type { TableName } from '@/lib/db/schema/helpers/enums'

export function DataTableUpgradeOverlay({ tableName }: { tableName: TableName }) {
  return (
    <div className="px-8 py-8 bg-white text-center">
      <BaseIcon
        className="mb-3 mx-auto size-6 text-muted"
        icon={SquareUnlock02Icon}
        strokeWidth={2.25}
      />

      <h2 className="mb-2 font-extrabold text-xl text-primary">Unlock Full Access</h2>
      <p className="mb-4 text-sm text-tertiary">Get unlimited lifetime access to our database.</p>

      <UpgradeModal initiator="table-overlay" tableName={tableName}>
        <BaseButton className="group w-full max-w-72" size="lg">
          Upgrade
        </BaseButton>
      </UpgradeModal>
    </div>
  )
}
