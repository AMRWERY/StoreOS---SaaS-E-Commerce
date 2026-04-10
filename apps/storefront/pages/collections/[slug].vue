<template>
  <div class="min-h-screen bg-[#08080E] text-[#F0F0FF] selection:bg-[#6366F1]/30 p-6 lg:p-10">
    <div v-if="!meta" class="max-w-[1400px] mx-auto py-20 text-center space-y-6">
      <p class="text-[#8888AA]">This collection was not found.</p>
      <nuxt-link-locale
        to="/collections"
        class="inline-flex text-[#6366F1] font-bold text-sm tracking-widest hover:underline"
      >
        Back to collections
      </nuxt-link-locale>
    </div>

    <div v-else class="max-w-[1400px] mx-auto space-y-10">
      <VBreadcrumb :items="breadcrumbItems" />

      <header class="space-y-3 border-b border-[#1C1C30] pb-10">
        <p class="text-[10px] font-black tracking-[0.3em] text-[#50506A]">
          Filtered catalog
        </p>
        <h1 class="text-4xl lg:text-5xl font-bold tracking-tight">
          {{ meta.name }}
        </h1>
        <p class="text-[15px] text-[#8888AA] max-w-2xl leading-relaxed">
          {{ meta.description }}
        </p>
        <p class="text-[11px] font-bold text-[#6366F1] tracking-widest">
          {{ filteredProducts.length }} products in this collection
        </p>
      </header>

      <div
        v-if="filteredProducts.length"
        class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="p in filteredProducts"
          :key="p.id"
          class="h-full min-h-0"
        >
          <nuxt-link-locale
            :to="localePath(`/shop-all/${p.slug}`)"
            class="block h-full rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080E]"
          >
            <VProductCard :product="toCardProduct(p)" view-mode="grid" />
          </nuxt-link-locale>
        </div>
      </div>

      <p v-else class="text-center text-[#50506A] py-16 text-sm">
        No products in this collection yet.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '../../../../layers/ui/types/v-breadcrumb'
import type { Product } from '../../../../layers/ui/types/v-product-card'
import { collectionCatalogProducts, collectionMeta, type CollectionCatalogProduct } from '../../data/collections-catalog'

const route = useRoute()
const localePath = useLocalePath()

const slug = computed(() => String(route.params.slug ?? ''))

const meta = computed(() => collectionMeta[slug.value] ?? null)

const filteredProducts = computed(() =>
  collectionCatalogProducts.filter(p => p.collectionSlug === slug.value),
)

const breadcrumbItems = computed<BreadcrumbItem[]>(() => [
  { label: 'Home', to: '/' },
  { label: 'Collections', to: '/collections' },
  { label: meta.value?.name ?? 'Collection', active: true },
])

function toCardProduct(p: CollectionCatalogProduct): Product {
  return {
    id: p.id,
    name: p.name,
    price: p.price.toLocaleString(),
    category: p.category,
    status: 'active',
    stock: 12,
    image: p.image,
  }
}

useSeoMeta({
  title: () => meta.value?.name ?? 'Collection',
  description: () => meta.value?.description ?? 'Browse products in this collection.',
  ogTitle: () => (meta.value?.name ? `${meta.value.name} | StoreOS` : 'Collection | StoreOS'),
  ogType: 'website',
})
</script>
