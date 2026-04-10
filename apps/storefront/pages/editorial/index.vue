<template>
  <div
    class="min-h-screen bg-[#08080E] text-[#F0F0FF] selection:bg-[#6366F1]/30 py-8 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
    <editorial-page-header :breadcrumb-items="breadcrumbItems" />

    <editorial-filter-bar v-model:active-filter="activeFilter" :filters="filters" />

    <editorial-articles-layout :featured="featuredArticles" :articles="gridArticles" @load-more="onLoadMore" />
  </div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '../../../../layers/ui/types/v-breadcrumb'
import type { EditorialArticle } from '@/types/editorial'
import { EDITORIAL_ARTICLES } from '../../data/editorial-articles'

const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Editorial', active: true },
]

const activeFilter = ref('All Protocols')
const filters = ['All Protocols', 'Design Logic', 'Interviews', 'Operational', 'Behind the Lens']

const articles = ref<EditorialArticle[]>([...EDITORIAL_ARTICLES])

const filteredArticles = computed(() => {
  if (activeFilter.value === 'All Protocols') return articles.value
  return articles.value.filter(a => a.category === activeFilter.value)
})

const featuredArticles = computed(() => filteredArticles.value.filter(a => a.featured))
const gridArticles = computed(() => filteredArticles.value.filter(a => !a.featured))

const onLoadMore = () => {
  // pagination / fetch
}

useSeoMeta({
  title: 'Editorial',
  description: 'Browse our full catalog. Filter by category, price, and availability. Fast worldwide shipping on all orders.',
  ogTitle: 'Editorial | StoreOS Store',
  ogDescription: 'Browse our full catalog. Filter by category, price, and availability.',
  ogType: 'website',
  twitterTitle: 'Editorial | StoreOS Store',
  twitterDescription: 'Browse our full catalog. Fast worldwide shipping.',
})
</script>