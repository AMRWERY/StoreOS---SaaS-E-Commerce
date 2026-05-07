<template>
  <div>
    <div class="space-y-0">
      <hero />

      <categories :categories="categoryList" />

      <new-arrivals :products="newArrivalList" />

      <active-bar />

      <best-sellers :products="bestSellerList" />

      <trust-features />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const catalogStore = useCatalogStore()
const { categoryList, newArrivalList, bestSellerList } = storeToRefs(catalogStore)

useSeoMeta({
  title: 'Home',
  description: 'Shop the latest collection. Free shipping on orders over $50. Discover new arrivals, top-rated products, and exclusive deals every week.',
  ogTitle: 'Home | StoreOS Store',
  ogDescription: 'Shop the latest collection. Free shipping on orders over $50. Discover new arrivals every week.',
  ogType: 'website',
  twitterTitle: 'Home | StoreOS Store',
  twitterDescription: 'Shop the latest collection. Free shipping on orders over $50.',
})
</script>