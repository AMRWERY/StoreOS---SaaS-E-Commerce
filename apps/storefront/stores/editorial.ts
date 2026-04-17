import { defineStore } from 'pinia'
import type { EditorialArticle } from '@/types/editorial'
import { EDITORIAL_ARTICLES } from '@/data/editorial-articles'

export const useEditorialStore = defineStore('storefront-editorial', () => {
  const activeFilter = ref('All Protocols')
  const filters = ref(['All Protocols', 'Design Logic', 'Interviews', 'Operational', 'Behind the Lens'])

  const articles = ref<EditorialArticle[]>([
    ...EDITORIAL_ARTICLES,
    {
      id: 'ED-005',
      category: 'Design Logic',
      title: 'Material Futures: Reconsidering the Role of Synthetics in Premium Apparel',
      excerpt: 'As demand for sustainable outputs rises, our R&D lab dives into the trade-offs between bio-synthetics and traditional premium materials.',
      author: 'THORNE_M',
      date: '2024.04.12',
      readTime: '10:30',
      image: '/img/collection-05.avif',
    },
    {
      id: 'ED-006',
      category: 'Interviews',
      title: 'Signal & Noise: Talking Design Systems with Unit Studio',
      excerpt: 'A candid conversation about building scalable visual systems in a world saturated with visual noise.',
      author: 'CHEN_D',
      date: '2024.04.05',
      readTime: '07:00',
      image: '/img/collection-06.avif',
      featured: true,
    },
    {
      id: 'ED-007',
      category: 'Operational',
      title: 'Zero Dead Stock: A 90-Day Case Study in Demand Forecasting',
      excerpt: 'How we reduced unsold inventory to near-zero using probabilistic demand modeling and live reorder logic.',
      author: 'SYSTEM',
      date: '2024.03.22',
      readTime: '09:15',
      image: '/img/collection-02.avif',
    },
    {
      id: 'ED-008',
      category: 'Behind the Lens',
      title: 'Studio Session: Documenting the Kinetic Footwear Collection',
      excerpt: 'A behind-the-scenes look at the lighting rigs, camera setups, and styling choices for our latest footwear campaign.',
      author: 'RODRIGUEZ_E',
      date: '2024.03.08',
      readTime: '04:45',
      image: '/img/collection-03.avif',
    },
  ])

  const filteredArticles = computed(() => {
    if (activeFilter.value === 'All Protocols') return articles.value
    return articles.value.filter(a => a.category === activeFilter.value)
  })

  const featuredArticles = computed(() => filteredArticles.value.filter(a => a.featured))
  const gridArticles = computed(() => filteredArticles.value.filter(a => !a.featured))

  function onLoadMore() {
    // future: fetch next page
  }

  return { activeFilter, filters, articles, filteredArticles, featuredArticles, gridArticles, onLoadMore }
})
