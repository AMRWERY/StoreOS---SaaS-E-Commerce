<template>
  <div>
    <h1>Product</h1>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()

// TODO: replace with real product data fetch
const product = ref({
  name: 'Product',
  description: 'Product description.',
  price: '0.00',
  image: '/og-default.jpg',
})

useSeoMeta({
  title: () => product.value.name,
  description: () => `${product.value.description} Price: $${product.value.price}. Fast shipping.`,
  ogTitle: () => `${product.value.name} | StoreOS Store`,
  ogDescription: () => product.value.description,
  ogType: 'product',
  ogImage: () => product.value.image,
  twitterCard: 'summary_large_image',
  twitterTitle: () => product.value.name,
  twitterDescription: () => product.value.description,
  twitterImage: () => product.value.image,
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.value.name,
        description: product.value.description,
        offers: {
          '@type': 'Offer',
          price: product.value.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
      })),
    },
  ],
})
</script>