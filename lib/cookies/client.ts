import type { OptionsType } from 'cookies-next'

export const cookieOptions: OptionsType = {
  maxAge: 31536000, // 1 year
  sameSite: 'lax',
}
