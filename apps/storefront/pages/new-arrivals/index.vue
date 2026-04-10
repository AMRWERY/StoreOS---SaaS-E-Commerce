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

const viewMode = ref<'grid' | 'list'>('grid')
const selectedFilter = ref('All Categories')

const categories = ['All Categories', 'Hardware', 'Apparel', 'Accessories', 'Optics']

const products = ref<NewArrivalProduct[]>([
  {
    id: 'K-9021',
    name: 'Linear Modular Rack v2',
    category: 'Hardware',
    price: 8400,
    image: '/img/product-01.avif',
    badge: { text: 'NEW BATCH', type: 'new' },
    timestamp: '2024.04.10',
  },
  {
    id: 'K-9022',
    name: 'AeroStep Pro Runner',
    category: 'Apparel',
    price: 2150,
    oldPrice: 3200,
    image: '/img/product-02.avif',
    badge: { text: '30% OFF', type: 'sale' },
    timestamp: '2024.04.08',
  },
  {
    id: 'K-9023',
    name: 'Sonic-X Tactical Buds',
    category: 'Accessories',
    price: 1890,
    image: '/img/product-03.avif',
    badge: { text: 'LIMITED', type: 'limited' },
    timestamp: '2024.04.05',
  },
  {
    id: 'K-9024',
    name: 'Spectra Prime Lens',
    category: 'Optics',
    price: 12400,
    image: '/img/product-04.avif',
    timestamp: '2024.04.01',
  },
  {
    id: 'K-9025',
    name: 'Vector Carbon Wallet',
    category: 'Accessories',
    price: 750,
    image: '/img/product-05.avif',
    badge: { text: 'NEW', type: 'new' },
    timestamp: '2024.03.28',
  },
  {
    id: 'K-9026',
    name: 'Origin Glass Vase',
    category: 'Hardware',
    price: 1200,
    image: '/img/product-06.avif',
    timestamp: '2024.03.25',
  },
])

const filteredProducts = computed(() => {
  if (selectedFilter.value === 'All Categories') return products.value
  return products.value.filter(p => p.category === selectedFilter.value)
})

const onLoadMore = () => {
  // pagination / fetch next batch
}

const onFastDeploy = (_product: NewArrivalProduct) => {
  // add to cart
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
