<template>
  <section class="bg-bg-primary border border-border-subtle rounded-2xl overflow-hidden mt-10">
    <VTable :headers="headers" :items="coupons">
      <template #cell(code)="{ item }">
        <span class="text-sm font-bold tracking-widest text-brand group-hover:text-brand transition-colors">
          #{{ item.code }}
        </span>
      </template>

      <template #cell(type)="{ item }">
        <span
          class="text-[9px] font-black px-2 py-1 rounded bg-bg-elevated text-tx-secondary border border-border-subtle tracking-widest">
          {{ item.type }}
        </span>
      </template>

      <template #cell(value)="{ item }">
        <span class="text-sm font-bold text-tx-secondary">{{ item.value }}</span>
      </template>

      <template #cell(minOrder)="{ item }">
        <span class="text-xs text-tx-muted font-bold">{{ item.minOrder }}</span>
      </template>

      <template #cell(usage)="{ item }">
        <div class="flex items-center gap-4">
          <div class="flex-1 h-1.5 bg-bg-elevated rounded-full overflow-hidden">
            <div class="h-full rounded-full" :class="item.color" :style="{ width: item.usage + '%' }"></div>
          </div>
          <span class="text-[10px] font-bold text-tx-muted">{{ item.usage }}%</span>
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

const { t } = useI18n()

const headers = computed(() => [
  { key: 'code', label: t('dashboard.coupons.code') },
  { key: 'type', label: t('dashboard.coupons.type'), align: 'center' },
  { key: 'value', label: t('dashboard.coupons.value'), align: 'center' },
  { key: 'minOrder', label: t('dashboard.coupons.minOrder'), align: 'center' },
  { key: 'usage', label: t('dashboard.coupons.usage') },
]);
</script>