import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { pgTable, text, unique } from 'drizzle-orm/pg-core'
import { timestamps } from '../helpers/columns'
import { users } from './auth'

export const projects = pgTable(
  'projects',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: text()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    name: text().notNull(),
    slug: text().notNull(),
    websiteUrl: text().notNull(),
    ...timestamps,
  },
  (table) => [
    // Project slugs must be unique for each user
    unique('user_slug_unique').on(table.userId, table.slug),
    // Projects website URLs must be unique for each user
    unique('user_website_url_unique').on(table.userId, table.websiteUrl),
  ]
)

export const projectsRelations = relations(projects, ({ one }) => ({
  user: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
}))

export type Project = typeof projects.$inferSelect
