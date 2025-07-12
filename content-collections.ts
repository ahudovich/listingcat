import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import { z } from 'zod'

const blogPosts = defineCollection({
  name: 'blogPosts',
  directory: 'blog',
  include: '*.mdx',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    imageWidth: z.number(),
    imageHeight: z.number(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document)

    return {
      ...document,
      mdx,
    }
  },
})

export default defineConfig({
  collections: [blogPosts],
})
