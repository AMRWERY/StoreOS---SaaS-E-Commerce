<template>
  <div>
    <footer class="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto pt-12 border-t border-white/5">
      <div v-for="stat in systemStats" :key="stat.label">
        <h5 class="text-[9px] font-bold text-gray-700 uppercase tracking-widest mb-2">{{ stat.label }}</h5>
        <div class="flex items-baseline gap-2">
          <span class="text-xl font-bold">{{ stat.value }}</span>
          <span :class="[stat.color, 'text-[10px] font-black uppercase tracking-tight']">{{ stat.status }}</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
const systemStats = [
  { label: 'GLOBAL AVAILABILITY', value: '99.8%', status: 'STABLE', color: 'text-emerald-500' },
  { label: 'PENDING INVITES', value: '02', status: 'WAITING', color: 'text-orange-500' },
  { label: 'LAST AUDIT', value: '14h', status: 'AGO', color: 'text-gray-600' },
  { label: 'COMPLIANCE', value: 'SOC2', status: 'READY', color: 'text-indigo-400 font-black' }
];
</script>