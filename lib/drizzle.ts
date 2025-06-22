import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '@/env'
import { accounts, sessions, users, verifications } from '@/lib/db/schema/tables/auth'
import { directories } from '@/lib/db/schema/tables/directories'
import { launchPlatforms } from '@/lib/db/schema/tables/launch-platforms'
import { marketplaces } from '@/lib/db/schema/tables/marketplaces'
import { showcases } from '@/lib/db/schema/tables/showcase'
import { specials } from '@/lib/db/schema/tables/specials'

export const tables = {
  directories,
  launchPlatforms,
  marketplaces,
  showcases,
  specials,
  users,
  sessions,
  accounts,
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
