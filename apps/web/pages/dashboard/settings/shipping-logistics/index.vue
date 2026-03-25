<template>
  <div>
    <div class="min-h-screen text-[#e1e1e1] selection:bg-indigo-500/30 overflow-x-hidden">
      <shipping-header />

      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside class="lg:col-span-4 space-y-6">
          <shipping-default-carrier />

          <shipping-quick-metrics />
        </aside>

        <div class="lg:col-span-8 space-y-8">
          <shipping-configured-zones />

          <shipping-alert-section />
        </div>
      </div>

      <shipping-floating-bar />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard'
});

useHead({
  titleTemplate: () => 'Settings - Shipping Logistics',
});
</script>