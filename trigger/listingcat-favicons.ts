import crypto from 'node:crypto'
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { logger, schedules } from '@trigger.dev/sdk/v3'
import * as cheerio from 'cheerio'
import { eq } from 'drizzle-orm'
import { parseICO } from 'icojs'
import sharp from 'sharp'
import { env } from '../env'
import { sendDiscordNotification } from '../lib/discord'
import { getDB, tables } from '../lib/drizzle'

interface Output {
  updatedCount: number
  erroredCount: number
  totalCount: number
}

interface FaviconResult {
  success: boolean
  faviconUrl?: string
  error?: string
}

// Initialize R2 client
const r2Client = new S3Client({
  region: 'auto',
  endpoint: env.R2_ENDPOINT,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
})

function generateFilename(url: string, buffer: Buffer): string {
  // Remove protocol and replace special characters with dashes
  const cleanUrl = url.replace(/^https?:\/\//, '').replace(/[^a-zA-Z0-9]/g, '-')

  // Generate content hash
  const hash = crypto.createHash('md5').update(buffer).digest('hex').substring(0, 8)

  return `${cleanUrl}-${hash}.png`
}

async function fetchFavicon(
  websiteUrl: string,
  currentFaviconUrl: string | null
): Promise<FaviconResult> {
  const baseUrl = new URL(websiteUrl).origin
  const rels = ['icon', 'shortcut icon', 'apple-touch-icon', 'mask-icon', 'alternate icon']

  // First, try to fetch the HTML and parse favicon links
  try {
    const htmlResponse = await fetch(websiteUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    })

    if (htmlResponse.ok) {
      const html = await htmlResponse.text()
      const $ = cheerio.load(html)

      // Look for favicon links in the HTML
      for (const rel of rels) {
        // Use Cheerio to find all link tags with the specific rel attribute
        const linkElements = $(`link[rel="${rel}"]`)

        for (let i = 0; i < linkElements.length; i++) {
          const linkElement = linkElements.eq(i)
          const sizes = linkElement.attr('sizes')

          // Skip low quality 16x16 images
          if (sizes === '16x16') {
            continue
          }

          let faviconUrl = linkElement.attr('href')

          if (faviconUrl) {
            // Make the URL absolute if it's relative
            if (faviconUrl.startsWith('/')) {
              faviconUrl = `${baseUrl}${faviconUrl}`
            } else if (!faviconUrl.startsWith('http')) {
              faviconUrl = `${baseUrl}/${faviconUrl}`
            }

            // Try to fetch this favicon
            const result = await tryFetchFavicon(faviconUrl, websiteUrl, currentFaviconUrl)

            if (result.success) {
              return result
            }
          }
        }
      }
    }
  } catch (error) {
    logger.warn(`Failed to fetch HTML for ${websiteUrl}`, { error })
  }

  // Fallback to /favicon.ico
  try {
    const faviconUrl = `${baseUrl}/favicon.ico`
    const result = await tryFetchFavicon(faviconUrl, websiteUrl, currentFaviconUrl)

    if (result.success) {
      return result
    }
  } catch (error) {
    logger.warn(`Failed to fetch ${baseUrl}/favicon.ico`, { error })
  }

  return {
    success: false,
    error: 'No valid favicon found',
  }
}

async function tryFetchFavicon(
  faviconUrl: string,
  websiteUrl: string,
  currentFaviconUrl: string | null
): Promise<FaviconResult> {
  try {
    const response = await fetch(faviconUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    })

    if (response.ok) {
      const buffer = Buffer.from(await response.arrayBuffer())

      // Process the favicon based on URL extension
      const url = new URL(faviconUrl)
      const path = url.pathname
      const processedBuffer = await processFavicon(buffer, path)

      if (processedBuffer) {
        // Generate filename with content hash
        const filename = generateFilename(websiteUrl, processedBuffer)
        const newR2Url = `${env.NEXT_PUBLIC_ASSETS_BASE_URL}/launch-platforms/${filename}`

        // Check if the new favicon is the same as the existing one
        if (currentFaviconUrl === newR2Url) {
          logger.log(`Favicon unchanged for ${websiteUrl}, skipping upload`)

          return {
            success: true,
            faviconUrl: currentFaviconUrl,
          }
        }

        // Upload to R2 only if it's different
        const r2Url = await uploadToR2(processedBuffer, filename)

        return {
          success: true,
          faviconUrl: r2Url,
        }
      }
    }

    return {
      success: false,
      error: `Failed to fetch favicon from ${faviconUrl}`,
    }
  } catch (error) {
    return {
      success: false,
      error: `Error fetching favicon from ${faviconUrl}: ${error}`,
    }
  }
}

