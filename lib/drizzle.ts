import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '@/env'
import {
  accounts,
  sessions,
  users,
  usersRelations,
  verifications,
} from '@/lib/db/schema/tables/auth'
import { directories, directoriesRelations } from '@/lib/db/schema/tables/directories'
import {
  directorySubmissions,
  directorySubmissionsRelations,
} from '@/lib/db/schema/tables/directory-submissions'
import {
  launchPlatformSubmissions,
  launchPlatformSubmissionsRelations,
} from '@/lib/db/schema/tables/launch-platform-submissions'
import { launchPlatforms, launchPlatformsRelations } from '@/lib/db/schema/tables/launch-platforms'
import { projects, projectsRelations } from '@/lib/db/schema/tables/projects'
import { resourceRequests } from '@/lib/db/schema/tables/resource-requests'

export const tables = {
  accounts,
  directories,
  directoriesRelations,
  directorySubmissions,
  directorySubmissionsRelations,
  launchPlatforms,
  launchPlatformsRelations,
  launchPlatformSubmissions,
  launchPlatformSubmissionsRelations,
  projects,
  projectsRelations,
  sessions,
  resourceRequests,
  users,
  usersRelations,
  verifications,
}

export function getDB() {
  const client = postgres(env.DATABASE_URL, {
    prepare: false,
  })

  return drizzle({
    logger: env.NEXT_PUBLIC_ENV === 'development',
    client,
    casing: 'snake_case',
    schema: {
      ...tables,
    },
  })
}
