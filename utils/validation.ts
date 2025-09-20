import type { ZodError } from 'zod'

// Return Zod errors as an array of error messages
export function getZodErrorsAsArray(
  errors: Array<Record<string, Array<ZodError>>> | unknown
): Array<string> | null {
  if (!Array.isArray(errors) || !errors[0]) return null

  return Object.values(errors[0]).flatMap((arr) =>
    (arr as Array<ZodError>).map((error) => error.message)
  )
}
