import Link from 'next/link'

export default function DataTableCellName({
  name,
  websiteUrl,
}: {
  name: string
  websiteUrl: string
}) {
  return (
    <Link
      className="border-b border-b-transparent text-secondary hover:border-b-current"
      href={websiteUrl}
      target="_blank"
    >
      {name}
    </Link>
  )
}
