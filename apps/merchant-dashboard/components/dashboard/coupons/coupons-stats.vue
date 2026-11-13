<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <LazyVStatCard
      v-for="stat in stats"
      :key="stat.label"
      :label="stat.labelKey ? t(stat.labelKey) : stat.label"
      :value="stat.value"
      :trend="stat.trend"
      iconName="ph:ticket-bold"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Stat } from "@/types/coupons";

const { t } = useI18n();

defineProps<{
  stats: Stat[];
}>();
</script>