<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      <VStatCard v-for="stat in stats" :key="stat.label" v-bind="stat" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const stats = [
  { label: 'ORDERS TODAY', value: '142', trend: '+12.5% from yesterday', iconName: 'ph:chart-line-up-bold', iconColor: 'text-brand' },
  { label: 'REVENUE TODAY', value: '$12,840.00', trend: '+5.2% from yesterday', iconName: 'ph:wallet-bold', iconColor: 'text-info' },
  { label: 'PENDING ORDERS', value: '28', trend: 'Requires immediate fulfillment', iconName: 'ph:clock-bold', iconColor: 'text-accent' },
  { label: 'INVENTORY ALERTS', value: '09', trend: 'Items below safety threshold', iconName: 'ph:warning-circle-bold', iconColor: 'text-danger' },
]
</script>