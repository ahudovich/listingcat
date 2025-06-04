import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { accounts, sessions, users, verifications } from '@/lib/db/schema/tables/auth'
import { directories } from '@/lib/db/schema/tables/directories'
import { launchPlatforms } from '@/lib/db/schema/tables/launch-platforms'
import { marketplaces } from '@/lib/db/schema/tables/marketplaces'
import { showcases } from '@/lib/db/schema/tables/showcase'
import type { Env } from '@/types/env'

export const tables = {
  directories,
  launchPlatforms,
  marketplaces,
  showcases,
  users,
  sessions,
  accounts,
  verifications,
}

export function getDB() {
  const client = postgres(process.env.DATABASE_URL, {
    prepare: false,
  })

  return drizzle({
    logger: (process.env.NEXT_PUBLIC_ENV as Env) === 'development',
    client,
    casing: 'snake_case',
    schema: {
      ...tables,
    },
  })
}
