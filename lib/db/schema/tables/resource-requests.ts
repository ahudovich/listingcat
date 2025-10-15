import { integer, pgTable, text } from 'drizzle-orm/pg-core'

export const resourceRequests = pgTable('resource_requests', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text(),
  websiteUrl: text().notNull(),
})

export type ResourceRequest = typeof resourceRequests.$inferSelect