async function optimizeImage(buffer: Buffer) {
  return await sharp(Buffer.from(buffer))
    .resize(32, 32, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({
      compressionLevel: 9,
      adaptiveFiltering: true,
      quality: 75,
      effort: 10,
    })
    .toBuffer()
}

async function processFavicon(buffer: Buffer, path: string): Promise<Buffer | null> {
  try {
    let processedBuffer: Buffer

    if (path.endsWith('.ico')) {
      // For ICO files, first parse and extract PNG
      try {
        const images = await parseICO(buffer)

        // Find the largest image that is at least 32x32, or just the largest one
        const suitableImage =
          images
            .filter((img) => img.width >= 32 && img.height >= 32)
            .sort((a, b) => b.width - a.width)[0] || images.sort((a, b) => b.width - a.width)[0]

        if (!suitableImage) {
          logger.warn('ICO file does not contain any suitable images')
          return null
        }

        // Convert the image buffer to PNG and process with Sharp
        processedBuffer = await optimizeImage(Buffer.from(suitableImage.buffer))
      } catch (icoError) {
        logger.warn(`Failed to parse ICO file`, { error: icoError })
        return null
      }
    } else if (path.endsWith('.svg')) {
      // Convert SVG to PNG
      processedBuffer = await optimizeImage(buffer)
    } else {
      // For PNG files, just resize to 32x32
      processedBuffer = await optimizeImage(buffer)
    }

    return processedBuffer
  } catch (error) {
    logger.error(`Error processing favicon`, { error })
    return null
  }
}

async function deleteOldFaviconFromR2(faviconUrl: string): Promise<void> {
  try {
    // Extract the key from the favicon URL
    const url = new URL(faviconUrl)
    const key = url.pathname.substring(1) // Remove leading slash

    if (!key.startsWith('launch-platforms/')) {
      logger.warn(`Favicon URL doesn't match expected pattern: ${faviconUrl}`)
      return
    }

    const command = new DeleteObjectCommand({
      Bucket: env.R2_BUCKET,
      Key: key,
    })

    await r2Client.send(command)
    logger.log(`Deleted old favicon from R2: ${key}`)
  } catch (error) {
    logger.warn(`Failed to delete old favicon from R2`, { error })
  }
}

async function uploadToR2(buffer: Buffer, filename: string): Promise<string> {
  const key = `launch-platforms/${filename}`

  const command = new PutObjectCommand({
    Bucket: env.R2_BUCKET,
    Key: key,
    Body: buffer,
    ContentType: 'image/png',
    CacheControl: 'public, max-age=31536000', // 1 year cache
  })

  await r2Client.send(command)

  // Return the public URL (adjust this based on your R2 setup)
  return `${env.NEXT_PUBLIC_ASSETS_BASE_URL}/${key}`
}

async function saveFaviconToDb(websiteUrl: string, faviconUrl: string): Promise<void> {
  const db = getDB()

  await db
    .update(tables.launchPlatforms)
    .set({ faviconUrl })
    .where(eq(tables.launchPlatforms.websiteUrl, websiteUrl))
}

export const faviconsUpdater = schedules.task({
  id: 'listingcat-favicons',
  cron: '0 12 * * 1', // Every week on Monday at 12:00 UTC
  machine: { preset: 'micro' },
  maxDuration: 900, // 15 mins

  onSuccess: async (payload, output: Output, { ctx }) => {
    // Send Discord notification with the results
    const reportMessage =
      `🔄 **Favicons Update Report**\n\n` +
      `• Updated: ${output.updatedCount} icons\n` +
      `• Errored: ${output.erroredCount} icons\n` +
      `• Total processed: ${output.totalCount} icons\n\n`

    await sendDiscordNotification({
      type: 'cron',
      message: reportMessage,
    })
  },

  run: async (payload, { ctx }) => {
    const db = getDB()

    // Get all launch platform URLs with current faviconUrl values
    const result = await db
      .select({
        faviconUrl: tables.launchPlatforms.faviconUrl,
        websiteUrl: tables.launchPlatforms.websiteUrl,
      })
      .from(tables.launchPlatforms)

    // Create a map of website URLs to current favicon URLs for cleanup
    const websiteToFaviconMap = new Map<string, string | null>()

    result.forEach((row) => {
      websiteToFaviconMap.set(row.websiteUrl, row.faviconUrl)
    })

    // Extract URLs into an array
    const urls = result.map((row) => row.websiteUrl)

    let updatedCount = 0
    let erroredCount = 0

    const results: Array<string> = []

    // Process each URL
    for (const url of urls) {
      try {
        const currentFaviconUrl = websiteToFaviconMap.get(url) ?? null
        const faviconResult = await fetchFavicon(url, currentFaviconUrl)

        if (faviconResult.success && faviconResult.faviconUrl) {
          // Only delete old favicon and update database if the favicon actually changed
          if (currentFaviconUrl !== faviconResult.faviconUrl) {
            // Delete old favicon if it exists
            if (currentFaviconUrl) {
              await deleteOldFaviconFromR2(currentFaviconUrl)
            }

            // Save new favicon URL to database
            await saveFaviconToDb(url, faviconResult.faviconUrl)

            updatedCount++
            logger.log(`Successfully updated favicon for: ${url}`)
          }

          results.push(url)
        } else {
          erroredCount++
          results.push(url)
          logger.warn(`Failed to process favicon for: ${url}`, { error: faviconResult.error })
        }
      } catch (error) {
        erroredCount++
        results.push(url)
        logger.error(`Error processing ${url}`, { error })
      }
    }

    // Log the results
    logger.log(
      `Updated ${updatedCount} records, errored ${erroredCount} records (errors) out of ${results.length} total`
    )

    return {
      updatedCount,
      erroredCount,
      totalCount: results.length,
    }
  },
})
