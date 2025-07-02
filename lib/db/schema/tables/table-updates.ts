import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { TABLE_NAMES } from '../helpers/enums'

export const tableUpdates = pgTable(TABLE_NAMES.TABLE_UPDATES, {
  tableName: text().primaryKey(),
  updatedAt: timestamp({ withTimezone: true }),
})

export type TableUpdate = typeof tableUpdates.$inferSelect
