<template>
  <div class="h-full">
    <div class="h-full bg-[#0c0c0e] border border-white/5 rounded-3xl p-8 group hover:border-white/10 transition-all">
      <div class="flex justify-between items-start mb-8">
        <h3 class="text-[10px] font-black text-gray-600 uppercase tracking-widest">{{ label }}</h3>
        <Icon :name="iconName" :class="[iconColor || 'text-indigo-400', 'text-xl']" />
      </div>
      <p :class="[valueColor || 'text-white', 'text-3xl font-bold mb-3 tracking-tight']">{{ value }}</p>
      <div class="flex items-center gap-2">
        <span v-if="trend" :class="[trendColor || 'text-emerald-500', 'text-[10px] font-bold']">{{ trend }}</span>
        <span v-if="sub" class="text-[10px] text-gray-600 font-medium">{{ sub }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  label: string
  value: string | number
  iconName: string
  iconColor?: string
  valueColor?: string
  trend?: string
  trendColor?: string
  sub?: string
}>()
</script>