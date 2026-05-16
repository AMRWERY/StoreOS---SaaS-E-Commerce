<template>
  <div>
    <div class="min-h-screen text-tx-primary pb-12">
      <LazyVBreadcrumb />

      <BillingHeader />

      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-3">

        <!-- Left Column -->
        <div class="lg:col-span-8 space-y-6">
          <billing-active-plan />

          <billing-feature-access />
        </div>

        <!-- Right Column -->
        <aside class="lg:col-span-4 space-y-6">
          <billing-payment-method />

          <billing-realtime-usage />
        </aside>

        <!-- Full-width Billing History -->
        <billing-history class="lg:col-span-12" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard'
})

useHead({
  titleTemplate: () => 'Settings - Billing and Plan',
})
</script>