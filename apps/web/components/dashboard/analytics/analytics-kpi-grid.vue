<template>
  <div>
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-6">
      <VStatCard v-for="kpi in kpis" :key="kpi.label" :label="kpi.label" :value="kpi.value"
        :icon-name="kpi.up ? 'ph:trend-up-bold' : 'ph:trend-down-bold'"
        :icon-color="kpi.up ? 'text-emerald-500' : 'text-red-500'" :trend="kpi.trend"
        :trend-color="kpi.up ? 'text-emerald-500' : 'text-red-500'" sub="vs. prev." />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { KPI } from '@/types/analytics';

defineProps<{
  kpis: KPI[]
}>()
</script>