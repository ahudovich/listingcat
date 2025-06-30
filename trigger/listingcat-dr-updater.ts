import { logger, schedules, wait } from '@trigger.dev/sdk/v3'
import { sql } from 'drizzle-orm'
import { env } from '../env'
import { sendDiscordNotification } from '../lib/discord'
import { getDB, tables } from '../lib/drizzle'

interface DrApiResponse {
  url: string
  dr: number | null
}

interface DRAPIResponse {
  success: boolean
  data: {
    domainRating: number
    ahrefsRank: number
  }
}

const TABLES_WITH_WEBSITE_URL = [
  { table: tables.directories, name: 'Directories', sqlTableName: 'directories' },
  { table: tables.launchPlatforms, name: 'Launch Platforms', sqlTableName: 'launch_platforms' },
  { table: tables.marketplaces, name: 'Marketplaces', sqlTableName: 'marketplaces' },
  { table: tables.showcases, name: 'Showcases', sqlTableName: 'showcases' },
  { table: tables.specials, name: 'Specials', sqlTableName: 'specials' },
] as const

type TableWithWebsiteUrl = (typeof TABLES_WITH_WEBSITE_URL)[number]

async function fetchDomainRating(url: string): Promise<number | null> {
  const options = {
    method: 'POST',
    headers: {
      'x-rapidapi-key': env.RAPIDAPI_KEY,
      'x-rapidapi-host': env.RAPIDAPI_HOST,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  }

  try {
    const response = await fetch('https://ahrefs-dr-rank-checker.p.rapidapi.com/check', options)
    const result = (await response.json()) as DRAPIResponse

    return result.data.domainRating || null
  } catch (error: unknown) {
    logger.error(`Error fetching DR for ${url}:`, { error })
    return null
  }
}

async function processTableDRUpdates(tableDef: TableWithWebsiteUrl): Promise<void> {
  const db = getDB()

  logger.log(`Starting DR update for table: ${tableDef.sqlTableName}`)

  // Get all URLs with current DR values for this table
  const result = await db
    .select({
      dr: tableDef.table.dr,
      websiteUrl: tableDef.table.websiteUrl,
    })
    .from(tableDef.table)

  // Extract URLs into an array
  const urls = result.map((row) => row.websiteUrl)

  logger.log(`Found ${urls.length} URLs in table ${tableDef.sqlTableName}`)

  // Fetch DR for each URL with a delay
  const drResults: Array<DrApiResponse> = []

  for (const url of urls) {
    const dr = await fetchDomainRating(url)

    drResults.push({ url, dr })

    // Add delay between requests to respect API rate limit (500ms)
    await wait.for({ seconds: 0.5 })
  }

  // Update database with DR values (skip null values and unchanged values)
  const updatesToMake = []

  let skippedCount = 0
  let erroredCount = 0

  for (const drResult of drResults) {
    if (drResult.dr !== null) {
      // Find the current DR value for this URL
      const currentRecord = result.find((row) => row.websiteUrl === drResult.url)
      const currentDR = currentRecord?.dr

      // Only update if DR has changed (round to integer since DB expects smallint)
      const roundedDR = Math.round(drResult.dr)
      if (roundedDR !== currentDR) {
        updatesToMake.push({
          url: drResult.url,
          newDR: roundedDR,
        })
      } else {
        skippedCount++
        logger.log(`Skipping update for ${drResult.url}: DR unchanged (${drResult.dr})`)
      }
    } else {
      erroredCount++
      logger.log(`Skipping update for ${drResult.url}: DR is null (error)`)
    }
  }

  // Perform bulk update if there are updates to make
  let updatedCount = 0

  if (updatesToMake.length > 0) {
    try {
      const updateValues = updatesToMake.map((update) => [update.url, update.newDR])

      await db.execute(sql`
        UPDATE ${sql.identifier(tableDef.sqlTableName)}
        SET dr = updates.new_dr::smallint, updated_at = NOW()
        FROM (VALUES ${sql.join(updateValues, sql`, `)}) AS updates(website_url, new_dr)
        WHERE ${sql.identifier(tableDef.sqlTableName)}.website_url = updates.website_url
      `)

      updatedCount = updatesToMake.length
      logger.log(`Successfully updated ${updatedCount} records in table ${tableDef.sqlTableName}`)
    } catch (updateError: unknown) {
      logger.error(`Failed to perform bulk update for table ${tableDef.sqlTableName}:`, {
        updateError,
      })

      // Send Discord error notification
      const errorMessage =
        `❌ **${tableDef.name} DR Update FAILED**\n\n` +
        `Error occurred during bulk database update\n\n` +
        `Please check logs for detailed error information.`

      await sendDiscordNotification({
        type: 'cron',
        message: errorMessage,
      })

      return
    }
  }

  // Send Discord notification for this table
  const reportMessage =
    `🔄 **${tableDef.name} DR Update Report**\n\n` +
    `• Updated: ${updatedCount} records\n` +
    `• Skipped: ${skippedCount} records (unchanged)\n` +
    `• Errored: ${erroredCount} records (API errors)\n` +
    `• Total processed: ${drResults.length} records`

  await sendDiscordNotification({
    type: 'cron',
    message: reportMessage,
  })

  logger.log(
    `Completed table ${tableDef.sqlTableName}: Updated ${updatedCount}, skipped ${skippedCount}, errored ${erroredCount} out of ${drResults.length} total`
  )
}

export const drUpdater = schedules.task({
  id: 'listingcat-dr-updater',
  cron: '0 12 * * 1', // Every week on Monday at 12:00 UTC
  machine: { preset: 'micro' },
  maxDuration: 3600, // 1 hour

  run: async () => {
    // Process each table one after another
    for (const tableDef of TABLES_WITH_WEBSITE_URL) {
      try {
        await processTableDRUpdates(tableDef)

        // Add a small delay between tables to be respectful
        await wait.for({ seconds: 2 })
      } catch (error: unknown) {
        logger.error(`Error processing table ${tableDef.sqlTableName}:`, { error })
      }
    }
  },
})
