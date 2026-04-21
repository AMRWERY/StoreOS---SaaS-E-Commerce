<template>
  <div>
    <section class="bg-bg-primary border border-border-subtle rounded-2xl p-6">
      <div class="flex items-center gap-3 mb-6">
        <Icon name="ph:chart-bar-bold" class="text-brand text-lg" />
        <h3 class="text-xs font-black tracking-widest text-tx-secondary">{{ $t('dashboard.settings.shipping.quickMetrics') }}</h3>
      </div>
      <div class="space-y-2">
        <div v-for="m in metrics" :key="m.label"
          class="flex items-center justify-between p-4 bg-bg-overlay border border-border-subtle rounded-xl">
          <span class="text-xs font-medium text-tx-secondary">{{ m.label }}</span>
          <span class="text-sm font-bold text-tx-secondary">{{ m.value }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

const metrics = computed(() => [
  { label: t('dashboard.settings.shipping.avgCostShipment'), value: '$12.45' },
  { label: t('dashboard.settings.shipping.freeShipUtilization'), value: '34.2%' }
])
</script>