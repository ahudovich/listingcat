import Link from 'next/link'
import { allBlogPosts } from 'content-collections'
import { format, parseISO } from 'date-fns'
import { LINKS } from '@/data/links'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read our blog posts about the latest trends in the marketing and SEO world.',
  alternates: {
    canonical: '/blog',
  },
}

export default function BlogPage() {
  return (
    <section className="container-article">
      <h1 className="mb-6 font-black text-primary text-balance text-3xl">Our Blog</h1>

      <div>
        {allBlogPosts.map((post) => (
          <article key={post._meta.path}>
            <h2 className="mb-3 font-bold text-xl text-primary">
              <Link className="hover:underline" href={`/blog/${post._meta.path}`}>
                {post.title}
              </Link>
            </h2>

            <div className="flex item-center gap-2 mb-3 font-medium text-xs text-tertiary">
              <time dateTime={post.date}>{format(parseISO(post.date), 'MMMM d, yyyy')}</time>

              <span className="text-faded" role="presentation">
                •
              </span>

              <span>
                By{' '}
                <a
                  className="inline-flex items-center gap-x-1.5 text-tertiary no-underline transition-colors hover:text-primary"
                  href={LINKS.AUTHOR.X}
                  target="_blank"
                  rel="nofollow"
                >
                  Andrei Hudovich
                </a>
              </span>
            </div>

            <p className="text-sm-relaxed">{post.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
