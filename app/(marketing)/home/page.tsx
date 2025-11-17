import { HomeContent } from '@/components/pages/home/content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Listing Cat - Marketing Database for Startups',
  },
  description:
    'Get access to the largest database of directories, launch platforms, marketplaces, showcase websites, newsletters, communities, and much more!',
  alternates: {
    canonical: '/',
  },
}

export default async function HomeDuplicatePage() {
  return <HomeContent />
}
