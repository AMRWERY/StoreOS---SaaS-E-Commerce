<template>
  <div>
    <div class="min-h-screen text-[#e1e1e1] pb-20 selection:bg-indigo-500/30 overflow-x-hidden">
      <!-- 1. Breadcrumbs & Header -->
      <payment-header />

      <div class="max-w-6xl mx-auto space-y-6">
        <!-- 2. Top Row: COD & Stripe -->
        <payment-methods-top />

        <!-- 3. Paymob Section -->
        <payment-method-paymob />

        <!-- 4. Vodafone Cash Section -->
        <payment-method-vodafone />

        <!-- 5. Safety Alert Section -->
        <payment-safety-alert />
      </div>

      <!-- 6. Fixed Status Bar -->
      <payment-status-bar />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "dashboard",
});

useHead({
  titleTemplate: () => "Settings - Payment Gateways",
});
</script>