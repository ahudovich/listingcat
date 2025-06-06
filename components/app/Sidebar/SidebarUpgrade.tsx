'use client'

import { AlertDiamondIcon, ZapIcon } from '@hugeicons/core-free-icons'
import { ofetch } from 'ofetch'
import { toast } from 'sonner'
import BaseButton from '@/components/ui/BaseButton'
import BaseIcon from '@/components/ui/BaseIcon'
import { cn } from '@/utils/css'

export default function SidebarUpgrade({ className }: { className?: string }) {
  async function handleCheckout() {
    try {
      const { sessionUrl } = await ofetch<{ sessionUrl: string }>('/api/checkout/create-session')

      window.location.href = sessionUrl
    } catch (error: unknown) {
      toast.error('Failed to create checkout session', {
        position: 'top-center',
      })
    }
  }

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

      <BaseButton className="w-full" onClick={handleCheckout}>
        <BaseIcon icon={ZapIcon} strokeWidth={2.5} />
        Upgrade Now
      </BaseButton>
    </div>
  )
}
