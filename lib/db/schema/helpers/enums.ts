import { pgEnum } from 'drizzle-orm/pg-core'
import { DirectoryType } from '../../../../enums/DirectoryType.enum'
import { LinkAttributes } from '../../../../enums/LinkAttributes.enum'
import { ProductCategories } from '../../../../enums/ProductCategories.enum'
import { SubmissionStatus } from '../../../../enums/SubmissionStatus.enum'
import { SubmissionType } from '../../../../enums/SubmissionType.enum'

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

export const submissionStatusEnum = pgEnum('submission_status', [
  SubmissionStatus.Pending,
  SubmissionStatus.Submitted,
  SubmissionStatus.Rejected,
  SubmissionStatus.Approved,
])

export const submissionTypeEnum = pgEnum('submission_type', [SubmissionType.User])
