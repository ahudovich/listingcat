'use client'

import { Toaster as Sonner, ToasterProps } from 'sonner'

export function BaseToaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      toastOptions={{
        style: {
          color: '#fff',
          background: 'var(--color-accent)',
          fontFamily: 'var(--font-text)',
          fontSize: 'var(--text-xs-relaxed)',
          lineHeight: 'var(--text-xs-relaxed--line-height)',
        },
      }}
      {...props}
    />
  )
}
