import { unstable_cache } from 'next/cache'
import { max } from 'drizzle-orm'
import { getDB, tables } from '@/lib/drizzle'

export const getLastDatabaseUpdate = unstable_cache(
  async (): Promise<Date | null> => {
    const db = getDB()

    const result = await db
      .select({ updatedAt: max(tables.tableUpdates.updatedAt) })
      .from(tables.tableUpdates)

    return result[0]?.updatedAt || null
  },
  ['last-database-update'],
  {
    revalidate: 43_200, // 12 hours
  }
)
