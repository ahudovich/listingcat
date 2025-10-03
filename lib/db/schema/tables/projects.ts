import { relations } from 'drizzle-orm'
import { pgTable, text, unique } from 'drizzle-orm/pg-core'
import { id, timestamps } from '../helpers/columns'
import { users } from './auth'

export const projects = pgTable(
  'projects',
  {
    ...id,
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
    // Project website URL must be unique for each user
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
