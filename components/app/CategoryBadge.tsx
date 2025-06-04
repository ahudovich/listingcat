import { tv } from 'tailwind-variants'
import { ProductCategories } from '@/enums/ProductCategories.enum'
import { cn } from '@/utils/css'
import type { ComponentProps } from 'react'
import type { VariantProps } from 'tailwind-variants'

const categoryBadgeVariants = tv({
  base: 'inline-block px-2 py-0.5 rounded-md font-semibold text-[0.625rem] leading-[0.875rem] tracking-[0.01rem] uppercase',
  variants: {
    category: {
      [ProductCategories.AITools]: 'text-violet-800 bg-violet-200 border border-violet-500',
      [ProductCategories.Anything]: 'text-green-800 bg-green-200 border border-green-500',
      [ProductCategories.Boilerplates]: 'text-yellow-800 bg-yellow-200 border border-yellow-500',
      [ProductCategories.DevTools]: 'text-blue-800 bg-blue-200 border border-blue-500',
      [ProductCategories.Directories]: 'text-orange-800 bg-orange-200 border border-orange-500',
      [ProductCategories.OpenSource]: 'text-zinc-800 bg-zinc-200 border border-zinc-500',
    },
  },
  defaultVariants: {
    category: ProductCategories.Anything,
  },
})

type CategoryBadgeVariants = VariantProps<typeof categoryBadgeVariants>

interface CategoryBadgeProps {
  className?: string
  category: CategoryBadgeVariants['category']
}

export default function CategoryBadge({
  className,
  category,
}: CategoryBadgeProps & ComponentProps<'span'>) {
  return <span className={cn(categoryBadgeVariants({ category }), className)}>{category}</span>
}
