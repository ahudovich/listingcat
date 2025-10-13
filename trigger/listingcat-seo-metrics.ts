import { logger, schedules, wait } from '@trigger.dev/sdk/v3'
import { sql } from 'drizzle-orm'
import { ofetch } from 'ofetch'
import { env } from '../env'
import { directories } from '../lib/db/schema/tables/directories'
import { launchPlatforms } from '../lib/db/schema/tables/launch-platforms'
import { sendDiscordNotification } from '../lib/discord'
import { db } from '../lib/drizzle'

interface SeoApiResponse {
  success: boolean
  data: {
    domain: {
      domainRating: number
      domainRank: number
      backlinks: number
      refDomains: number
      traffic: number
      trafficValue: number
      organicKeywords: number
    }
  }
}

// 3 requests per second
const API_RATE_LIMIT_IN_SECONDS = 0.35

const TABLES_WITH_WEBSITE_URL = [
  { table: directories, name: 'Directories', sqlTableName: 'directories' },
  { table: launchPlatforms, name: 'Launch Platforms', sqlTableName: 'launch_platforms' },
] as const

type TableWithWebsiteUrl = (typeof TABLES_WITH_WEBSITE_URL)[number]

async function fetchSeoMetrics(
  websiteUrl: string
): Promise<{ dr: number | null; traffic: number | null } | null> {
  try {
    const response = await ofetch<SeoApiResponse>(`https://${env.RAPIDAPI_HOST}/url-metrics`, {
      headers: {
        'x-rapidapi-key': env.RAPIDAPI_KEY,
        'x-rapidapi-host': env.RAPIDAPI_HOST,
      },
      params: {
        url: websiteUrl,
      },
    })

    return {
      dr: response.data.domain.domainRating || null,
      traffic: response.data.domain.traffic || null,
    }
  } catch (error: unknown) {
    logger.error(`Error fetching SEO metrics for ${websiteUrl}:`, { error })
    return null
  }
}

async function logResultsUpdate({
  tableDef,
  label,
  updatedCount,
  skippedCount,
  erroredCount,
  totalCount,
}: {
  tableDef: TableWithWebsiteUrl
  label: string
  updatedCount: number
  skippedCount: number
  erroredCount: number
  totalCount: number
}) {
  // Send Discord notification for this table
  const reportMessage =
    `🔄 **${tableDef.name} ${label} Update Report**\n\n` +
    `• Updated: ${updatedCount} records\n` +
    `• Skipped: ${skippedCount} records (unchanged)\n` +
    `• Errored: ${erroredCount} records (API errors)\n` +
    `• Total processed: ${totalCount} records`

  await sendDiscordNotification({
    type: 'cron',
    message: reportMessage,
  })

  // Log the results
  logger.log(
    `Completed ${label} updates for table ${tableDef.sqlTableName}:\n` +
      `Updated: ${updatedCount}\n` +
      `Skipped: ${skippedCount}\n` +
      `Errored: ${erroredCount}\n` +
      `Total processed: ${totalCount}`
  )
}

async function updateDrValues(
  tableDef: TableWithWebsiteUrl,
  newSeoMetricResults: Array<{
    websiteUrl: string
    dr: number | null
  }>,
  oldSeoMetricResults: Array<{
    websiteUrl: string
    dr: number | null
  }>
): Promise<{
  updatedCount: number
  skippedCount: number
  erroredCount: number
} | null> {
  // Update database with new DR values (skip null values and unchanged values)
  const drUpdatesToMake = []

  let skippedCount = 0
  let erroredCount = 0

  for (const newSeoMetricResult of newSeoMetricResults) {
    if (newSeoMetricResult.dr !== null) {
      // Only update if DR has changed (round to integer since DB expects smallint)
      const newDR = Math.round(newSeoMetricResult.dr)
      const oldDR =
        oldSeoMetricResults.find(({ websiteUrl }) => websiteUrl === newSeoMetricResult.websiteUrl)
          ?.dr ?? null

      if (newDR !== oldDR) {
        drUpdatesToMake.push({
          websiteUrl: newSeoMetricResult.websiteUrl,
          newDR,
        })
      } else {
        skippedCount++
        logger.log(
          `Skipping DR update for ${newSeoMetricResult.websiteUrl}: DR unchanged (${newDR})`
        )
      }
    } else {
      erroredCount++
      logger.log(`Skipping DR update for ${newSeoMetricResult.websiteUrl}: DR is null (error)`)
    }
  }

  // Perform bulk update if there are updates to make
  let updatedCount = 0

  if (drUpdatesToMake.length > 0) {
    try {
      const updateValues = drUpdatesToMake.map(({ websiteUrl, newDR }) => [websiteUrl, newDR])

      await db.execute(sql`
        UPDATE ${sql.identifier(tableDef.sqlTableName)}
        SET dr = updates.new_dr::smallint, updated_at = NOW()
        FROM (VALUES ${sql.join(updateValues, sql`, `)}) AS updates(website_url, new_dr)
        WHERE ${sql.identifier(tableDef.sqlTableName)}.website_url = updates.website_url
      `)

      updatedCount = drUpdatesToMake.length

      logger.log(
        `Successfully updated DR values for ${updatedCount} records in table ${tableDef.sqlTableName}`
      )

      return {
        updatedCount,
        skippedCount,
        erroredCount,
      }
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

      return null
    }
  }

  return {
    updatedCount: 0,
    skippedCount: drUpdatesToMake.length,
    erroredCount: 0,
  }
}

