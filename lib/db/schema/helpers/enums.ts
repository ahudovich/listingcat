import { pgEnum } from 'drizzle-orm/pg-core'
import { Benefits } from '../../../../enums/Benefits.enum'
import { LinkAttributes } from '../../../../enums/LinkAttributes.enum'
import { ProductCategories } from '../../../../enums/ProductCategories.enum'

export const DB_ENUM_NAME_BENEFIT = 'benefit'

export const TABLE_NAMES = {
  DIRECTORIES: 'directories',
  LAUNCH_PLATFORMS: 'launch_platforms',
  MARKETPLACES: 'marketplaces',
  SHOWCASES: 'showcases',
  SPECIALS: 'specials',
  TABLE_UPDATES: 'table_updates',
} as const

export type TableName = (typeof TABLE_NAMES)[keyof typeof TABLE_NAMES]

export const benefitEnum = pgEnum(DB_ENUM_NAME_BENEFIT, [Benefits.ProAccess])

export const productCategoryEnum = pgEnum('product_category', [
  ProductCategories.AITools,
  ProductCategories.Anything,
  ProductCategories.Boilerplates,
  ProductCategories.DevTools,
  ProductCategories.Directories,
  ProductCategories.OpenSource,
])

export const linkAttributeEnum = pgEnum('link_attribute', [
  LinkAttributes.Dofollow,
  LinkAttributes.Nofollow,
  LinkAttributes.Ugc,
  LinkAttributes.Sponsored,
  LinkAttributes.Dynamic,
  LinkAttributes.Mixed,
])

export const pricingModelEnum = pgEnum('pricing_model', ['free', 'paid', 'mixed'])
