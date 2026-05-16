<template>
  <div>
    <div class="min-h-screen text-tx-primary pb-12 selection:bg-indigo-500/30 overflow-x-hidden space-y-8">
      <analytics-header v-model:active-timeframe="activeTimeframe" v-model:compare-enabled="compareEnabled"
        @export="handleExport" />

      <analytics-kpi-grid :kpis="kpis" />

      <revenue-performance-chart />

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-3">
        <category-revenue-list :categories="categories" class="lg:col-span-7" />
        <order-status-chart :status-breakdown="statusBreakdown" class="lg:col-span-5" />
      </div>

      <top-performance-tables :products="topProducts" :customers="topCustomers" />

      <sales-velocity-insight />
    </div>
  </div>
</template>

<script lang="ts" setup>
const analyticsStore = useAnalyticsStore()
const { activeTimeframe, compareEnabled, kpis, categories, topProducts, topCustomers, statusBreakdown } = storeToRefs(analyticsStore)
const { handleExport } = analyticsStore

definePageMeta({
  layout: 'dashboard'
});

useHead({
  titleTemplate: () => 'Analytics',
});
</script>
