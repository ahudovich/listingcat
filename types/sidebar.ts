import type { IconSvgElement } from '@hugeicons/react'

export interface SidebarNavSection {
  label: string
  path: string
  children: Array<SidebarNavItem>
}

export interface SidebarNavItem {
  label: string
  path: string
  icon: IconSvgElement
}
