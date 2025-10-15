import { smallint, text, timestamp } from 'drizzle-orm/pg-core'
import { linkAttributeEnum, pricingModelEnum } from './enums'

export const timestamps = {
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
}

export const domainRatings = {
  dr: smallint().notNull(),
}

export const linkAttributes = {
  linkAttribute: linkAttributeEnum().notNull(),
  linkAttributeNotes: text(),
}

export const pricing = {
  pricingModel: pricingModelEnum().notNull(),
  pricingInfo: text(),
  pricingUrl: text(),
}
