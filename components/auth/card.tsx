import { cn } from '@/utils/css'
import type { ReactNode } from 'react'

export function AuthCard({
  title,
  children,
  description,
  icon,
}: {
  title: string
  children?: ReactNode
  icon?: ReactNode
  description?: ReactNode
}) {
  return (
    <div className="px-6 py-8 bg-white rounded-xl shadow-md md:px-10">
      {icon && <div className="mb-6 text-center">{icon}</div>}

      <header className={cn('text-center', children && 'mb-6')}>
        <h1 className="font-bold text-2xl text-primary">{title}</h1>
        {description && <p className="mt-2.5 text-xs-relaxed">{description}</p>}
      </header>

      {children}
    </div>
  )
}
