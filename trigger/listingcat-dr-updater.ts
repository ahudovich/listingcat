import { logger, schedules, wait } from '@trigger.dev/sdk/v3'
import { sql } from 'drizzle-orm'
import { env } from '../env'
import { sendDiscordNotification } from '../lib/discord'
import { getDB, tables } from '../lib/drizzle'
import type { LaunchPlatform } from '../lib/db/schema/tables/launch-platforms'

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

interface Output {
  updatedCount: number
  skippedCount: number
  erroredCount: number
  totalCount: number
}

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

export const drUpdater = schedules.task({
  id: 'listingcat-dr-updater',
  cron: '0 12 * * 1', // Every week on Monday at 12:00 UTC
  machine: { preset: 'micro' },
  maxDuration: 300, // 5 mins

  onSuccess: async (payload, output: Output, { ctx }) => {
    // Send Discord notification with the results
    const reportMessage =
      `🔄 ** DR Update Report **\n\n` +
      `• Updated: ${output.updatedCount} records\n` +
      `• Skipped: ${output.skippedCount} records\n` +
      `• Errored: ${output.erroredCount} records\n` +
      `• Total processed: ${output.totalCount} records`

    await sendDiscordNotification({
      type: 'cron',
      message: reportMessage,
    })
  },

  run: async (payload, { ctx }) => {
    const db = getDB()

    // Get all launch platform URLs with current DR values
    const result = await db
      .select({
        dr: tables.launchPlatforms.dr,
        websiteUrl: tables.launchPlatforms.websiteUrl,
      })
      .from(tables.launchPlatforms)

    // Extract URLs into an array
    const urls = result.map((row) => row.websiteUrl)

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
        const currentRecord = result.find((row) => row.websiteUrl === drResult.url) as Pick<
          LaunchPlatform,
          'dr' | 'websiteUrl'
        >
        const currentDR = currentRecord.dr

        // Only update if DR has changed
        if (drResult.dr !== currentDR) {
          updatesToMake.push({
            url: drResult.url,
            newDR: drResult.dr,
          })
        } else {
          skippedCount++
          logger.log(`Skipping update for ${drResult.url}: DR unchanged (${drResult.dr})`)
        }
      } else {
        erroredCount++
        logger.log(`Skipping update for ${drResult.url}: DR is null`)
      }
    }

    // Perform bulk update if there are updates to make
    let updatedCount = 0

    if (updatesToMake.length > 0) {
      try {
        const updateValues = updatesToMake.map((update) => [update.url, update.newDR])

        await db.execute(sql`
          UPDATE launch_platforms
          SET dr = updates.new_dr::smallint, updated_at = NOW()
          FROM (VALUES ${sql.join(updateValues, sql`, `)}) AS updates(website_url, new_dr)
          WHERE launch_platforms.website_url = updates.website_url
        `)

        updatedCount = updatesToMake.length
      } catch (updateError: unknown) {
        logger.error('Failed to perform bulk update:', { updateError })
      }
    }

    // Log the results
    logger.log(
      `Updated ${updatedCount} records, skipped ${skippedCount} records (unchanged), errored ${erroredCount} records (errors) out of ${drResults.length} total`
    )

    return {
      updatedCount,
      skippedCount,
      erroredCount,
      totalCount: drResults.length,
    }
  },
})
