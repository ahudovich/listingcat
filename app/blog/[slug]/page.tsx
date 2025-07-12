import Image from 'next/image'
import Link from 'next/link'
import { MDXContent } from '@content-collections/mdx/react'
import { ArrowLeft02Icon } from '@hugeicons/core-free-icons'
import { allBlogPosts } from 'content-collections'
import { format, parseISO } from 'date-fns'
import { env } from '@/env'
import BaseIcon from '@/components/ui/BaseIcon'
import type { Metadata } from 'next'
import type { BlogPost } from 'content-collections'

// Return 404 for non-existent slugs
export const dynamicParams = false

// Generate static params at build time
export async function generateStaticParams() {
  return allBlogPosts.map((post) => ({
    slug: post._meta.path,
  }))
}

// Generate metadata at build time
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const post = allBlogPosts.find((post) => post._meta.path === slug) as BlogPost

  return {
    title: `${post.title} | Listing Cat`,
    description: post.description,
    authors: [
      {
        name: 'Andrei Hudovich',
        url: 'https://x.com/AndreiHudovich',
      },
    ],
    alternates: {
      canonical: `${env.NEXT_PUBLIC_WEBSITE_BASE_URL}/blog/${slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const post = allBlogPosts.find((post) => post._meta.path === slug) as BlogPost

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: [`${env.NEXT_PUBLIC_WEBSITE_BASE_URL}/blog/${slug}.png`],
    datePublished: parseISO(post.date).toISOString(),
    author: [
      {
        '@type': 'Person',
        name: 'Andrei Hudovich',
        url: 'https://x.com/AndreiHudovich',
      },
    ],
  }

  return (
    <div className="container-article">
      <Link
        className="group inline-flex items-center gap-2 mb-4 font-medium text-sm text-secondary"
        href="/blog"
      >
        <BaseIcon
          className="shrink-0 size-5 transition-transform group-hover:-translate-x-1"
          icon={ArrowLeft02Icon}
        />
        Back to blog
      </Link>

      <article className="prose prose-headings:font-bold prose-headings:text-primary prose-h1:mb-4 prose-h1:font-black prose-h1:text-4xl prose-h2:my-3 prose-hr:my-[2em] prose-strong:font-medium">
        {/* JSON-LD for Google Rich Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        {/* Title */}
        <h1>{post.title}</h1>

        {/* Metadata */}
        <div className="not-prose flex item-center gap-2 font-medium text-xs text-tertiary">
          <time dateTime={post.date}>{format(parseISO(post.date), 'MMMM d, yyyy')}</time>

          <span className="text-faded" role="presentation">
            •
          </span>

          <span className="flex items-center gap-x-1.5">
            By
            <a
              className="inline-flex items-center gap-x-1.5 text-tertiary no-underline transition-colors hover:text-primary"
              href="https://x.com/AndreiHudovich"
              target="_blank"
              rel="nofollow"
            >
              <Image
                className="!my-0 size-4 rounded-full"
                src="/layout/footer/andrei-hudovich.png"
                width={16}
                height={16}
                alt="Andrei Hudovich"
              />
              Andrei Hudovich
            </a>
          </span>
        </div>

        {/* Image */}
        <Image
          className="not-prose my-7 rounded-xl"
          src={`/blog/${slug}.png`}
          width={post.imageWidth}
          height={post.imageHeight}
          loading="lazy"
          alt={post.title}
        />

        {/* Content */}
        <MDXContent code={post.mdx} />
      </article>
    </div>
  )
}
