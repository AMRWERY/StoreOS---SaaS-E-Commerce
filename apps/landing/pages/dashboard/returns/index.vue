<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.returns.title')"
          :subtitle="t('dashboard.ops.returns.subtitle')"
          :count="returns.length"
        />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LazyVStatCard
            :label="t('dashboard.ops.returns.stats.open')"
            :value="openCount"
            iconName="ph:arrow-u-down-left-bold"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.returns.stats.refunded')"
            :value="money(refundedTotal)"
            iconName="ph:receipt-bold"
            iconColor="text-success"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.returns.stats.rate')"
            :value="'3.4%'"
            iconName="ph:percent-bold"
            iconColor="text-warning"
          />
        </div>

        <LazyVTabs v-model="tab" :tabs="tabs" />

        <section class="card overflow-hidden">
          <LazyVTable v-if="filtered.length" :headers="headers" :items="filtered">
            <template #cell(id)="{ item }">
              <span class="font-mono text-sm font-semibold text-brand">{{ item.id }}</span>
            </template>
            <template #cell(orderId)="{ item }">
              <span class="font-mono text-xs">{{ item.orderId }}</span>
            </template>
            <template #cell(reason)="{ item }">
              <span class="text-xs text-tx-secondary">{{ t(`dashboard.ops.returns.reasons.${item.reason}`) }}</span>
            </template>
            <template #cell(amount)="{ item }">
              <span class="font-mono text-sm">{{ money(item.amount) }}</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="tones[item.status]">
                {{ t(`dashboard.ops.returns.status.${item.status}`) }}
              </status-pill>
            </template>
            <template #cell(actions)="{ item }">
              <div class="flex justify-end gap-2">
                <LazyVButton
                  v-if="item.status === 'requested'"
                  size="none"
                  variant="secondary"
                  className="px-3 py-1 text-[11px]"
                  :label="t('dashboard.ops.returns.approve')"
                  @click="setStatus(item.id, 'approved')"
                />
                <LazyVButton
                  v-if="item.status === 'requested'"
                  size="none"
                  variant="ghost"
                  className="px-3 py-1 text-[11px]"
                  :label="t('dashboard.ops.returns.reject')"
                  @click="setStatus(item.id, 'rejected')"
                />
                <LazyVButton
                  v-if="item.status === 'approved'"
                  size="none"
                  variant="secondary"
                  className="px-3 py-1 text-[11px]"
                  :label="t('dashboard.ops.returns.markReceived')"
                  @click="setStatus(item.id, 'received')"
                />
                <LazyVButton
                  v-if="item.status === 'received'"
                  size="none"
                  className="px-3 py-1 text-[11px]"
                  :label="t('dashboard.ops.returns.refund')"
                  @click="setStatus(item.id, 'refunded')"
                />
              </div>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.returns.empty')"
            :hint="t('dashboard.ops.returns.emptyHint')"
            icon="ph:arrow-u-down-left-bold"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ReturnStatus, Tone } from '@/types/operations'

const { t } = useI18n()
const { money } = useOpsFormat()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.returns.title') })

const store = useReturnsStore()
const { returns } = storeToRefs(store)
const { setStatus } = store

const tab = ref('all')
const tabs = computed(() => [
  { name: t('dashboard.ops.common.all'), value: 'all', count: returns.value.length },
  ...(['requested', 'approved', 'received', 'refunded', 'rejected'] as ReturnStatus[]).map((s) => ({
    name: t(`dashboard.ops.returns.status.${s}`),
    value: s,
    count: returns.value.filter((r) => r.status === s).length,
  })),
])

const filtered = computed(() =>
  tab.value === 'all' ? returns.value : returns.value.filter((r) => r.status === tab.value),
)
const openCount = computed(
  () => returns.value.filter((r) => ['requested', 'approved', 'received'].includes(r.status)).length,
)
const refundedTotal = computed(() =>
  returns.value.filter((r) => r.status === 'refunded').reduce((s, r) => s + r.amount, 0),
)

const tones: Record<string, Tone> = {
  requested: 'warning',
  approved: 'info',
  received: 'purple',
  refunded: 'success',
  rejected: 'danger',
}

const headers = computed(() => [
  { key: 'id', label: t('dashboard.ops.returns.id') },
  { key: 'orderId', label: t('dashboard.ops.common.order') },
  { key: 'customer', label: t('dashboard.ops.common.customer') },
  { key: 'reason', label: t('dashboard.ops.returns.reason') },
  { key: 'amount', label: t('dashboard.ops.common.amount') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
  { key: 'actions', label: '', align: 'end' as const },
])
</script>
