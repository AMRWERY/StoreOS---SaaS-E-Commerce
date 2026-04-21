<template>
  <div>
    <section class="bg-bg-primary border border-border-subtle rounded-2xl px-4 py-3.5 relative overflow-hidden">
      <div class="flex flex-col md:flex-row justify-between gap-8 mb-6">
        <div>
          <p class="text-[10px] font-black text-tx-muted tracking-widest mb-4">{{ $t('dashboard.settings.billing.activePlan') }}</p>
          <h2 class="text-4xl font-bold flex items-baseline gap-3">
            Pro Scale <span class="text-brand text-lg font-black tracking-widest">v2.4</span>
          </h2>
          <div class="flex gap-10 mt-6">
            <div>
              <p class="text-[9px] font-black text-tx-muted tracking-widest mb-1">{{ $t('dashboard.settings.billing.billingCycle') }}</p>
              <p class="text-sm font-bold">{{ $t('dashboard.orders.thisMonth') }}</p>
            </div>
            <div>
              <p class="text-[9px] font-black text-tx-muted tracking-widest mb-1">{{ $t('dashboard.settings.billing.nextRenewal') }}</p>
              <p class="text-sm font-bold">Oct 24, 2026</p>
            </div>
          </div>
        </div>

        <!-- Monthly Total Box -->
        <div
          class="bg-bg-overlay border border-border-subtle rounded-2xl px-4 py-3.5 flex flex-col items-center justify-center min-w-[220px]">
          <p class="text-[9px] font-black text-tx-muted tracking-widest mb-2">{{ $t('dashboard.settings.billing.currentMonthlyTotal') }}</p>
          <div class="flex items-start">
            <span class="text-xl font-bold text-tx-muted mt-1">$</span>
            <span class="text-5xl font-bold tracking-tighter">249.00</span>
          </div>
          <p class="text-[9px] font-bold text-tx-muted mt-3">+ $12.50 Overages</p>
        </div>
      </div>

      <!-- Usage Progress Bars -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="m in usageMetrics" :key="m.label" class="space-y-3">
          <p class="text-[10px] font-black text-tx-secondary tracking-widest">{{ m.label }}</p>
          <VProgressBar :progress="m.percent" :color="m.color" :trackVariant="m.trackVariant" :height="6"
            :shadow="true" />
          <div class="flex justify-between text-[10px] font-bold">
            <span class="text-tx-secondary">{{ m.current }} / {{ m.total }}</span>
            <span class="text-tx-muted">{{ m.percent }}%</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

const usageMetrics = computed(() => [
  { label: t('dashboard.settings.billing.operations'), current: '7.5k', total: '10k', percent: 75, color: 'indigo', trackVariant: 'indigo' },
  { label: t('dashboard.settings.billing.apiCalls'), current: '4.2M', total: '10M', percent: 42, color: 'green', trackVariant: 'green' },
  { label: t('dashboard.settings.billing.storage'), current: '44GB', total: '50GB', percent: 88, color: 'amber', trackVariant: 'amber' },
])
</script>