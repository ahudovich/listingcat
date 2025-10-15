import { tv } from 'tailwind-variants'
import { ProductCategories } from '@/enums/ProductCategories.enum'
import { cn } from '@/utils/css'
import type { ComponentProps } from 'react'
import type { VariantProps } from 'tailwind-variants'

const categoryBadgeVariants = tv({
  base: 'inline-block px-3 py-0.5 rounded-full font-semibold text-[0.625rem] leading-[0.875rem] tracking-[0.01rem] whitespace-nowrap uppercase',
  variants: {
    category: {
      [ProductCategories.AITools]: 'text-violet-800 bg-violet-100 border border-violet-600/50',
      [ProductCategories.Anything]: 'text-teal-800 bg-teal-100 border border-teal-600/50',
      [ProductCategories.Boilerplates]: 'text-yellow-800 bg-yellow-100 border border-yellow-600/50',
      [ProductCategories.DevTools]: 'text-blue-800 bg-blue-100 border border-blue-600/50',
      [ProductCategories.Directories]: 'text-orange-800 bg-orange-100 border border-orange-600/50',
      [ProductCategories.OpenSource]: 'text-zinc-800 bg-zinc-100 border border-zinc-600/50',
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

export function CategoryBadge({
  className,
  category,
}: CategoryBadgeProps & ComponentProps<'span'>) {
  return <span className={cn(categoryBadgeVariants({ category }), className)}>{category}</span>
}
