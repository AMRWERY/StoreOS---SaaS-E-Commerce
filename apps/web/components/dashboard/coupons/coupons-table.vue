<template>
  <section class="bg-[#0c0c0e] border border-white/5 rounded-3xl overflow-hidden mt-10">
    <VTable :headers="headers" :items="coupons">
      <template #cell(code)="{ item }">
        <span class="text-sm font-bold tracking-widest text-indigo-400 group-hover:text-indigo-300 transition-colors">
          #{{ item.code }}
        </span>
      </template>

      <template #cell(type)="{ item }">
        <span class="text-[9px] font-black px-2 py-1 rounded bg-white/5 text-gray-500 border border-white/5 tracking-widest">
          {{ item.type }}
        </span>
      </template>

      <template #cell(value)="{ item }">
        <span class="text-sm font-bold text-gray-300">{{ item.value }}</span>
      </template>

      <template #cell(minOrder)="{ item }">
        <span class="text-xs text-gray-600 font-bold">{{ item.minOrder }}</span>
      </template>

      <template #cell(usage)="{ item }">
        <div class="flex items-center gap-4">
          <div class="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div class="h-full rounded-full" :class="item.color" :style="{ width: item.usage + '%' }"></div>
          </div>
          <span class="text-[10px] font-bold text-gray-600">{{ item.usage }}%</span>
        </div>
      </template>
    </VTable>
  </section>
</template>

<script lang="ts" setup>
import type { Coupon } from '@/types/coupons';

defineProps<{
  coupons: Coupon[];
}>();

const headers = [
  { key: 'code', label: 'Code' },
  { key: 'type', label: 'Type', align: 'center' },
  { key: 'value', label: 'Value', align: 'center' },
  { key: 'minOrder', label: 'Min Order', align: 'center' },
  { key: 'usage', label: 'Usage' },
];
</script>
