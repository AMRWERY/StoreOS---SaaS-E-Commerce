<template>
  <div :class="[
    'bg-[#0c0c0e] border border-white/5 rounded-2xl overflow-hidden group hover:border-white/10 transition-all cursor-pointer flex',
    viewMode === 'list' ? 'flex-row items-center h-48' : 'flex-col h-full'
  ]">
    <!-- Product Image -->
    <div :class="[
      'relative overflow-hidden bg-gradient-to-b from-white/[0.03] to-transparent shrink-0 min-h-0 min-w-0',
      viewMode === 'list' ? 'w-48 h-full' : 'aspect-square w-full'
    ]">
      <img :src="product.image"
        class="w-full h-64 object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 opacity-60 group-hover:opacity-100" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent"></div>
    </div>

    <!-- Product Info -->
    <div class="p-6 flex flex-col flex-1">
      <div class="flex justify-between items-start mb-2">
        <h3 class="font-bold text-sm text-gray-200 group-hover:text-white transition-colors truncate pe-2">
          {{ product.name }}
        </h3>
        <div :class="[statusDot, 'w-2 h-2 rounded-full mt-1.5 shrink-0']"></div>
      </div>

      <p class="text-xl font-bold mb-4 tracking-tight">${{ product.price }}</p>

      <div class="flex items-center justify-between mt-auto">
        <span class="text-[9px] font-black text-gray-600 tracking-[0.2em]">{{ product.category }}</span>
        <div :class="[stockBadge, 'text-[10px] font-bold px-2.5 py-1 rounded-md border tracking-wider']">
          {{ stockLabel }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from '../types/v-product-card'

const props = withDefaults(defineProps<{
  product: Product,
  viewMode?: 'grid' | 'list'
}>(), {
  viewMode: 'grid'
})

const statusDot = computed(() => {
  if (props.product.status === 'active') return 'bg-emerald-500'
  if (props.product.status === 'out_of_stock') return 'bg-red-500'
  return 'bg-gray-600'
})

const stockBadge = computed(() => {
  if (props.product.status === 'out_of_stock') return 'bg-red-500/10 text-red-500/80 border-red-500/10'
  if (props.product.status === 'low_stock') return 'bg-amber-500/10 text-amber-500/80 border-amber-500/10'
  return 'bg-emerald-500/10 text-emerald-500/80 border-emerald-500/10'
})

const stockLabel = computed(() => {
  if (props.product.status === 'out_of_stock') return 'Out of Stock'
  if (props.product.status === 'low_stock') return `Low ${props.product.stock}`
  return `In Stock ${props.product.stock}`
})
</script>