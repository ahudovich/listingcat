import { pgEnum } from 'drizzle-orm/pg-core'
import { Benefits } from '../../../../enums/Benefits.enum'
import { DirectoryType } from '../../../../enums/DirectoryType.enum'
import { LinkAttributes } from '../../../../enums/LinkAttributes.enum'
import { ProductCategories } from '../../../../enums/ProductCategories.enum'

export const DB_ENUM_NAME_BENEFIT = 'benefit'

export const TABLE_NAMES = {
  LAUNCH_PLATFORMS: 'launch_platforms',
  DIRECTORIES: 'directories',
  TABLE_UPDATES: 'table_updates',
  SUBMISSIONS: 'submissions',
} as const

export type TableName = (typeof TABLE_NAMES)[keyof typeof TABLE_NAMES]

export const benefitEnum = pgEnum(DB_ENUM_NAME_BENEFIT, [Benefits.ProAccess])

export const directoryTypeEnum = pgEnum('directory_type', [
  DirectoryType.General,
  DirectoryType.Showcase,
  DirectoryType.Marketplace,
])

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
