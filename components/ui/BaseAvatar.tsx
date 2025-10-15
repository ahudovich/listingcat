import { Avatar } from '@base-ui-components/react/avatar'
import { User03Icon } from '@hugeicons/core-free-icons'
import { tv } from 'tailwind-variants'
import { BaseIcon } from '@/components/ui/BaseIcon'
import type { VariantProps } from 'tailwind-variants'

const avatarVariants = tv({
  slots: {
    base: 'block',
    fallbackIcon: '',
  },
  variants: {
    size: {
      sm: {
        base: 'size-6',
        fallbackIcon: 'size-4',
      },
      md: {
        base: 'size-7',
        fallbackIcon: 'size-4.5',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

type AvatarVariants = VariantProps<typeof avatarVariants>

interface BaseAvatarProps {
  name: string
  className?: string
  src?: string
  size?: AvatarVariants['size']
}

export function BaseAvatar({ className, name, size, src, ...props }: BaseAvatarProps) {
  const { base, fallbackIcon } = avatarVariants({ size })

  return (
    <Avatar.Root className={base({ className })} {...props}>
      <Avatar.Image className="size-full object-cover rounded-full" src={src} alt={name} />
      <Avatar.Fallback className="grid place-content-center size-full bg-layout-separator/50 rounded-full text-tertiary">
        <BaseIcon className={fallbackIcon()} icon={User03Icon} />
      </Avatar.Fallback>
    </Avatar.Root>
  )
}
