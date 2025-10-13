import { relations } from 'drizzle-orm'
import { boolean, integer, pgTable, smallint, text, uuid } from 'drizzle-orm/pg-core'
import { DirectoryType } from '../../../../enums/DirectoryType.enum'
import { domainRatings, linkAttributes, pricing, timestamps } from '../helpers/columns'
import { directoryTypeEnum, productCategoryEnum } from '../helpers/enums'
import { directorySubmissions } from './directory-submissions'

export const directories = pgTable('directories', {
  id: uuid().primaryKey().defaultRandom(),
  ...timestamps,
  name: text().unique().notNull(),
  websiteUrl: text().unique().notNull(),
  type: directoryTypeEnum().default(DirectoryType.General),
  category: productCategoryEnum().notNull(),
  categoryNotes: text(),
  ...domainRatings,
  traffic: integer().notNull(),
  spamScore: smallint(),
  webAnalyticsUrl: text().unique(),
  ...pricing,
  ...linkAttributes,
  isAccountRequired: boolean().notNull(),
  submitUrl: text().unique(),
  submissionNotes: text(),
})

export const directoriesRelations = relations(directories, ({ many }) => ({
  submissions: many(directorySubmissions),
}))

export type Directory = typeof directories.$inferSelect
