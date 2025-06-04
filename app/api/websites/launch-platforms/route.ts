import { getDB, tables } from '@/lib/drizzle'
import type { LaunchPlatform } from '@/lib/db/schema/tables/launch-platforms'

export const revalidate = 86400 // 1 day in seconds

export async function GET() {
  const launchPlatforms: Array<LaunchPlatform> = await getDB().select().from(tables.launchPlatforms)
  return Response.json(launchPlatforms)
}
