import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { pgTable, text } from 'drizzle-orm/pg-core'
import { timestamps } from '../helpers/columns'
import { users } from './auth'

export const projects = pgTable('projects', {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text(),
  websiteUrl: text().notNull(),
  slug: text().notNull(),
  ...timestamps,
})

export const projectsRelations = relations(projects, ({ one }) => ({
  user: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
}))

export type Project = typeof projects.$inferSelect
