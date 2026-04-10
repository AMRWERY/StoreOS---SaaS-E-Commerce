import type { EditorialArticle } from '@/types/editorial'

export const EDITORIAL_ARTICLES: EditorialArticle[] = [
  {
    id: 'ED-001',
    category: 'Design Logic',
    title: 'The Architecture of Insulation: Engineering the 2024 Winter Shell',
    excerpt:
      'An in-depth technical breakdown of the multi-layer membrane system used in our latest hardware line.',
    author: 'THORNE_M',
    date: '2024.03.15',
    readTime: '08:45',
    image: '/img/collection-01.avif',
    featured: true,
  },
  {
    id: 'ED-002',
    category: 'Operational',
    title: 'High-Frequency Logistics: How We Synchronize Global Inventory',
    excerpt:
      'Exploring the Kinetic backbone that powers our real-time stock distribution across three continents.',
    author: 'SYSTEM',
    date: '2024.03.10',
    readTime: '05:20',
    image: '/img/collection-07.avif',
  },
  {
    id: 'ED-003',
    category: 'Interviews',
    title: 'Digital Aesthetics: A Conversation with Hyperlink Studios',
    excerpt:
      'Discussing the intersection of archival techwear and digital identity in the modern operator context.',
    author: 'RODRIGUEZ_E',
    date: '2024.02.28',
    readTime: '12:15',
    image: '/img/collection-08.avif',
  },
  {
    id: 'ED-004',
    category: 'Behind the Lens',
    title: 'Optics Protocol: Capturing Form and Function in Low Light',
    excerpt: 'A guide to the visual documentation process of the StoreOS product catalog.',
    author: 'CHEN_D',
    date: '2024.02.14',
    readTime: '06:30',
    image: '/img/collection-04.avif',
  },
]

export function getEditorialArticleById(id: string): EditorialArticle | undefined {
  return EDITORIAL_ARTICLES.find(a => a.id === id)
}
