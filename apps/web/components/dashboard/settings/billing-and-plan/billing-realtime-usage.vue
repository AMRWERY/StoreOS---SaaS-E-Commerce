<template>
  <div>
    <section class="bg-[#0c0c0e] border border-white/5 rounded-[2.5rem] p-8">
      <h3 class="text-[10px] font-black text-gray-600 tracking-widest mb-8">Real-time Usage</h3>
      <div class="space-y-6">
        <div v-for="item in usageItems" :key="item.label" class="flex items-center gap-5">
          <div :class="['w-12 h-12 rounded-2xl flex items-center justify-center shrink-0', item.bgClass]">
            <Icon :name="item.icon" :class="['text-2xl', item.iconClass]" />
          </div>
          <div>
            <p class="text-[9px] font-black text-gray-700 mb-1">{{ item.label }}</p>
            <p class="text-lg font-bold">
              {{ item.value }}
              <span class="text-gray-600 text-xs font-medium">{{ item.sub }}</span>
            </p>
          </div>
        </div>
      </div>
      <VButton variant="ghost" label="View detailed metrics"
        className="w-full mt-10 py-4 text-[10px] font-black tracking-widest" />
    </section>
  </div>
</template>

<script lang="ts" setup>
const usageItems = [
  {
    label: 'Connected Nodes',
    value: '124',
    sub: '/ 150',
    icon: 'ph:circles-four-duotone',
    iconClass: 'text-indigo-400',
    bgClass: 'bg-indigo-600/10',
  },
  {
    label: 'Data Ingress',
    value: '1.2 TB',
    sub: '/ mo',
    icon: 'ph:cloud-arrow-down-duotone',
    iconClass: 'text-orange-400',
    bgClass: 'bg-orange-600/10',
  },
]
</script>