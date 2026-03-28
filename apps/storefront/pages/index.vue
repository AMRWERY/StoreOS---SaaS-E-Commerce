<template>
  <div>
    <p class="text-3xl font-bold underline p-8 hover:text-5xl cursor-pointer hover:text-purple-700">
      Hello StoreOS!
      (Storefront Project)
    </p>
    <Icon name="material-symbols:360" class="w-24 h-24" />
  </div>
</template>

<script lang="ts" setup>
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