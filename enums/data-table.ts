export const PageSize = {
  Small: 12,
  Medium: 24,
  Large: 48,
} as const

export const DEFAULT_PAGE_SIZE = PageSize.Medium

export type PageSizeType = (typeof PageSize)[keyof typeof PageSize]
