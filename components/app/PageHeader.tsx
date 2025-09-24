import { cn } from '@/utils/css'

export function PageHeader({
  className,
  title,
  description,
}: {
  className?: string
  title: string
  description?: string
}) {
  return (
    <header className={cn('px-4 py-3 border-b border-b-zinc-200', className)}>
      <h1 className="font-display font-bold text-md text-primary">{title}</h1>
      {description && <p className="mt-1 text-xs-relaxed text-tertiary">{description}</p>}
    </header>
  )
}
