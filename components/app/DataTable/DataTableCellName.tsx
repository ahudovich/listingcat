import Link from 'next/link'

export default function DataTableCellName({
  name,
  websiteUrl,
}: {
  name: string
  websiteUrl: string
}) {
  return (
    <Link className="flex items-center gap-2 text-secondary" href={websiteUrl} target="_blank">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="shrink-0 size-4"
        src={`https://www.google.com/s2/favicons?domain=${websiteUrl}&sz=32`}
        alt={`${name} favicon`}
      />
      <span className="border-b border-b-transparent hover:border-b-current">{name}</span>
    </Link>
  )
}
