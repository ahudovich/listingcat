/**
 * A map of field-level validation errors.
 *
 * @template TSchema - Zod schema type
 */
export type FormValidationErrors<TSchema> = Partial<Record<keyof TSchema, Array<string>>>

/**
 * Represents the result of a server action that processes a form.
 *
 * This is a discriminated union with three possible states:
 * - `idle`: no action has been triggered yet
 * - `success`: the action completed successfully
 * - `error`: the action failed, with a generic error message and/or field-level validation errors
 *
 * @template TSchema - Zod schema type
 */
export type FormActionResult<TSchema> =
  | { status: 'idle' }
  | { status: 'success' }
  | {
      status: 'error'
      error: string
      validationErrors?: FormValidationErrors<TSchema>
    }
