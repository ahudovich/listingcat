'use client'

import { createContext, useContext, useState } from 'react'

type SidebarContextType = {
  isSidebarOpen: boolean
  setIsSidebarOpen: (value: boolean) => void
}

export const SidebarContext = createContext<SidebarContextType | null>(null)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return <SidebarContext value={{ isSidebarOpen, setIsSidebarOpen }}>{children}</SidebarContext>
}

export function useSidebar() {
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider')
  }

  return context
}
