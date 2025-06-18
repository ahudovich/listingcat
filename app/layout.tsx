import '@/app/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="font-text text-secondary antialiased">{children}</body>
    </html>
  )
}
