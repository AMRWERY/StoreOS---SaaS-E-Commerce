<template>
  <div>
    <section class="bg-[#0c0c0e] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
      <div class="p-8 flex justify-between items-center bg-white/[0.01] border-b border-white/5">
        <h2 class="font-bold text-lg">Configured Zones</h2>
        <div class="flex items-center gap-4 text-gray-500">
          <button class="hover:text-white transition-colors">
            <Icon name="ph:sliders-horizontal-bold" />
          </button>
          <button class="hover:text-white transition-colors">
            <Icon name="ph:dots-three-vertical-bold" />
          </button>
        </div>
      </div>

      <VTable :headers="headers" :items="zones" tableClass="w-full text-start">
        <template #cell(name)="{ item }">
          <span class="text-sm font-bold group-hover:text-white transition-colors">{{ item.name }}</span>
        </template>

        <template #cell(regions)="{ item }">
          <div class="flex items-center gap-1.5 flex-wrap">
            <span v-for="region in item.regions" :key="region"
              class="bg-white/5 text-[9px] font-black text-gray-500 px-2 py-0.5 rounded uppercase tracking-tighter">
              {{ region }}
            </span>
            <span v-if="item.extraCount" class="text-[9px] font-bold text-gray-700">+{{ item.extraCount }}</span>
          </div>
        </template>

        <template #cell(flatPrice)="{ item }">
          <div class="flex items-center justify-end gap-2">
            <span class="text-[10px] font-bold text-gray-600">$</span>
            <span class="text-sm font-bold text-gray-300">{{ item.flatPrice }}</span>
          </div>
        </template>

        <template #cell(freeAbove)="{ item }">
          <div class="flex items-center justify-end gap-2">
            <span v-if="item.freeAbove !== 'NOT AVAILABLE'" class="text-[10px] font-bold text-gray-600">$</span>
            <span
              :class="[item.freeAbove === 'NOT AVAILABLE' ? 'italic text-gray-700 text-[10px]' : 'text-sm font-bold text-gray-300']">
              {{ item.freeAbove }}
            </span>
          </div>
        </template>
      </VTable>

      <div class="p-6 border-t border-white/5 text-center">
        <button
          class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 hover:text-indigo-400 transition-colors flex items-center justify-center gap-2 mx-auto">
          <Icon name="ph:caret-up-down-bold" />
          View all 14 zones
        </button>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import type { TableHeader } from '@storeos/ui/types/v-table'
import type { ShippingZone } from '@/types/shipping-logistics'

const headers: TableHeader[] = [
  { label: 'ZONE NAME', key: 'name' },
  { label: 'REGIONS', key: 'regions' },
  { label: 'FLAT PRICE', key: 'flatPrice', align: 'end' },
  { label: 'FREE ABOVE', key: 'freeAbove', align: 'end' }
]

const zones = ref<ShippingZone[]>([
  {
    name: 'Domestic - US',
    regions: ['ALL_US'],
    extraCount: 2,
    flatPrice: '5.00',
    freeAbove: '75.00'
  },
  {
    name: 'European Union',
    regions: ['DE', 'FR', 'IT'],
    extraCount: 24,
    flatPrice: '18.50',
    freeAbove: '150.00'
  },
  {
    name: 'Asia Pacific',
    regions: ['JP', 'SG', 'AU'],
    flatPrice: '22.00',
    freeAbove: 'NOT AVAILABLE'
  },
  {
    name: 'Canada & Mexico',
    regions: ['CA', 'MX'],
    flatPrice: '12.00',
    freeAbove: '100.00'
  }
])
</script>