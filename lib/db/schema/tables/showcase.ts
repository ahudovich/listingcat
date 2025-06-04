import { boolean, integer, pgTable, text } from 'drizzle-orm/pg-core'
import { domainRatings, id, linkAttributes, timestamps } from '../helpers/columns'
import { pricingModelEnum, productCategoryEnum, TABLE_NAMES } from '../helpers/enums'

export const showcases = pgTable(TABLE_NAMES.SHOWCASE, {
  ...id,
  ...timestamps,
  name: text().unique().notNull(),
  category: productCategoryEnum().notNull(),
  categoryNotes: text(),
  websiteUrl: text().unique().notNull(),
  ...domainRatings,
  traffic: integer().notNull(),
  webAnalyticsUrl: text().unique(),
  pricingModel: pricingModelEnum().notNull(),
  pricingInfo: text(),
  ...linkAttributes,
  isAccountRequired: boolean().notNull(),
  submitUrl: text().unique(),
})

export type Showcase = typeof showcases.$inferSelect
