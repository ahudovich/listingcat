import { relations } from 'drizzle-orm'
import { pgTable, text, unique, uuid } from 'drizzle-orm/pg-core'
import { SubmissionStatus } from '../../../../enums/SubmissionStatus.enum'
import { timestamps } from '../helpers/columns'
import { submissionStatusEnum, submissionTypeEnum } from '../helpers/enums'
import { directories } from './directories'
import { projects } from './projects'

export const directorySubmissions = pgTable(
  'directory_submissions',
  {
    id: uuid().primaryKey().defaultRandom(),
    listingUrl: text(),
    status: submissionStatusEnum().notNull().default(SubmissionStatus.Pending),
    type: submissionTypeEnum().notNull(),
    ...timestamps,

    projectId: uuid()
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),

    directoryId: uuid()
      .notNull()
      .references(() => directories.id, { onDelete: 'cascade' }),
  },
  (table) => [
    // Project id and launch platform id must be unique for each submission
    unique('project_directory_unique').on(table.projectId, table.directoryId),
  ]
)

export const directorySubmissionsRelations = relations(directorySubmissions, ({ one }) => ({
  project: one(projects, {
    fields: [directorySubmissions.projectId],
    references: [projects.id],
  }),

  directory: one(directories, {
    fields: [directorySubmissions.directoryId],
    references: [directories.id],
  }),
}))

export type DirectorySubmission = typeof directorySubmissions.$inferSelect
