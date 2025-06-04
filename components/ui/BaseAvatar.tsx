import { User03Icon } from '@hugeicons/core-free-icons'
import { Avatar } from 'radix-ui'
import { tv } from 'tailwind-variants'
import BaseIcon from '@/components/ui/BaseIcon'
import { cn } from '@/utils/css'
import type { VariantProps } from 'tailwind-variants'

const avatarVariants = tv({
  slots: {
    base: '',
    image: 'size-full object-cover rounded-full',
    fallback: 'grid place-content-center size-full bg-zinc-200 rounded-full text-tertiary',
    fallbackIcon: '',
  },
  variants: {
    size: {
      sm: {
        base: 'size-6',
        fallbackIcon: 'size-4',
      },
      md: {
        base: 'size-8',
        fallbackIcon: 'size-5',
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
  src: string
  className?: string
  size?: AvatarVariants['size']
}

export default function BaseAvatar({ className, size, src, name, ...props }: BaseAvatarProps) {
  const { base, image, fallback, fallbackIcon } = avatarVariants({ size })

  return (
    <Avatar.Root className={cn(base(), className)} {...props}>
      <Avatar.AvatarImage className={image()} src={src} alt={name} />
      <Avatar.AvatarFallback className={fallback()}>
        <BaseIcon className={fallbackIcon()} icon={User03Icon} />
      </Avatar.AvatarFallback>
    </Avatar.Root>
  )
}