async function updateTrafficValues(
  tableDef: TableWithWebsiteUrl,
  newSeoMetricResults: Array<{
    websiteUrl: string
    traffic: number | null
  }>,
  oldSeoMetricResults: Array<{
    websiteUrl: string
    traffic: number | null
  }>
): Promise<{
  updatedCount: number
  skippedCount: number
  erroredCount: number
} | null> {
  // Update database with new traffic values (skip null values and unchanged values)
  const trafficUpdatesToMake = []

  let skippedCount = 0
  let erroredCount = 0

  for (const newSeoMetricResult of newSeoMetricResults) {
    if (newSeoMetricResult.traffic !== null) {
      // Only update if DR has changed (round to integer since DB column is an integer)
      const newTraffic = Math.round(newSeoMetricResult.traffic)
      const oldTraffic =
        oldSeoMetricResults.find(({ websiteUrl }) => websiteUrl === newSeoMetricResult.websiteUrl)
          ?.traffic ?? null

      if (newTraffic !== oldTraffic) {
        trafficUpdatesToMake.push({
          websiteUrl: newSeoMetricResult.websiteUrl,
          newTraffic,
        })
      } else {
        skippedCount++
        logger.log(
          `Skipping traffic update for ${newSeoMetricResult.websiteUrl}: traffic unchanged (${newTraffic})`
        )
      }
    } else {
      erroredCount++
      logger.log(
        `Skipping traffic update for ${newSeoMetricResult.websiteUrl}: traffic is null (error)`
      )
    }
  }

  // Perform bulk update if there are updates to make
  let updatedCount = 0

  if (trafficUpdatesToMake.length > 0) {
    try {
      const updateValues = trafficUpdatesToMake.map(({ websiteUrl, newTraffic }) => [
        websiteUrl,
        newTraffic,
      ])

      await db.execute(sql`
        UPDATE ${sql.identifier(tableDef.sqlTableName)}
        SET traffic = updates.new_traffic::integer, updated_at = NOW()
        FROM (VALUES ${sql.join(updateValues, sql`, `)}) AS updates(website_url, new_traffic)
        WHERE ${sql.identifier(tableDef.sqlTableName)}.website_url = updates.website_url
      `)

      updatedCount = trafficUpdatesToMake.length

      logger.log(
        `Successfully updated traffic values for ${updatedCount} records in table ${tableDef.sqlTableName}`
      )

      return {
        updatedCount,
        skippedCount,
        erroredCount,
      }
    } catch (updateError: unknown) {
      logger.error(`Failed to perform bulk update for table ${tableDef.sqlTableName}:`, {
        updateError,
      })

      // Send Discord error notification
      const errorMessage =
        `❌ **${tableDef.name} Traffic Update FAILED**\n\n` +
        `Error occurred during bulk database update\n\n` +
        `Please check logs for detailed error information.`

      await sendDiscordNotification({
        type: 'cron',
        message: errorMessage,
      })

      return null
    }
  }

  return {
    updatedCount: 0,
    skippedCount: trafficUpdatesToMake.length,
    erroredCount: 0,
  }
}

async function processTable(tableDef: TableWithWebsiteUrl): Promise<void> {
  logger.log(`Starting SEO metrics update for table: ${tableDef.sqlTableName}`)

  // Get all URLs with current DR and traffic values for this table
  const oldSeoMetricResults = await db
    .select({
      dr: tableDef.table.dr,
      traffic: tableDef.table.traffic,
      websiteUrl: tableDef.table.websiteUrl,
    })
    .from(tableDef.table)

  // Extract URLs into an array
  const websiteUrls = oldSeoMetricResults.map((row) => row.websiteUrl)

  logger.log(`Found ${websiteUrls.length} URLs in table "${tableDef.sqlTableName}"`)

  // Fetch metrics for each URL with a delay
  const newSeoMetricResults: Array<{
    websiteUrl: string
    dr: number | null
    traffic: number | null
  }> = []

  for (const websiteUrl of websiteUrls) {
    const seoMetrics = await fetchSeoMetrics(websiteUrl)

    newSeoMetricResults.push({
      websiteUrl,
      dr: seoMetrics?.dr ?? null,
      traffic: seoMetrics?.traffic ?? null,
    })

    // Add delay between requests to respect API rate limit
    await wait.for({ seconds: API_RATE_LIMIT_IN_SECONDS })
  }

  const drUpdateResults = await updateDrValues(tableDef, newSeoMetricResults, oldSeoMetricResults)

  if (drUpdateResults) {
    await logResultsUpdate({
      tableDef,
      label: 'DR',
      erroredCount: drUpdateResults.erroredCount,
      updatedCount: drUpdateResults.updatedCount,
      skippedCount: drUpdateResults.skippedCount,
      totalCount: newSeoMetricResults.length,
    })
  }

  const trafficUpdateResults = await updateTrafficValues(
    tableDef,
    newSeoMetricResults,
    oldSeoMetricResults
  )

  if (trafficUpdateResults) {
    await logResultsUpdate({
      tableDef,
      label: 'Traffic',
      erroredCount: trafficUpdateResults.erroredCount,
      updatedCount: trafficUpdateResults.updatedCount,
      skippedCount: trafficUpdateResults.skippedCount,
      totalCount: newSeoMetricResults.length,
    })
  }
}

export const seoMetricsUpdater = schedules.task({
  id: 'listingcat-seo-metrics',
  cron: '0 08 * * 5', // Every week on Friday at 08:00 UTC
  machine: { preset: 'micro' },
  maxDuration: 3600, // 1 hour

  run: async () => {
    // Process each table one after another
    for (const tableDef of TABLES_WITH_WEBSITE_URL) {
      try {
        await processTable(tableDef)

        // Add a small delay between table updates
        await wait.for({ seconds: 1 })
      } catch (error: unknown) {
        logger.error(`Error processing table ${tableDef.sqlTableName}:`, { error })
      }
    }
  },
})
