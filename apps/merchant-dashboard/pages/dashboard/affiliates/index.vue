<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-6xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.affiliates.title')"
          :subtitle="t('dashboard.ops.affiliates.subtitle')"
          :count="affiliates.length"
        />

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <LazyVStatCard
            :label="t('dashboard.ops.affiliates.stats.total')"
            :value="affiliates.length"
            iconName="ph:users-bold"
            valueColor="font-mono"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.affiliates.stats.pending')"
            :value="affiliates.filter((a) => a.status === 'pending').length"
            iconName="ph:hourglass-bold"
            iconColor="text-warning"
            valueColor="font-mono"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.affiliates.stats.clicks')"
            :value="totalClicks.toLocaleString('en-US')"
            iconName="ph:cursor-click-bold"
            iconColor="text-info"
            valueColor="font-mono"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.affiliates.stats.earnings')"
            :value="money(totalEarnings)"
            iconName="ph:coins-bold"
            iconColor="text-success"
            valueColor="font-mono"
          />
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <section class="card overflow-hidden xl:col-span-2">
            <LazyVTable v-if="affiliates.length" :headers="headers" :items="affiliates">
              <template #cell(name)="{ item }">
                <div>
                  <p class="text-sm font-semibold">{{ item.name }}</p>
                  <p class="font-mono text-[10px] text-tx-muted">{{ item.id }}</p>
                </div>
              </template>
              <template #cell(code)="{ item }">
                <span class="font-mono text-xs font-semibold tracking-wider text-brand">{{ item.code }}</span>
              </template>
              <template #cell(clicks)="{ item }">
                <span class="font-mono text-sm">{{ item.clicks.toLocaleString('en-US') }}</span>
              </template>
              <template #cell(orders)="{ item }">
                <span class="font-mono text-sm">{{ item.orders }}</span>
              </template>
              <template #cell(commission)="{ item }">
                <span class="font-mono text-sm">{{ item.commission }}%</span>
              </template>
              <template #cell(earnings)="{ item }">
                <span class="font-mono text-sm font-semibold">{{ money(item.earnings) }}</span>
              </template>
              <template #cell(status)="{ item }">
                <status-pill :tone="tones[item.status]">{{ t(`dashboard.ops.affiliates.status.${item.status}`) }}</status-pill>
              </template>
              <template #cell(actions)="{ item }">
                <div class="flex items-center justify-end gap-3">
                  <button
                    v-if="item.status !== 'approved'"
                    class="text-[11px] font-semibold text-tx-muted hover:text-success transition-colors"
                    @click="setStatus(item.id, 'approved')"
                  >
                    {{ item.status === 'blocked' ? t('dashboard.ops.affiliates.unblock') : t('dashboard.ops.affiliates.approve') }}
                  </button>
                  <button
                    v-if="item.status !== 'blocked'"
                    class="text-[11px] font-semibold text-tx-muted hover:text-danger transition-colors"
                    @click="setStatus(item.id, 'blocked')"
                  >
                    {{ t('dashboard.ops.affiliates.block') }}
                  </button>
                </div>
              </template>
            </LazyVTable>
            <ops-empty-state
              v-else
              :title="t('dashboard.ops.affiliates.empty')"
              :hint="t('dashboard.ops.affiliates.emptyHint')"
              icon="ph:handshake-bold"
            />
          </section>

          <section class="card space-y-4 p-5">
            <h2 class="text-sm font-semibold">{{ t('dashboard.ops.affiliates.settings.title') }}</h2>
            <LazyVInput
              type="number"
              :label="t('dashboard.ops.affiliates.settings.defaultCommission')"
              :model-value="settings.defaultCommission"
              @update:model-value="settings.defaultCommission = Number($event) || 0"
            />
            <LazyVInput
              type="number"
              :label="t('dashboard.ops.affiliates.settings.cookieDays')"
              :model-value="settings.cookieDays"
              @update:model-value="settings.cookieDays = Number($event) || 0"
            />
            <LazyVInput
              type="number"
              :label="t('dashboard.ops.affiliates.settings.minPayout')"
              :model-value="settings.minPayout"
              @update:model-value="settings.minPayout = Number($event) || 0"
            />
            <LazyVSwitchButton v-model="settings.autoApprove" :label="t('dashboard.ops.affiliates.settings.autoApprove')" />
            <LazyVButton class="w-full" :label="t('dashboard.ops.common.save')" @click="saveSettings" />
            <p v-if="saved" class="text-[11px] font-semibold text-success">{{ t('dashboard.ops.affiliates.settings.saved') }}</p>
          </section>
        </div>

        <section class="card overflow-hidden">
          <div class="border-b border-border-subtle px-5 py-3">
            <h2 class="text-sm font-semibold">{{ t('dashboard.ops.affiliates.payouts.title') }}</h2>
          </div>
          <LazyVTable v-if="payouts.length" :headers="payoutHeaders" :items="payouts">
            <template #cell(id)="{ item }">
              <span class="font-mono text-xs text-tx-muted">{{ item.id }}</span>
            </template>
            <template #cell(amount)="{ item }">
              <span class="font-mono text-sm font-semibold">{{ money(item.amount) }}</span>
            </template>
            <template #cell(date)="{ item }">
              <span class="font-mono text-xs text-tx-muted">{{ item.date }}</span>
            </template>
            <template #cell(method)="{ item }">
              <span class="text-xs text-tx-secondary">{{ t(`dashboard.ops.affiliates.payouts.method.${item.method}`) }}</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="payoutTones[item.status]">
                {{ t(`dashboard.ops.affiliates.payouts.status.${item.status}`) }}
              </status-pill>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.affiliates.payouts.empty')"
            :hint="t('dashboard.ops.affiliates.payouts.emptyHint')"
            icon="ph:bank-bold"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'

const { t } = useI18n()
const { money } = useOpsFormat()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.affiliates.title') })

const store = useMktAffiliatesStore()
const { affiliates, settings, payouts } = storeToRefs(store)
const { setStatus } = store

const totalClicks = computed(() => affiliates.value.reduce((s, a) => s + a.clicks, 0))
const totalEarnings = computed(() => affiliates.value.reduce((s, a) => s + a.earnings, 0))

const tones: Record<string, Tone> = { pending: 'warning', approved: 'success', blocked: 'danger' }
const payoutTones: Record<string, Tone> = { paid: 'success', pending: 'warning' }

const headers = computed(() => [
  { key: 'name', label: t('dashboard.ops.affiliates.cols.affiliate') },
  { key: 'code', label: t('dashboard.ops.affiliates.cols.code') },
  { key: 'clicks', label: t('dashboard.ops.affiliates.cols.clicks') },
  { key: 'orders', label: t('dashboard.ops.affiliates.cols.orders') },
  { key: 'commission', label: t('dashboard.ops.affiliates.cols.commission') },
  { key: 'earnings', label: t('dashboard.ops.affiliates.cols.earnings') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
  { key: 'actions', label: '', align: 'end' as const },
])
const payoutHeaders = computed(() => [
  { key: 'id', label: t('dashboard.ops.affiliates.payouts.cols.id') },
  { key: 'affiliate', label: t('dashboard.ops.affiliates.cols.affiliate') },
  { key: 'amount', label: t('dashboard.ops.common.amount') },
  { key: 'date', label: t('dashboard.ops.common.date') },
  { key: 'method', label: t('dashboard.ops.affiliates.payouts.cols.method') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
])

const saved = ref(false)
function saveSettings() {
  saved.value = true
  setTimeout(() => (saved.value = false), 2500)
}
</script>
