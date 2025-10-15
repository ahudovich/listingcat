import 'server-only'
import { cookies } from 'next/headers'
import { COOKIE_TABLE_PAGE_SIZE } from '@/enums/constants'
import { DEFAULT_PAGE_SIZE, PageSize } from '@/enums/data-table'
import type { PageSizeType } from '@/enums/data-table'

export async function getInitialPageSize(): Promise<PageSizeType> {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(COOKIE_TABLE_PAGE_SIZE)

  if (!cookie) return DEFAULT_PAGE_SIZE

  const parsed = Number.parseInt(cookie.value)

  if (Object.values(PageSize).includes(parsed as PageSizeType)) {
    return parsed as PageSizeType
  }

  return DEFAULT_PAGE_SIZE
}
