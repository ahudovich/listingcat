import '@tanstack/react-table'

declare namespace NodeJS {
  interface ProcessEnv {
    // Public
    NEXT_PUBLIC_ASSETS_BASE_URL: string
    NEXT_PUBLIC_ENV: string
    NEXT_PUBLIC_POSTHOG_HOST: string
    NEXT_PUBLIC_POSTHOG_KEY: string
    NEXT_PUBLIC_SENTRY_DSN: string
    NEXT_PUBLIC_WEBSITE_BASE_URL: string

    // Secrets
    BETTER_AUTH_SECRET: string
    DATABASE_URL: string
    DISCORD_CRON_WEBHOOK_URL: string
    DISCORD_GENERAL_WEBHOOK_URL: string
    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
    MICROSOFT_CLIENT_ID: string
    MICROSOFT_CLIENT_SECRET: string
    R2_ACCESS_KEY_ID: string
    R2_BUCKET: string
    R2_ENDPOINT: string
    R2_SECRET_ACCESS_KEY: string
    RAPIDAPI_HOST: string
    RAPIDAPI_KEY: string
    RESEND_API_KEY: string
    SENTRY_AUTH_TOKEN: string
    TRIGGER_SECRET_KEY: string
    VERCEL_ACCESS_TOKEN: string
    VERCEL_PROJECT_ID: string
  }
}

declare module '@tanstack/react-table' {
  // eslint-disable-next-line
  interface ColumnMeta<TData extends RowData, TValue> {
    tooltip?: string
  }
}
