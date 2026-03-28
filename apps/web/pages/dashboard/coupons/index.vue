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
const isPanelOpen = ref(false);

// --- Mock Data ---
const stats = [
  { label: 'ACTIVE COUPONS', value: '1,284', trend: '+12%', up: true },
  { label: 'TOTAL REDEMPTIONS', value: '42,901', trend: null, up: false },
  { label: 'REVENUE GENERATED', value: '$ 840k', trend: null, up: false },
];

const coupons = [
  { code: 'SUMMER24', type: 'PERCENTAGE', value: '15%', minOrder: '$ 500', usage: 45, color: 'bg-indigo-500' },
  { code: 'WELCOME50', type: 'FIXED', value: '$ 50', minOrder: '-', usage: 72, color: 'bg-orange-500' },
  { code: 'OLD_COOB', type: 'PERCENTAGE', value: '10%', minOrder: '$ 300', usage: 12, color: 'bg-indigo-500' },
];

definePageMeta({
  layout: 'dashboard',
});

useHead({
  titleTemplate: () => 'Coupons',
});
</script>