export default function PageHeader({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <header className="p-4 border-b border-b-zinc-200">
      <h1 className="font-display font-bold text-md text-primary">{title}</h1>
      {description && <p className="mt-1 text-xs-relaxed text-tertiary">{description}</p>}
    </header>
  )
}
