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
import { useEditorialStore } from '@/stores/editorial'

const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Editorial', active: true },
]

const editorialStore = useEditorialStore()
const { activeFilter, filters, featuredArticles, gridArticles } = storeToRefs(editorialStore)
const { onLoadMore } = editorialStore

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