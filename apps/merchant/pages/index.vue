<template>
  <div>
    <Hero />

    <problem-section />

    <features />

    <integrations />

    <pricing />
  </div>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: "StoreOS — Merchant Dashboard for Modern E-Commerce",
  description:
    "StoreOS is the all-in-one merchant dashboard. Manage orders, products, inventory, customers, and analytics from one powerful platform.",
  ogTitle: "StoreOS — Merchant Dashboard for Modern E-Commerce",
  ogDescription:
    "Manage orders, products, inventory, customers, and analytics from one powerful platform.",
  ogType: "merchantsite",
  ogImage: "/og-dashboard.jpg",
  twitterCard: "summary_large_image",
  twitterTitle: "StoreOS — Merchant Dashboard",
  twitterDescription: "Manage your store from one powerful platform.",
  robots: "index, follow",
});

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "StoreOS",
        applicationCategory: "BusinessApplication",
        description: "All-in-one merchant dashboard for modern e-commerce.",
        operatingSystem: "merchant",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      }),
    },
  ],
});
</script>