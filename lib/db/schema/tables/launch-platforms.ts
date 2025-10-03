import { relations } from 'drizzle-orm'
import { boolean, integer, pgTable, text, uuid } from 'drizzle-orm/pg-core'
import { domainRatings, linkAttributes, pricing, timestamps } from '../helpers/columns'
import { productCategoryEnum, TABLE_NAMES } from '../helpers/enums'
import { launchPlatformSubmissions } from './launch-platform-submissions'

export const launchPlatforms = pgTable(TABLE_NAMES.LAUNCH_PLATFORMS, {
  id: uuid().primaryKey().defaultRandom(),
  ...timestamps,
  name: text().unique().notNull(),
  websiteUrl: text().unique().notNull(),
  category: productCategoryEnum().notNull(),
  ...domainRatings,
  traffic: integer().notNull(),
  webAnalyticsUrl: text().unique(),
  ...pricing,
  ...linkAttributes,
  isAccountRequired: boolean().notNull(),
  submitUrl: text().unique(),
})

export const launchPlatformsRelations = relations(launchPlatforms, ({ many }) => ({
  submissions: many(launchPlatformSubmissions),
}))

export type LaunchPlatform = typeof launchPlatforms.$inferSelect
