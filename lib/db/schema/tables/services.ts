import { pgTable, text } from 'drizzle-orm/pg-core'
import { id, timestamps } from '../helpers/columns'
import { TABLE_NAMES } from '../helpers/enums'

export const services = pgTable(TABLE_NAMES.SERVICES, {
  ...id,
  ...timestamps,
  name: text().unique().notNull(),
  shortDescription: text().notNull(),
  websiteUrl: text().unique().notNull(),
})

export type Service = typeof services.$inferSelect
