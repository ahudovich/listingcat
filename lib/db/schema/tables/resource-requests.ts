import { integer, pgTable, text } from 'drizzle-orm/pg-core'
import { TABLE_NAMES } from '../helpers/enums'

export const resourceRequests = pgTable(TABLE_NAMES.RESOURCE_REQUESTS, {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text(),
  websiteUrl: text().notNull(),
})

export type ResourceRequest = typeof resourceRequests.$inferSelect
