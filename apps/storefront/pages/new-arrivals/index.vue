<template>
  <div class="min-h-screen text-[#F0F0FF] selection:bg-[#6366F1]/30 p-6 lg:p-10">
    <new-arrivals-hero v-model:view-mode="viewMode" />
    
    <new-arrivals-filter-bar v-model:selected-filter="selectedFilter" :categories="categories" />
  
    <new-arrivals-products-section
      :products="filteredProducts"
      :view-mode="viewMode"
      @load-more="onLoadMore"
      @fast-deploy="onFastDeploy"
    />
  </div>
</template>

<script lang="ts" setup>
import type { NewArrivalProduct } from '../../types/new-arrivals'
import { useNewArrivalsStore } from '@/stores/newArrivals'

const store = useNewArrivalsStore()
const { viewMode, selectedFilter, categories, filteredProducts } = storeToRefs(store)

const onLoadMore = store.onLoadMore

const onFastDeploy = (_product: NewArrivalProduct) => {
  // add to cart via useCartStore
}

useSeoMeta({
  title: 'New Arrivals',
  description: 'Browse our full catalog. Filter by category, price, and availability. Fast worldwide shipping on all orders.',
  ogTitle: 'New Arrivals | StoreOS Store',
  ogDescription: 'Browse our full catalog. Filter by category, price, and availability.',
  ogType: 'website',
  twitterTitle: 'New Arrivals | StoreOS Store',
  twitterDescription: 'Browse our full catalog. Fast worldwide shipping.',
})
</script>
