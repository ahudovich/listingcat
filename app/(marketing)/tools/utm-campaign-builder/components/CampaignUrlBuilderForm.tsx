'use client'

import { useEffect, useId, useMemo, useState } from 'react'
import { useCopyToClipboard } from 'react-use'
import { Copy01Icon } from '@hugeicons/core-free-icons'
import { BaseButton } from '@/components/ui/button'
import { BaseIcon } from '@/components/ui/icon'
import { BaseInput } from '@/components/ui/input'

type UtmParams = {
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_term?: string
  utm_content?: string
  utm_id?: string
}

function buildCampaignUrl(websiteUrl: string, params: UtmParams): string | null {
  // Basic validation: require a URL-like string; rely on <input type="url"> for full validation
  if (!websiteUrl || typeof websiteUrl !== 'string') {
    return null
  }

  const entries: Array<[string, string]> = Object.entries(params).filter(
    (entry): entry is [string, string] => Boolean(entry[1])
  )

  // If no params provided, just return the input URL as-is
  if (entries.length === 0) {
    return websiteUrl
  }

  // Preserve hash fragment if present, and avoid automatic encoding of query values
  const hashIndex = websiteUrl.indexOf('#')
  const hasHash = hashIndex !== -1
  const baseAndQuery = hasHash ? websiteUrl.slice(0, hashIndex) : websiteUrl
  const hashPart = hasHash ? websiteUrl.slice(hashIndex) : ''

  const hasExistingQuery = baseAndQuery.includes('?')
  const joiner = hasExistingQuery ? '&' : '?'

  const queryString = entries.map(([k, v]) => `${k}=${v}`).join('&')

  return `${baseAndQuery}${joiner}${queryString}${hashPart}`
}

export function CampaignUrlBuilderForm() {
  const id = useId()

  const [websiteUrl, setWebsiteUrl] = useState('')
  const [utmSource, setUtmSource] = useState('')
  const [utmMedium, setUtmMedium] = useState('')
  const [utmCampaign, setUtmCampaign] = useState('')
  const [utmTerm, setUtmTerm] = useState('')
  const [utmContent, setUtmContent] = useState('')
  const [utmId, setUtmId] = useState('')
  const [resultUrl, setResultUrl] = useState('')
  const [copied, setCopied] = useState(false)

  const [, copyToClipboard] = useCopyToClipboard()

  const generatedUrl = useMemo(() => {
    return buildCampaignUrl(websiteUrl.trim(), {
      utm_source: utmSource.trim(),
      utm_medium: utmMedium.trim(),
      utm_campaign: utmCampaign.trim(),
      utm_term: utmTerm.trim(),
      utm_content: utmContent.trim(),
      utm_id: utmId.trim(),
    })
  }, [websiteUrl, utmSource, utmMedium, utmCampaign, utmTerm, utmContent, utmId])

  const isGenerateDisabled = [websiteUrl, utmSource, utmMedium, utmCampaign].some(
    (value) => value.trim() === ''
  )

  useEffect(() => {
    let timeout: number | undefined

    if (copied) {
      timeout = window.setTimeout(() => setCopied(false), 3000)
    }

    return () => {
      if (timeout) window.clearTimeout(timeout)
    }
  }, [copied])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!generatedUrl) {
      return
    }

    setResultUrl(generatedUrl)
  }

  return (
    <>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="inline-block mb-1.5 font-medium text-sm text-secondary cursor-pointer">
            Your website<span className="text-red-500">*</span>
          </label>

          <BaseInput
            id={`${id}-website-url`}
            type="url"
            placeholder="https://acme.com/landing"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            autoComplete="url"
          />
        </div>

        <div>
          <label className="inline-block mb-1.5 font-medium text-sm text-secondary cursor-pointer">
            Campaign Source<span className="text-red-500">*</span>{' '}
            <span className="text-xs text-faded">(utm_source)</span>
          </label>

          <BaseInput
            id={`${id}-utm-source`}
            placeholder="E.g. google, newsletter, twitter"
            value={utmSource}
            onChange={(e) => setUtmSource(e.target.value)}
          />
        </div>

        <div>
          <label className="inline-block mb-1.5 font-medium text-sm text-secondary cursor-pointer">
            Campaign Medium<span className="text-red-500">*</span>{' '}
            <span className="text-xs text-faded">(utm_medium)</span>
          </label>

          <BaseInput
            id={`${id}-utm-medium`}
            placeholder="E.g. cpc, email, social"
            value={utmMedium}
            onChange={(e) => setUtmMedium(e.target.value)}
          />
        </div>

        <div>
          <label className="inline-block mb-1.5 font-medium text-sm text-secondary cursor-pointer">
            Campaign Name<span className="text-red-500">*</span>{' '}
            <span className="text-xs text-faded">(utm_campaign)</span>
          </label>

          <BaseInput
            id={`${id}-utm-campaign`}
            placeholder="E.g. summer_sale, launch, q3_retention"
            value={utmCampaign}
            onChange={(e) => setUtmCampaign(e.target.value)}
          />
        </div>

        <div>
          <label className="inline-block mb-1.5 font-medium text-sm text-secondary cursor-pointer">
            Campaign Term <span className="text-xs text-faded">(utm_term)</span>
          </label>

          <BaseInput
            id={`${id}-utm-term`}
            placeholder="E.g. keyword or audience"
            value={utmTerm}
            onChange={(e) => setUtmTerm(e.target.value)}
          />
        </div>

        <div>
          <label className="inline-block mb-1.5 font-medium text-sm text-secondary cursor-pointer">
            Campaign Content <span className="text-xs text-faded">(utm_content)</span>
          </label>

          <BaseInput
            id={`${id}-utm-content`}
            placeholder="E.g. adA, variant-b, hero-link"
            value={utmContent}
            onChange={(e) => setUtmContent(e.target.value)}
          />
        </div>

        <div>
          <label className="inline-block mb-1.5 font-medium text-sm text-secondary cursor-pointer">
            Campaign ID <span className="text-xs text-faded">(utm_id)</span>
          </label>

          <BaseInput
            id={`${id}-utm-id`}
            placeholder="E.g. ad id or platform id"
            value={utmId}
            onChange={(e) => setUtmId(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <BaseButton className="w-36" size="md" type="submit" disabled={isGenerateDisabled}>
            Generate
          </BaseButton>
        </div>
      </form>

      {resultUrl && (
        <div className="mt-8">
          <div className="inline-block mb-1.5 text-sm font-medium text-secondary">
            Generated campaign URL
          </div>

          <div className="flex flex-col items-center gap-4 px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-control break-all text-sm text-primary sm:flex-row sm:justify-between">
            {resultUrl}
            <BaseButton
              className="shrink-0 w-full sm:w-32"
              variant="secondary"
              onClick={() => {
                if (!resultUrl) return
                copyToClipboard(resultUrl)
                setCopied(true)
              }}
              disabled={!resultUrl}
            >
              {copied ? (
                'Copied!'
              ) : (
                <>
                  <BaseIcon
                    className="shrink-0 size-4.5 text-tertiary transition-all group-hover:text-primary group-data-[state=open]:-rotate-180"
                    icon={Copy01Icon}
                    strokeWidth={2.5}
                  />
                  Copy
                </>
              )}
            </BaseButton>
          </div>
        </div>
      )}
    </>
  )
}
