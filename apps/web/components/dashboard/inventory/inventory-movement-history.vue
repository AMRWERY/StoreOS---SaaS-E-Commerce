<template>
  <div>
    <section class="bg-bg-primary border border-border-subtle rounded-2xl overflow-hidden shadow-2xl">
      <div class="p-6 border-b border-border-subtle flex justify-between items-center bg-bg-elevated">
        <h2 class="font-bold flex items-center gap-2">
          <Icon name="ph:clock-counter-clockwise-bold" class="text-brand" /> {{ $t('dashboard.inventory.movementHistory') }}
        </h2>
        <button
          class="text-[10px] font-black tracking-widest text-brand hover:text-brand hover:underline transition-colors mt-0.5 ms-2">
          {{ $t('dashboard.inventory.viewFullLog') }}
        </button>
      </div>
      <VTable :headers="headers" :items="historyLogs">
        <template #cell(date)="{ item }">
          <span class="text-[10px] font-bold text-tx-secondary tracking-widest">{{ item.date }}</span>
        </template>
        <template #cell(product)="{ item }">
          <span class="text-xs font-bold">{{ item.product }}</span>
        </template>
        <template #cell(type)="{ item }">
          <span class="rounded-full px-2 py-0.5 text-[10px] font-semibold"
            :class="item.type === 'Add' ? 'bg-success-dim text-success' : item.type === 'Remove' ? 'bg-danger-dim text-danger' : 'bg-info-dim text-info'">
            {{ item.type }}
          </span>
        </template>
        <template #cell(change)="{ item }">
          <span :class="item.change > 0 ? 'text-success' : item.change < 0 ? 'text-danger' : 'text-tx-secondary'">
            {{ item.change > 0 ? '+' + item.change : item.change }}
          </span>
        </template>
        <template #cell(newStock)="{ item }">
          <span class="text-sm font-bold text-tx-primary">{{ item.newStock }}</span>
        </template>
        <template #cell(reason)="{ item }">
          <span class="text-xs font-medium text-tx-secondary">{{ item.reason }}</span>
        </template>
        <template #cell(staff)="{ item }">
          <span class="text-xs font-bold text-tx-secondary tracking-wider">{{ item.staff }}</span>
        </template>
      </VTable>
    </section>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()

const headers = computed(() => [
  { label: t('dashboard.inventory.dateTime'), key: 'date', align: 'start' },
  { label: t('dashboard.inventory.product'), key: 'product', align: 'start' },
  { label: t('dashboard.inventory.type'), key: 'type', align: 'start' },
  { label: t('dashboard.inventory.qtyChange'), key: 'change', align: 'end' },
  { label: t('dashboard.inventory.newStock'), key: 'newStock', align: 'end' },
  { label: t('dashboard.inventory.reason'), key: 'reason', align: 'start' },
  { label: t('dashboard.inventory.staff'), key: 'staff', align: 'end' }
])

defineProps<{
  historyLogs: any[]
}>()
</script>