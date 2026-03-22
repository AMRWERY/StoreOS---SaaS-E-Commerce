<template>
  <VProductCard :product="product" :viewMode="viewMode" />
</template>

<script lang="ts" setup>
import type { Product } from '@storeos/ui/types/v-product-card'

withDefaults(defineProps<{ 
  product: Product,
  viewMode?: 'grid' | 'list'
}>(), {
  viewMode: 'grid'
})
</script>