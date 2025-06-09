import { boolean, integer, pgTable, text } from 'drizzle-orm/pg-core'
import { domainRatings, id, linkAttributes, pricing, timestamps } from '../helpers/columns'
import { productCategoryEnum, TABLE_NAMES } from '../helpers/enums'

export const launchPlatforms = pgTable(TABLE_NAMES.LAUNCH_PLATFORMS, {
  ...id,
  ...timestamps,
  name: text().unique().notNull(),
  category: productCategoryEnum().notNull(),
  websiteUrl: text().unique().notNull(),
  ...domainRatings,
  traffic: integer().notNull(),
  webAnalyticsUrl: text().unique(),
  ...pricing,
  ...linkAttributes,
  isAccountRequired: boolean().notNull(),
  submitUrl: text().unique(),
})

export type LaunchPlatform = typeof launchPlatforms.$inferSelect
