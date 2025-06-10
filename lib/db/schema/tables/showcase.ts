import { boolean, integer, pgTable, text } from 'drizzle-orm/pg-core'
import { domainRatings, id, linkAttributes, pricing, timestamps } from '../helpers/columns'
import { productCategoryEnum, TABLE_NAMES } from '../helpers/enums'

export const showcases = pgTable(TABLE_NAMES.SHOWCASE, {
  ...id,
  ...timestamps,
  name: text().unique().notNull(),
  faviconUrl: text(),
  websiteUrl: text().unique().notNull(),
  category: productCategoryEnum().notNull(),
  categoryNotes: text(),
  ...domainRatings,
  traffic: integer().notNull(),
  webAnalyticsUrl: text().unique(),
  ...pricing,
  ...linkAttributes,
  isAccountRequired: boolean().notNull(),
  submitUrl: text().unique(),
})

export type Showcase = typeof showcases.$inferSelect
