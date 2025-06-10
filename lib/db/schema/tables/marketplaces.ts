import { boolean, integer, pgTable, text } from 'drizzle-orm/pg-core'
import { domainRatings, id, linkAttributes, pricing, timestamps } from '../helpers/columns'
import { productCategoryEnum, TABLE_NAMES } from '../helpers/enums'

export const marketplaces = pgTable(TABLE_NAMES.MARKETPLACES, {
  ...id,
  ...timestamps,
  name: text().unique().notNull(),
  faviconUrl: text(),
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

export type Marketplace = typeof marketplaces.$inferSelect
