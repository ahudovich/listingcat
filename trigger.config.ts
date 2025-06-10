import { syncVercelEnvVars } from '@trigger.dev/build/extensions/core'
import { defineConfig } from '@trigger.dev/sdk/v3'
import { env } from './env'

export default defineConfig({
  dirs: ['./trigger'],
  project: 'proj_mrivxilhfonrtclxcqan',
  runtime: 'node',
  logLevel: 'log',
  maxDuration: 3600, // 1 hour
  retries: {
    enabledInDev: false,
    default: {
      maxAttempts: 0,
    },
  },
  build: {
    extensions: [
      syncVercelEnvVars({
        vercelAccessToken: env.VERCEL_ACCESS_TOKEN,
        projectId: env.VERCEL_PROJECT_ID,
      }),
    ],
  },
})
