<template>
  <div>
    <div class="min-h-screen text-[#e1e1e1] -mt-5">
      <!-- Header -->
      <products-header :total="products.length" />

      <!-- Filter Bar -->
      <products-filter-bar v-model:view-mode="viewMode" />

      <!-- Status Sub-Filters -->
      <products-status-filters :filters="filters" v-model:active-filter="activeFilter" />

      <!-- Product Grid -->
      <div
        :class="['grid gap-6', viewMode === 'list' ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4']">
        <products-card v-for="product in paginatedProducts" :key="product.id" :product="product" :viewMode="viewMode" />
      </div>

      <!-- Footer -->
      <div class="mt-8">
        <VPagination :total="products.length" :perPage="6" v-model:currentPage="currentPage" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from '@storeos/ui/types/v-product-card'

const activeFilter = ref('All')
const viewMode = ref<'grid' | 'list'>('grid')
const currentPage = ref(1)

const filters = ['All', 'Active', 'Draft', 'Out of Stock', 'Low Stock']

const products = ref<Product[]>([
  { id: 1, name: 'Studio One Headphones', price: '249.00', category: 'ELECTRONICS', status: 'active', stock: 28, image: '/img/product-04.avif' },
  { id: 2, name: 'Chronos Minimal White', price: '129.00', category: 'FASHION', status: 'low_stock', stock: 3, image: '/img/product-05.avif' },
  { id: 3, name: 'Aviator Series II', price: '89.00', category: 'FASHION', status: 'out_of_stock', stock: 0, image: '/img/product-01.avif' },
  { id: 4, name: 'Lumine Essence Kit', price: '56.00', category: 'BEAUTY', status: 'active', stock: 112, image: '/img/product-06.avif' },
  { id: 5, name: 'Nordic Oak Chair', price: '320.00', category: 'FURNITURE', status: 'inactive', stock: 8, image: '/img/product-07.avif' },
  { id: 6, name: 'Carbon Night Edition', price: '458.00', category: 'FASHION', status: 'low_stock', stock: 2, image: '/img/product-08.avif' },
  { id: 7, name: 'Pixel Click Pro', price: '75.00', category: 'ELECTRONICS', status: 'active', stock: 45, image: '/img/product-09.avif' },
  { id: 8, name: 'Capture X100', price: '1,199.00', category: 'ELECTRONICS', status: 'out_of_stock', stock: 4, image: '/img/product-010.avif' },
])

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * 6
  const end = start + 6
  return products.value.slice(start, end)
})

definePageMeta({
  layout: 'dashboard'
})

useHead({
  titleTemplate: () => 'Products',
})
</script>