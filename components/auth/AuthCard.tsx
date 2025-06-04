import type { ReactNode } from 'react'

export default function AuthCard({
  title,
  description,
  children,
}: {
  title: string
  children: ReactNode
  description?: ReactNode
}) {
  return (
    <div className="px-6 py-8 bg-white rounded-xl shadow-md md:px-10">
      <header className="mb-6 text-center">
        <h1 className="font-bold text-2xl text-primary">{title}</h1>
        {description && <p className="mt-2.5 text-xs">{description}</p>}
      </header>
      {children}
    </div>
  )
}
