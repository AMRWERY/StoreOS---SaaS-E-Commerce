<template>
  <div class="h-full">
    <div class="h-full bg-bg-primary border border-border-subtle rounded-xl px-4 py-3.5 group hover:border-border-default transition-all">
      <div class="flex justify-between items-start mb-8">
        <h3 class="text-[10px] font-semibold text-tx-muted tracking-[0.6px]">{{ label }}</h3>
        <Icon :name="iconName" :class="[iconColor || 'text-brand', 'text-xl']" />
      </div>
      <p :class="[valueColor || 'text-tx-primary', 'font-mono text-[22px] font-semibold mb-3 tracking-tight']">{{ value }}</p>
      <div class="flex items-center gap-2">
        <span v-if="trend" :class="[trendColor || 'text-success', 'text-[10px] font-bold']">{{ trend }}</span>
        <span v-if="sub" class="text-[10px] text-tx-muted font-medium">{{ sub }}</span>
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
