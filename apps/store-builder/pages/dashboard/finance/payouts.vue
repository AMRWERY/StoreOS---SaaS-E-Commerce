<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header :title="t(`${p}.title`)" :subtitle="t(`${p}.subtitle`)" :count="payouts.length" />

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <LazyVStatCard :label="t(`${p}.stats.available`)" :value="money(available)" iconName="ph:wallet-bold" iconColor="text-success" />
          <LazyVStatCard :label="t(`${p}.stats.pending`)" :value="money(pending)" iconName="ph:hourglass-bold" iconColor="text-warning" />
          <LazyVStatCard :label="t(`${p}.stats.nextPayout`)" :value="nextPayoutDate" iconName="ph:calendar-check-bold" iconColor="text-info" />
          <LazyVStatCard :label="t(`${p}.stats.fees`)" :value="money(totalFees)" iconName="ph:receipt-bold" iconColor="text-accent" />
        </div>

        <section class="card overflow-hidden">
          <div class="p-4 border-b border-border-subtle">
            <h2 class="text-sm font-bold">{{ t(`${p}.payoutsTitle`) }}</h2>
          </div>
          <LazyVTable v-if="payouts.length" :headers="payoutHeaders" :items="payouts">
            <template #cell(id)="{ item }">
              <span class="font-mono text-sm font-semibold text-brand">{{ item.id }}</span>
            </template>
            <template #cell(date)="{ item }">
              <span class="font-mono text-xs text-tx-muted">{{ item.date }}</span>
            </template>
            <template #cell(amount)="{ item }">
              <span class="font-mono text-sm font-semibold">{{ money(item.amount) }}</span>
            </template>
            <template #cell(orders)="{ item }">
              <span class="font-mono text-sm">{{ item.orders }}</span>
            </template>
            <template #cell(fees)="{ item }">
              <span class="font-mono text-sm text-tx-secondary">{{ money(item.fees) }}</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="tones[item.status]">{{ t(`${p}.status.${item.status}`) }}</status-pill>
            </template>
          </LazyVTable>
          <ops-empty-state v-else :title="t(`${p}.empty`)" :hint="t(`${p}.emptyHint`)" icon="ph:bank-bold" />
        </section>

        <section class="card p-4 space-y-4">
          <h2 class="text-sm font-bold">{{ t(`${p}.splitTitle`) }}</h2>
          <div v-if="splitTotal" class="space-y-4">
            <div v-for="s in splitRows" :key="s.key" class="space-y-1.5">
              <div class="flex items-center justify-between text-xs">
                <span class="font-semibold">{{ t(`${p}.split.${s.key}`) }}</span>
                <span class="font-mono">{{ money(s.value) }} - {{ s.pct.toFixed(1) }}%</span>
              </div>
              <insight-bar :pct="s.pct" :tone="s.tone" />
            </div>
          </div>
          <ops-empty-state v-else :title="t(`${p}.empty`)" :hint="t(`${p}.emptyHint`)" icon="ph:chart-pie-bold" />
        </section>

        <section class="card overflow-hidden">
          <div class="p-4 border-b border-border-subtle">
            <h2 class="text-sm font-bold">{{ t(`${p}.statementsTitle`) }}</h2>
          </div>
          <LazyVTable v-if="statements.length" :headers="statementHeaders" :items="statements">
            <template #cell(id)="{ item }">
              <span class="font-mono text-sm font-semibold">{{ item.id }}</span>
            </template>
            <template #cell(period)="{ item }">
              <span class="font-mono text-xs text-tx-muted">{{ item.period }}</span>
            </template>
            <template #cell(gmv)="{ item }">
              <span class="font-mono text-sm">{{ money(item.gmv) }}</span>
            </template>
            <template #cell(fee)="{ item }">
              <span class="font-mono text-sm font-semibold">{{ money(item.fee) }}</span>
            </template>
            <template #cell(actions)="{ item }">
              <LazyVButton
                variant="secondary"
                icon="ph:download-simple-bold"
                iconPosition="left"
                size="none"
                className="px-3 py-1.5 text-xs"
                :label="t(`${p}.download`)"
                :aria-label="t(`${p}.downloadStatement`, { id: item.id })"
              />
            </template>
          </LazyVTable>
          <ops-empty-state v-else :title="t(`${p}.emptyStatements`)" :hint="t(`${p}.emptyHint`)" icon="ph:receipt-bold" />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'

const { t } = useI18n()
const { money } = useOpsFormat()
const p = 'dashboard.ops.payouts'

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.payouts.title') })

const { available, pending, nextPayoutDate, payouts, statements, split } = storeToRefs(useFinPayoutsStore())

const tones: Record<string, Tone> = { paid: 'success', inTransit: 'info', failed: 'danger' }

const totalFees = computed(() => payouts.value.reduce((s, x) => s + x.fees, 0))
const splitTotal = computed(() => split.value.cod + split.value.online)
const splitRows = computed(() => [
  { key: 'cod', value: split.value.cod, pct: splitTotal.value ? (split.value.cod / splitTotal.value) * 100 : 0, tone: 'warning' as const },
  { key: 'online', value: split.value.online, pct: splitTotal.value ? (split.value.online / splitTotal.value) * 100 : 0, tone: 'brand' as const },
])

const payoutHeaders = computed(() => [
  { key: 'id', label: t(`${p}.payoutId`) },
  { key: 'date', label: t('dashboard.ops.common.date') },
  { key: 'amount', label: t('dashboard.ops.common.amount') },
  { key: 'orders', label: t(`${p}.orders`) },
  { key: 'fees', label: t(`${p}.fees`) },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
])
const statementHeaders = computed(() => [
  { key: 'id', label: t(`${p}.statement`) },
  { key: 'period', label: t(`${p}.period`) },
  { key: 'gmv', label: t(`${p}.gmv`) },
  { key: 'fee', label: t(`${p}.platformFee`) },
  { key: 'actions', label: '', align: 'end' as const },
])
</script>
