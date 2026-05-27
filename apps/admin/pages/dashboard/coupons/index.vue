<template>
  <LayoutsFeatureGate
    feature="coupons"
    title="Coupon Builder"
    description="Create discount campaigns, percentage or fixed-amount codes, and usage limits. Available on Starter and above."
    :required-plans="['starter', 'growth', 'enterprise']"
    :blur-content="true"
  >
    <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
      <!-- MAIN DASHBOARD CONTENT -->
      <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5 lg:px-4 lg:py-3.5">
        <div class="max-w-5xl mx-auto space-y-6">
          <coupons-header :totalCoupons="1284" @create="isPanelOpen = true" />
          <coupons-stats :stats="stats" />
          <coupons-table :coupons="coupons" />
        </div>
      </div>
      <coupon-create-panel :isOpen="isPanelOpen" @close="isPanelOpen = false" @create="isPanelOpen = false" />
    </div>
  </LayoutsFeatureGate>
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
