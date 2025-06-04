import { emailOTPClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'
import { BASE_URL } from '@/enums/constants'

export const authClient = createAuthClient({
  plugins: [emailOTPClient()],
  baseURL: BASE_URL,
})
