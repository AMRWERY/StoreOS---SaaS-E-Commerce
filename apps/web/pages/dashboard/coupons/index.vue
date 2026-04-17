<template>
  <div class="min-h-screen text-[#e1e1e1] flex flex-col overflow-hidden pb-10 -mt-10">
    <!-- MAIN DASHBOARD CONTENT -->
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5 lg:px-4 lg:py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <coupons-header :totalCoupons="1284" @create="isPanelOpen = true" />

        <!-- Stats Grid -->
        <coupons-stats :stats="stats" />

        <!-- Coupons Table -->
        <coupons-table :coupons="coupons" />
      </div>
    </div>

    <!-- SIDE PANEL: CREATE COUPON -->
    <coupon-create-panel :isOpen="isPanelOpen" @close="isPanelOpen = false" @create="isPanelOpen = false" />
  </div>
</template>

<script lang="ts" setup>
const couponsStore = useCouponsStore()
const { isPanelOpen, stats, coupons } = storeToRefs(couponsStore)

definePageMeta({
  layout: 'dashboard',
});

useHead({
  titleTemplate: () => 'Coupons',
});
</script>
