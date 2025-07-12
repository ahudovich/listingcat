import Link from 'next/link'
import { allBlogPosts } from 'content-collections'
import { format, parseISO } from 'date-fns'

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
                  href="https://x.com/AndreiHudovich"
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
