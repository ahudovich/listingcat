import { logger, schedules, wait } from '@trigger.dev/sdk/v3'
import { sql } from 'drizzle-orm'
import { ofetch } from 'ofetch'
import { env } from '../env'
import { sendDiscordNotification } from '../lib/discord'
import { getDB, tables } from '../lib/drizzle'

interface MozApiResponse {
  domain_authority: string
  external_nofollow_urls_to_url: string
  external_urls_to_url: string
  page_authority: string
  spam_score: string
}

// 1000 requests per hour
const API_RATE_LIMIT_IN_SECONDS = 0.25

const db = getDB()

const TABLES_WITH_WEBSITE_URL = [
  { table: tables.directories, name: 'Directories', sqlTableName: 'directories' },
] as const

type TableWithWebsiteUrl = (typeof TABLES_WITH_WEBSITE_URL)[number]

async function fetchMetrics(url: string): Promise<{ spamScore: number | null } | null> {
  try {
    // Response is JSON string
    const response = await ofetch<string>('https://moz-da-pa-low-cost.p.rapidapi.com/v2/getDaPa', {
      method: 'POST',
      headers: {
        'x-rapidapi-key': env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'moz-da-pa-low-cost.p.rapidapi.com',
      },
      body: {
        q: url,
        key: '8b2ebeafe6e0e5b4238824831af5c466',
      },
    })

    const jsonResponse = JSON.parse(response) as MozApiResponse

    const spamScore = jsonResponse?.spam_score ?? null

    if (spamScore) {
      return {
        spamScore: Number(spamScore),
      }
    }

    return null
  } catch (error: unknown) {
    logger.error(`Error fetching metrics for ${url}:`, { error })
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

async function updateSpamScoreValues(
  tableDef: TableWithWebsiteUrl,
  newMetricsResults: Array<{
    websiteUrl: string
    spamScore: number | null
  }>,
  oldMetricsResults: Array<{
    websiteUrl: string
    spamScore: number | null
  }>
): Promise<{
  updatedCount: number
  skippedCount: number
  erroredCount: number
} | null> {
  // Update database with new Spam Score values (skip null values and unchanged values)
  const spamScoreUpdatesToMake = []

  let skippedCount = 0
  let erroredCount = 0

  for (const newMetricResult of newMetricsResults) {
    if (newMetricResult.spamScore !== null) {
      const newSpamScore = newMetricResult.spamScore
      const oldSpamScore =
        oldMetricsResults.find(({ websiteUrl }) => websiteUrl === newMetricResult.websiteUrl)
          ?.spamScore ?? null

      if (newSpamScore !== oldSpamScore) {
        spamScoreUpdatesToMake.push({
          url: newMetricResult.websiteUrl,
          newSpamScore: newMetricResult.spamScore,
        })
      } else {
        skippedCount++
        logger.log(
          `Skipping Spam Score update for ${newMetricResult.websiteUrl}: Spam Score unchanged (${newMetricResult.spamScore})`
        )
      }
    } else {
      erroredCount++
      logger.log(
        `Skipping Spam Score update for ${newMetricResult.websiteUrl}: spam_score is null (error)`
      )
    }
  }

  // Perform bulk update if there are updates to make
  let updatedCount = 0

  if (spamScoreUpdatesToMake.length > 0) {
    try {
      const updateValues = spamScoreUpdatesToMake.map((update) => [update.url, update.newSpamScore])

      await db.execute(sql`
        UPDATE ${sql.identifier(tableDef.sqlTableName)}
        SET spam_score = updates.new_spam_score::smallint, updated_at = NOW()
        FROM (VALUES ${sql.join(updateValues, sql`, `)}) AS updates(website_url, new_spam_score)
        WHERE ${sql.identifier(tableDef.sqlTableName)}.website_url = updates.website_url
      `)

      updatedCount = spamScoreUpdatesToMake.length

      logger.log(
        `Successfully updated Spam Score values for ${updatedCount} records in table ${tableDef.sqlTableName}`
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
        `❌ **${tableDef.name} Spam Score Update FAILED**\n\n` +
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
    skippedCount: spamScoreUpdatesToMake.length,
    erroredCount: 0,
  }
}

async function processTable(tableDef: TableWithWebsiteUrl): Promise<void> {
  logger.log(`Starting metrics update for table: ${tableDef.sqlTableName}`)

  // Get all URLs with current Spam Score values for this table
  const oldMetricResults = await db
    .select({
      spamScore: tableDef.table.spamScore,
      websiteUrl: tableDef.table.websiteUrl,
    })
    .from(tableDef.table)

  // Extract URLs into an array
  const websiteUrls = oldMetricResults.map((row) => row.websiteUrl)

  logger.log(`Found ${websiteUrls.length} URLs in table "${tableDef.sqlTableName}"`)

  // Fetch metrics for each URL with a delay
  const newMetricResults: Array<{
    websiteUrl: string
    spamScore: number | null
  }> = []

  for (const websiteUrl of websiteUrls) {
    const metrics = await fetchMetrics(websiteUrl)

    newMetricResults.push({
      websiteUrl,
      spamScore: metrics?.spamScore ?? null,
    })

    // Add delay between requests to respect API rate limit
    await wait.for({ seconds: API_RATE_LIMIT_IN_SECONDS })
  }

  const spamScoreUpdateResults = await updateSpamScoreValues(
    tableDef,
    newMetricResults,
    oldMetricResults
  )

  if (spamScoreUpdateResults) {
    await logUpdateResults({
      tableDef,
      label: 'Spam Score',
      erroredCount: spamScoreUpdateResults.erroredCount,
      updatedCount: spamScoreUpdateResults.updatedCount,
      skippedCount: spamScoreUpdateResults.skippedCount,
      totalCount: newMetricResults.length,
    })
  }
}

export const spamScoreUpdater = schedules.task({
  id: 'listingcat-spam-score',
  cron: '0 08 1 * *', // Every month on 1st at 08:00 UTC
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
