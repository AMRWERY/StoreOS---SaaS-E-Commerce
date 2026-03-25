<template>
  <div>
    <section class="bg-[#0c0c0e] border border-white/5 rounded-2xl p-6">
      <div class="flex items-center gap-3 mb-6">
        <Icon name="ph:chart-bar-bold" class="text-indigo-400 text-lg" />
        <h3 class="text-xs font-black uppercase tracking-widest text-gray-400">Quick Metrics</h3>
      </div>
      <div class="space-y-2">
        <div v-for="m in metrics" :key="m.label"
          class="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-xl">
          <span class="text-xs font-medium text-gray-500">{{ m.label }}</span>
          <span class="text-sm font-bold text-gray-200">{{ m.value }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const metrics = [
  { label: 'Avg. Cost/Shipment', value: '$12.45' },
  { label: 'Free Ship. Utilization', value: '34.2%' }
]
</script>