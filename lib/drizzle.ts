import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '@/env'
import * as schema from '@/lib/db/schema/tables'

const client = postgres(env.DATABASE_URL, {
  prepare: false,
})

export const db = drizzle({
  logger: env.NEXT_PUBLIC_ENV === 'development',
  casing: 'snake_case',
  client,
  schema,
})
