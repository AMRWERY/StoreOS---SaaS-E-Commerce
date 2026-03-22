<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      <div v-for="stat in stats" :key="stat.label"
        class="bg-[#0c0c0e] border border-white/5 rounded-2xl p-6 group hover:border-white/10 transition-all text-start">
        <div class="flex justify-between items-start mb-6">
          <span class="text-[10px] font-black text-gray-600 tracking-[0.15em]">{{ stat.label }}</span>
          <div :class="[stat.iconBg, stat.iconColor, 'p-2 rounded-lg']">
            <icon :name="stat.icon" class="text-lg" />
          </div>
        </div>
        <p class="text-3xl font-bold mb-2">{{ stat.value }}</p>
        <p class="text-[11px] text-emerald-500 font-medium">{{ stat.trend }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const stats = [
  { label: 'ORDERS TODAY', value: '142', trend: '+12.5% from yesterday', icon: 'ph:chart-line-up-bold', iconBg: 'bg-indigo-500/10', iconColor: 'text-indigo-500' },
  { label: 'REVENUE TODAY', value: '$12,840.00', trend: '+5.2% from yesterday', icon: 'ph:wallet-bold', iconBg: 'bg-blue-500/10', iconColor: 'text-blue-500' },
  { label: 'PENDING ORDERS', value: '28', trend: 'Requires immediate fulfillment', icon: 'ph:clock-bold', iconBg: 'bg-orange-500/10', iconColor: 'text-orange-500' },
  { label: 'INVENTORY ALERTS', value: '09', trend: 'Items below safety threshold', icon: 'ph:warning-circle-bold', iconBg: 'bg-red-500/10', iconColor: 'text-red-500' },
]
</script>