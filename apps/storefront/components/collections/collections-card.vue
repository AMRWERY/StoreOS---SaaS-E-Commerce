<template>
  <div class="group/card relative h-full min-h-0">
    <nuxt-link-locale :to="collectionPath"
      class="block h-full rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base">
      <VProductCard :product="vProduct" view-mode="grid" />
    </nuxt-link-locale>

    <div v-if="collection.featured" class="absolute top-3 end-3 z-10 pointer-events-none" aria-hidden="true">
      <Icon name="ph:star-fill" class="w-6 h-6 text-brand drop-shadow-lg" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from '../../../../layers/ui/types/v-product-card'
import type { StorefrontCollection } from '../../types/collections'

const props = defineProps<{ collection: StorefrontCollection }>()

const collectionPath = computed(() => `/collections/${props.collection.slug}`)

/** Map collection → VProductCard model (price shows item count for this sector). */
const vProduct = computed<Product>(() => ({
  id: numericId(props.collection.id),
  name: props.collection.name,
  price: props.collection.count.toLocaleString(),
  category: props.collection.id,
  status: 'active',
  stock: props.collection.count,
  image: props.collection.image,
}))

function numericId(id: string): number {
  const n = Number.parseInt(String(id).replace(/\D/g, ''), 10)
  return Number.isFinite(n) ? n : 0
}
</script>