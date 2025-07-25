import { logger, schedules, wait } from '@trigger.dev/sdk/v3'
import { sql } from 'drizzle-orm'
import { ofetch } from 'ofetch'
import { env } from '../env'
import { sendDiscordNotification } from '../lib/discord'
import { getDB, tables } from '../lib/drizzle'

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

const db = getDB()

const TABLES_WITH_WEBSITE_URL = [
  { table: tables.directories, name: 'Directories', sqlTableName: 'directories' },
  { table: tables.launchPlatforms, name: 'Launch Platforms', sqlTableName: 'launch_platforms' },
  { table: tables.marketplaces, name: 'Marketplaces', sqlTableName: 'marketplaces' },
  { table: tables.showcases, name: 'Showcases', sqlTableName: 'showcases' },
  { table: tables.specials, name: 'Specials', sqlTableName: 'specials' },
] as const

type TableWithWebsiteUrl = (typeof TABLES_WITH_WEBSITE_URL)[number]

async function fetchSeoMetrics(
  url: string
): Promise<{ dr: number | null; traffic: number | null } | null> {
  try {
    const response = await ofetch<SeoApiResponse>(`https://${env.RAPIDAPI_HOST}/url-metrics`, {
      headers: {
        'x-rapidapi-key': env.RAPIDAPI_KEY,
        'x-rapidapi-host': env.RAPIDAPI_HOST,
      },
      params: {
        url,
      },
    })

    return {
      dr: response.data.domain.domainRating || null,
      traffic: response.data.domain.traffic || null,
    }
  } catch (error: unknown) {
    logger.error(`Error fetching SEO metrics for ${url}:`, { error })
    return null
  }
}

async function logUpdateResults({
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
  seoMetricResults: Array<{
    url: string
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

  for (const seoMetricResult of seoMetricResults) {
    if (seoMetricResult.dr !== null) {
      const currentDR = seoMetricResult?.dr

      // Only update if DR has changed (round to integer since DB expects smallint)
      const roundedDR = Math.round(seoMetricResult.dr)

      if (roundedDR !== currentDR) {
        drUpdatesToMake.push({
          url: seoMetricResult.url,
          newDR: roundedDR,
        })
      } else {
        skippedCount++
        logger.log(
          `Skipping DR update for ${seoMetricResult.url}: DR unchanged (${seoMetricResult.dr})`
        )
      }
    } else {
      erroredCount++
      logger.log(`Skipping DR update for ${seoMetricResult.url}: DR is null (error)`)
    }
  }

  // Perform bulk update if there are updates to make
  let updatedCount = 0

  if (drUpdatesToMake.length > 0) {
    try {
      const updateValues = drUpdatesToMake.map((update) => [update.url, update.newDR])

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
  seoMetricResults: Array<{
    url: string
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

  for (const seoMetricResult of seoMetricResults) {
    if (seoMetricResult.traffic !== null) {
      const currentTraffic = seoMetricResult?.traffic

      // Only update if DR has changed (round to integer since DB column is an integer)
      const roundedTraffic = Math.round(seoMetricResult.traffic)

      if (roundedTraffic !== currentTraffic) {
        trafficUpdatesToMake.push({
          url: seoMetricResult.url,
          newTraffic: roundedTraffic,
        })
      } else {
        skippedCount++
        logger.log(
          `Skipping traffic update for ${seoMetricResult.url}: traffic unchanged (${seoMetricResult.traffic})`
        )
      }
    } else {
      erroredCount++
      logger.log(`Skipping traffic update for ${seoMetricResult.url}: traffic is null (error)`)
    }
  }

  // Perform bulk update if there are updates to make
  let updatedCount = 0

  if (trafficUpdatesToMake.length > 0) {
    try {
      const updateValues = trafficUpdatesToMake.map((update) => [update.url, update.newTraffic])

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

  // Get all URLs with current DR values for this table
  const result = await db
    .select({
      dr: tableDef.table.dr,
      traffic: tableDef.table.traffic,
      websiteUrl: tableDef.table.websiteUrl,
    })
    .from(tableDef.table)

  // Extract URLs into an array
  const urls = result.map((row) => row.websiteUrl)

  logger.log(`Found ${urls.length} URLs in table "${tableDef.sqlTableName}"`)

  // Fetch metrics for each URL with a delay
  const seoMetricResults: Array<{
    url: string
    dr: number | null
    traffic: number | null
  }> = []

  for (const url of urls) {
    const seoMetrics = await fetchSeoMetrics(url)

    seoMetricResults.push({
      url,
      dr: seoMetrics?.dr ?? null,
      traffic: seoMetrics?.traffic ?? null,
    })

    // Add delay between requests to respect API rate limit
    await wait.for({ seconds: API_RATE_LIMIT_IN_SECONDS })
  }

  const drUpdateResults = await updateDrValues(tableDef, seoMetricResults)

  if (drUpdateResults) {
    await logUpdateResults({
      tableDef,
      label: 'DR',
      erroredCount: drUpdateResults.erroredCount,
      updatedCount: drUpdateResults.updatedCount,
      skippedCount: drUpdateResults.skippedCount,
      totalCount: seoMetricResults.length,
    })
  }

  const trafficUpdateResults = await updateTrafficValues(tableDef, seoMetricResults)

  if (trafficUpdateResults) {
    await logUpdateResults({
      tableDef,
      label: 'Traffic',
      erroredCount: trafficUpdateResults.erroredCount,
      updatedCount: trafficUpdateResults.updatedCount,
      skippedCount: trafficUpdateResults.skippedCount,
      totalCount: seoMetricResults.length,
    })
  }
}

export const seoMetricsUpdater = schedules.task({
  id: 'listingcat-seo-metrics-updater',
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
