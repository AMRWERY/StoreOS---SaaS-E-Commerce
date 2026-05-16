<template>
  <div>
    <div
      class="bg-bg-primary border border-border-subtle rounded-2xl px-4 py-3.5 flex flex-col md:flex-row items-center gap-10">
      <div class="relative w-48 h-48 shrink-0">
        <svg viewBox="0 0 36 36" class="w-full h-full -rotate-90">
          <circle v-for="s in statusBreakdown" :key="s.name" cx="18" cy="18" r="15.5" fill="none" :stroke="s.stroke"
            stroke-width="3" :stroke-dasharray="`${s.dash} 100`" :stroke-dashoffset="-s.offset"
            stroke-linecap="round" />
        </svg>
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <span class="text-3xl font-bold">1,240</span>
          <span class="text-[9px] font-black text-tx-muted tracking-[0.2em] mt-1">Total</span>
        </div>
      </div>
      <div class="space-y-5 flex-1 w-full">
        <h3 class="font-bold mb-4">Order Status Breakdown</h3>
        <div v-for="s in statusBreakdown" :key="s.name" class="flex items-center justify-between group cursor-pointer">
          <div class="flex items-center gap-3">
            <div class="w-2.5 h-2.5 rounded-full" :class="s.color"></div>
            <span class="text-[11px] font-bold text-tx-secondary group-hover:text-tx-primary transition-colors">{{
              s.name
              }}</span>
          </div>
          <span class="text-[10px] font-black text-tx-muted">{{ s.count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { StatusItem } from '@/types/analytics';

defineProps<{
  statusBreakdown: StatusItem[]
}>()
</script>