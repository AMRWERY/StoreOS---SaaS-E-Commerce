<template>
  <div>
    <section class="bg-[#0c0c0e] border border-white/5 rounded-[2.5rem] overflow-hidden">
      <div class="p-8 bg-white/[0.01] border-b border-white/5">
        <h3 class="font-bold text-lg">Feature Access</h3>
      </div>
      <div class="p-8">
        <!-- Column headers -->
        <div class="grid grid-cols-3 text-[10px] font-black text-gray-600 tracking-widest mb-6 px-4">
          <span>Capability</span>
          <span class="text-center">Current (Pro)</span>
          <span class="text-end">Enterprise</span>
        </div>
        <!-- Rows -->
        <div class="space-y-1">
          <div v-for="f in features" :key="f.capability"
            class="grid grid-cols-3 items-center p-4 rounded-xl hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/5">
            <span class="text-sm font-bold">{{ f.capability }}</span>
            <div class="flex justify-center">
              <span v-if="f.available" class="text-xs font-medium text-gray-400">{{ f.current }}</span>
              <Icon v-else name="ph:x-bold" class="text-red-500/50" />
            </div>
            <div class="flex justify-end items-center gap-2">
              <span class="text-xs font-bold text-indigo-400">{{ f.enterprise }}</span>
              <Icon name="ph:check-circle-fill" class="text-indigo-500 text-xs" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const features = [
  { capability: 'Team Seats', current: '15 Seats', enterprise: 'Unlimited', available: true },
  { capability: 'Custom Dashboards', current: '5 Total', enterprise: 'Unlimited', available: true },
  { capability: 'Data Retention', current: '90 Days', enterprise: '2 Years', available: true },
  { capability: 'Global SLA', current: 'None', enterprise: '99.99%', available: false },
]
</script>