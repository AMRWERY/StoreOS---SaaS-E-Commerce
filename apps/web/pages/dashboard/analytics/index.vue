<template>
  <div>
    <div class="min-h-screen text-[#e1e1e1] pb-12 selection:bg-indigo-500/30 overflow-x-hidden space-y-8">
      <analytics-header v-model:active-timeframe="activeTimeframe" v-model:compare-enabled="compareEnabled"
        @export="handleExport" />

      <analytics-kpi-grid :kpis="kpis" />

      <revenue-performance-chart />

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <category-revenue-list :categories="categories" class="lg:col-span-7" />
        <order-status-chart :status-breakdown="statusBreakdown" class="lg:col-span-5" />
      </div>

      <top-performance-tables :products="topProducts" :customers="topCustomers" />

      <sales-velocity-insight />
    </div>
  </div>
</template>

<script lang="ts" setup>
const activeTimeframe = ref('Last 7 days')
const compareEnabled = ref(true)

const handleExport = () => {
  console.log('Exporting report for', activeTimeframe.value)
}

// --- Mock Data ---
const kpis = [
  { label: 'Revenue', value: '$42,340.50', trend: '+12.5%', up: true },
  { label: 'Orders', value: '1,240', trend: '+8.2%', up: true },
  { label: 'Avg Order Value', value: '$33.20', trend: '-2.1%', up: false },
  { label: 'New Customers', value: '342', trend: '+4.8%', up: true },
  { label: 'Returning Customers', value: '890', trend: '+0.4%', up: true },
]

const categories = [
  { name: 'Fashion', amount: '$12,285.20', percentage: 75 },
  { name: 'Food & Beverage', amount: '$11,104.54', percentage: 60 },
  { name: 'Electronics', amount: '$9,401.30', percentage: 45 },
  { name: 'Beauty', amount: '$5,201.20', percentage: 25 },
]

const topProducts = [
  { name: 'Chronos V1 Watch', category: 'Accessories', sales: 432, revenue: '$53,584.00' },
  { name: 'SpeedRunner Pro', category: 'Footwear', sales: 312, revenue: '$38,750.20' },
  { name: 'Sonic Pure M2', category: 'Electronics', sales: 284, revenue: '$14,212.50' },
]

const topCustomers = [
  { name: 'Sarah Jenkins', type: 'Platinum Tier', orders: 42, spent: '$3,420.50' },
  { name: 'Marcus Chen', type: 'Gold Tier', orders: 28, spent: '$2,110.40' },
  { name: 'Elena Rodriguez', type: 'Gold Tier', orders: 15, spent: '$1,840.00' },
]

const statusBreakdown = [
  { name: 'Delivered', count: '912 units', color: 'bg-indigo-500', stroke: '#6366f1', offset: 0, dash: 70 },
  { name: 'Shipped', count: '184 units', color: 'bg-indigo-300', stroke: '#818cf8', offset: 70, dash: 15 },
  { name: 'Processing', count: '121 units', color: 'bg-orange-500', stroke: '#f97316', offset: 85, dash: 10 },
  { name: 'Cancelled', count: '23 units', color: 'bg-red-500', stroke: '#ef4444', offset: 95, dash: 5 },
]

definePageMeta({
  layout: 'dashboard'
});

useHead({
  titleTemplate: () => 'Analytics',
});
</script>