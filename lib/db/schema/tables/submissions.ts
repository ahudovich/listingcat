import { integer, pgTable, text } from 'drizzle-orm/pg-core'
import { TABLE_NAMES } from '../helpers/enums'

export const submissions = pgTable(TABLE_NAMES.SUBMISSIONS, {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text(),
  websiteUrl: text().notNull(),
})

export type Submission = typeof submissions.$inferSelect
