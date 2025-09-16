import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '@/env'
import { accounts, sessions, users, verifications } from '@/lib/db/schema/tables/auth'
import { directories } from '@/lib/db/schema/tables/directories'
import { launchPlatforms } from '@/lib/db/schema/tables/launch-platforms'
import { marketplaces } from '@/lib/db/schema/tables/marketplaces'
import { projects } from '@/lib/db/schema/tables/projects'
import { services } from '@/lib/db/schema/tables/services'
import { showcases } from '@/lib/db/schema/tables/showcase'
import { specials } from '@/lib/db/schema/tables/specials'
import { submissions } from '@/lib/db/schema/tables/submissions'
import { tableUpdates } from '@/lib/db/schema/tables/table-updates'

export const tables = {
  accounts,
  directories,
  launchPlatforms,
  marketplaces,
  projects,
  showcases,
  services,
  sessions,
  specials,
  submissions,
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
