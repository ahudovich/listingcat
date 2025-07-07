import { max } from 'drizzle-orm'
import { getDB, tables } from '@/lib/drizzle'

export async function getLastDatabaseUpdate() {
  const db = getDB()

  const result = await db
    .select({ updatedAt: max(tables.tableUpdates.updatedAt) })
    .from(tables.tableUpdates)

  return result[0]?.updatedAt || null
}
