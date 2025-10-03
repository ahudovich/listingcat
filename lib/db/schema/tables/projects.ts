import { relations } from 'drizzle-orm'
import { pgTable, text, unique, uuid } from 'drizzle-orm/pg-core'
import { timestamps } from '../helpers/columns'
import { users } from './auth'
import { directorySubmissions } from './directory-submissions'
import { launchPlatformSubmissions } from './launch-platform-submissions'

export const projects = pgTable(
  'projects',
  {
    id: uuid().primaryKey().defaultRandom(),
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

export const projectsRelations = relations(projects, ({ one, many }) => ({
  user: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
  directorySubmissions: many(directorySubmissions),
  launchPlatformSubmissions: many(launchPlatformSubmissions),
}))

export type Project = typeof projects.$inferSelect
