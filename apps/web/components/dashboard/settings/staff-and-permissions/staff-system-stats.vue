<template>
  <div>
    <footer class="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto pt-12 border-t border-border-subtle">
      <div v-for="stat in systemStats" :key="stat.label">
        <h5 class="text-[9px] font-bold text-tx-muted tracking-widest mb-2">{{ stat.label }}</h5>
        <div class="flex items-baseline gap-2">
          <span class="text-xl font-bold">{{ stat.value }}</span>
          <span :class="[stat.color, 'text-[10px] font-black tracking-tight']">{{ stat.status }}</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

const systemStats = computed(() => [
  { label: t('dashboard.settings.staff.globalAvailability'), value: '99.8%', status: t('dashboard.settings.staff.stable'), color: 'text-success' },
  { label: t('dashboard.settings.staff.pendingInvites'), value: '02', status: t('dashboard.settings.staff.waiting'), color: 'text-accent' },
  { label: t('dashboard.settings.staff.lastAudit'), value: '14h', status: t('dashboard.settings.staff.ago'), color: 'text-tx-muted' },
  { label: t('dashboard.settings.staff.compliance'), value: 'SOC2', status: t('dashboard.settings.staff.ready'), color: 'text-brand font-black' }
]);
</script>