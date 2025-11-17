import { pgEnum } from 'drizzle-orm/pg-core'
import { DirectoryType } from '../../../../enums/directory'
import { LinkAttributes } from '../../../../enums/link'
import { ProductCategories } from '../../../../enums/product'
import { SubmissionStatus, SubmissionType } from '../../../../enums/submission'

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
