import { defineConfig } from 'drizzle-kit'
import { env } from './env'

export default defineConfig({
  dialect: 'postgresql',
  out: './lib/db/migrations',
  schema: './lib/db/schema/**',
  casing: 'snake_case',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
