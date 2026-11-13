<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header :title="t(`${p}.title`)" :subtitle="t(`${p}.subtitle`)" :count="rows.length" />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LazyVStatCard :label="t(`${p}.stats.revenue`)" :value="money(totalRevenue)" iconName="ph:coins-bold" />
          <LazyVStatCard
            :label="t(`${p}.stats.spend`)"
            :value="money(totalSpend)"
            iconName="ph:megaphone-bold"
            iconColor="text-warning"
          />
          <LazyVStatCard
            :label="t(`${p}.stats.roas`)"
            :value="`${blendedRoas.toFixed(2)}x`"
            iconName="ph:chart-line-up-bold"
            iconColor="text-success"
          />
        </div>

        <section class="card overflow-hidden">
          <div class="p-4 border-b border-border-subtle">
            <h2 class="text-sm font-bold">{{ t(`${p}.sourcesTitle`) }}</h2>
          </div>
          <LazyVTable v-if="rows.length" :headers="headers" :items="rows">
            <template #cell(source)="{ item }">
              <div>
                <p class="text-sm font-semibold">{{ item.source }}</p>
                <p class="text-[11px] text-tx-muted font-mono">{{ item.medium }}</p>
              </div>
            </template>
            <template #cell(sessions)="{ item }">
              <div class="min-w-32 space-y-1">
                <span class="font-mono text-sm">{{ item.sessions.toLocaleString('en-US') }}</span>
                <insight-bar :pct="(item.sessions / maxSessions) * 100" tone="info" />
              </div>
            </template>
            <template #cell(orders)="{ item }">
              <span class="font-mono text-sm">{{ item.orders }}</span>
            </template>
            <template #cell(revenue)="{ item }">
              <div class="min-w-32 space-y-1">
                <span class="font-mono text-sm font-semibold">{{ money(item.revenue) }}</span>
                <insight-bar :pct="(item.revenue / maxRevenue) * 100" tone="brand" />
              </div>
            </template>
            <template #cell(conversion)="{ item }">
              <span class="font-mono text-sm">{{ ((item.orders / item.sessions) * 100).toFixed(2) }}%</span>
            </template>
            <template #cell(roas)="{ item }">
              <span v-if="item.spend" class="font-mono text-sm font-semibold" :class="item.revenue / item.spend >= 3 ? 'text-success' : 'text-warning'">
                {{ (item.revenue / item.spend).toFixed(2) }}x
              </span>
              <span v-else class="font-mono text-sm text-tx-muted">-</span>
            </template>
          </LazyVTable>
          <ops-empty-state v-else :title="t(`${p}.empty`)" :hint="t(`${p}.emptyHint`)" icon="ph:chart-bar-bold" />
        </section>

        <section class="card overflow-hidden">
          <div class="p-4 border-b border-border-subtle">
            <h2 class="text-sm font-bold">{{ t(`${p}.campaignsTitle`) }}</h2>
          </div>
          <LazyVTable v-if="campaigns.length" :headers="campaignHeaders" :items="campaigns">
            <template #cell(name)="{ item }">
              <div>
                <p class="text-sm font-semibold">{{ item.name }}</p>
                <p class="text-[11px] text-tx-muted">{{ item.channel }}</p>
              </div>
            </template>
            <template #cell(spend)="{ item }">
              <span class="font-mono text-sm">{{ money(item.spend) }}</span>
            </template>
            <template #cell(revenue)="{ item }">
              <span class="font-mono text-sm">{{ money(item.revenue) }}</span>
            </template>
            <template #cell(orders)="{ item }">
              <span class="font-mono text-sm">{{ item.orders }}</span>
            </template>
            <template #cell(roas)="{ item }">
              <span class="font-mono text-sm font-semibold">{{ (item.revenue / item.spend).toFixed(2) }}x</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="tones[item.status]">{{ t(`${p}.status.${item.status}`) }}</status-pill>
            </template>
          </LazyVTable>
          <ops-empty-state v-else :title="t(`${p}.emptyCampaigns`)" :hint="t(`${p}.emptyHint`)" icon="ph:megaphone-bold" />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'

const { t } = useI18n()
const { money } = useOpsFormat()
const p = 'dashboard.ops.attribution'

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.attribution.title') })

const { rows, campaigns } = storeToRefs(useRepAttributionStore())

const tones: Record<string, Tone> = { active: 'success', paused: 'warning', ended: 'neutral' }

const totalRevenue = computed(() => rows.value.reduce((s, r) => s + r.revenue, 0))
const totalSpend = computed(() => rows.value.reduce((s, r) => s + r.spend, 0))
const blendedRoas = computed(() => (totalSpend.value ? totalRevenue.value / totalSpend.value : 0))
const maxSessions = computed(() => Math.max(1, ...rows.value.map((r) => r.sessions)))
const maxRevenue = computed(() => Math.max(1, ...rows.value.map((r) => r.revenue)))

const headers = computed(() => [
  { key: 'source', label: t(`${p}.source`) },
  { key: 'sessions', label: t(`${p}.sessions`) },
  { key: 'orders', label: t(`${p}.orders`) },
  { key: 'revenue', label: t(`${p}.revenue`) },
  { key: 'conversion', label: t(`${p}.conversion`) },
  { key: 'roas', label: 'ROAS' },
])
const campaignHeaders = computed(() => [
  { key: 'name', label: t(`${p}.campaign`) },
  { key: 'spend', label: t(`${p}.spend`) },
  { key: 'revenue', label: t(`${p}.revenue`) },
  { key: 'orders', label: t(`${p}.orders`) },
  { key: 'roas', label: 'ROAS' },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
])
</script>
