<template>
  <div class="min-h-screen bg-[#08080E] text-[#F0F0FF] selection:bg-[#6366F1]/30 pb-20">
    <collections-page-header :breadcrumb-items="breadcrumbItems" :sector-count="collections.length" />
    <collections-grid :collections="collections" />
  </div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '../../../../layers/ui/types/v-breadcrumb'
import { useCollectionsStore } from '@/stores/collections'

const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Collections', active: true },
]

const collectionsStore = useCollectionsStore()
const { collections } = storeToRefs(collectionsStore)

useSeoMeta({
  title: 'Collections',
  description: 'Browse our full catalog. Filter by category, price, and availability. Fast worldwide shipping on all orders.',
  ogTitle: 'Collections | StoreOS Store',
  ogDescription: 'Browse our full catalog. Filter by category, price, and availability.',
  ogType: 'website',
  twitterTitle: 'Collections | StoreOS Store',
  twitterDescription: 'Browse our full catalog. Fast worldwide shipping.',
})
</script>
