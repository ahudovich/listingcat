import { relations } from 'drizzle-orm'
import { pgTable, text, unique, uuid } from 'drizzle-orm/pg-core'
import { uuidv7 } from 'uuidv7'
import { SubmissionStatus } from '../../../../enums/submission'
import { timestamps } from '../helpers/columns'
import { submissionStatusEnum, submissionTypeEnum } from '../helpers/enums'
import { launchPlatforms } from './launch-platforms'
import { projects } from './projects'

export const launchPlatformSubmissions = pgTable(
  'launch_platform_submissions',
  {
    id: uuid()
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    listingUrl: text(),
    status: submissionStatusEnum().notNull().default(SubmissionStatus.Pending),
    type: submissionTypeEnum().notNull(),
    ...timestamps,

    projectId: uuid()
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),

    launchPlatformId: uuid()
      .notNull()
      .references(() => launchPlatforms.id, { onDelete: 'cascade' }),
  },
  (table) => [
    // Project id and launch platform id must be unique for each submission
    unique('project_launch_platform_unique').on(table.projectId, table.launchPlatformId),
  ]
)

export const launchPlatformSubmissionsRelations = relations(
  launchPlatformSubmissions,
  ({ one }) => ({
    project: one(projects, {
      fields: [launchPlatformSubmissions.projectId],
      references: [projects.id],
    }),

    launchPlatform: one(launchPlatforms, {
      fields: [launchPlatformSubmissions.launchPlatformId],
      references: [launchPlatforms.id],
    }),
  })
)

export type LaunchPlatformSubmission = typeof launchPlatformSubmissions.$inferSelect
