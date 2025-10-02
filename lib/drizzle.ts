import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '@/env'
import { accounts, sessions, users, verifications } from '@/lib/db/schema/tables/auth'
import { directories } from '@/lib/db/schema/tables/directories'
import { launchPlatforms } from '@/lib/db/schema/tables/launch-platforms'
import { projects } from '@/lib/db/schema/tables/projects'
import { resourceRequests } from '@/lib/db/schema/tables/resource-requests'
import { tableUpdates } from '@/lib/db/schema/tables/table-updates'

export const tables = {
  accounts,
  directories,
  launchPlatforms,
  projects,
  sessions,
  resourceRequests,
  tableUpdates,
  users,
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
