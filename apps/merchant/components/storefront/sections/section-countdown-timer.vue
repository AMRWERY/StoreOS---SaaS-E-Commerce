<template>
  <div class="bg-neutral-900 px-8 py-12 text-center">
    <p class="text-xs font-bold tracking-widest text-neutral-400">
      {{ str('label', str('headline', 'Sale ends in')) }}
    </p>
    <div class="mt-6 flex justify-center gap-6">
      <div v-for="unit in timerUnits" :key="unit.label" class="flex flex-col items-center gap-1">
        <span class="text-4xl font-bold tabular-nums text-white">{{ unit.val }}</span>
        <span class="text-[10px] font-medium tracking-widest text-neutral-500">{{ unit.label }}</span>
      </div>
    </div>
    <button v-if="str('cta_text')" type="button"
      class="mt-8 rounded-md bg-white px-8 py-2.5 text-sm font-bold text-neutral-900 hover:bg-neutral-100">
      {{ str('cta_text') }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from '@/types/sections'

const props = defineProps<{ section: PageSection }>()
const str = (key: string, fallback = '') => String(props.section.settings[key] ?? fallback)

const TIMER_UNITS = [
  { val: '12', label: 'Days' },
  { val: '03', label: 'Hours' },
  { val: '47', label: 'Minutes' },
  { val: '22', label: 'Seconds' },
]

const timerUnits = computed(() => {
  const endDate = str('end_date')
  if (!endDate) return TIMER_UNITS
  const diff = new Date(endDate).getTime() - Date.now()
  if (diff <= 0) return [{ val: '00', label: 'Days' }, { val: '00', label: 'Hours' }, { val: '00', label: 'Minutes' }, { val: '00', label: 'Seconds' }]
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  return [
    { val: String(d).padStart(2, '0'), label: 'Days' },
    { val: String(h).padStart(2, '0'), label: 'Hours' },
    { val: String(m).padStart(2, '0'), label: 'Minutes' },
    { val: String(s).padStart(2, '0'), label: 'Seconds' },
  ]
})
</script>