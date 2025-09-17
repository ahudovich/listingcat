export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  return <h1>{slug} Project</h1>
}
