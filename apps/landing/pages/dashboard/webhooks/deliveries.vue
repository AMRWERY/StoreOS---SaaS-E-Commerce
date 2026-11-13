<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.webhookLog.title')"
          :subtitle="t('dashboard.ops.webhookLog.subtitle')"
          :count="deliveries.length"
        />

        <LazyVTabs v-model="filter" :tabs="tabs" />

        <section class="card overflow-hidden">
          <LazyVTable v-if="filtered.length" :headers="headers" :items="filtered">
            <template #cell(event)="{ item }">
              <button class="font-mono text-xs font-semibold text-start hover:text-brand transition-colors" @click="selectedId = item.id">
                {{ item.event }}
              </button>
            </template>
            <template #cell(endpoint)="{ item }">
              <span class="font-mono text-[11px] text-tx-muted truncate block max-w-56">{{ item.endpoint }}</span>
            </template>
            <template #cell(attempts)="{ item }">
              <span class="font-mono text-sm">{{ item.attempts }}</span>
            </template>
            <template #cell(statusCode)="{ item }">
              <span :class="['font-mono text-sm font-semibold', item.statusCode < 300 ? 'text-success' : 'text-danger']">
                {{ item.statusCode }}
              </span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="tones[item.status]">{{ t(`dashboard.ops.webhookLog.status.${item.status}`) }}</status-pill>
            </template>
            <template #cell(time)="{ item }">
              <span class="font-mono text-xs text-tx-muted">{{ item.time }}</span>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.webhookLog.empty')"
            :hint="t('dashboard.ops.webhookLog.emptyHint')"
            icon="ph:webhooks-logo-bold"
          />
        </section>

        <section class="card p-4 space-y-3">
          <div>
            <h3 class="text-sm font-bold">{{ t('dashboard.ops.webhookLog.scheduleTitle') }}</h3>
            <p class="text-xs text-tx-muted">{{ t('dashboard.ops.webhookLog.scheduleHint') }}</p>
          </div>
          <ol class="flex flex-wrap gap-3">
            <li v-for="s in schedule" :key="s.attempt" class="border border-border-subtle rounded-md px-3 py-2 min-w-24 bg-bg-base">
              <p class="text-[10px] font-bold tracking-wider text-tx-muted">
                {{ t('dashboard.ops.webhookLog.attempt') }} <span class="font-mono">{{ s.attempt }}</span>
              </p>
              <p class="font-mono text-sm font-semibold">{{ s.delay }}</p>
            </li>
          </ol>
        </section>
      </div>
    </div>

    <LazyVSidePanel
      v-model="panelOpen"
      :title="selected?.event ?? ''"
      :subtitle="t('dashboard.ops.webhookLog.detail')"
    >
      <div v-if="selected" class="space-y-5 p-1">
        <div class="flex items-center gap-2">
          <status-pill :tone="tones[selected.status]">{{ t(`dashboard.ops.webhookLog.status.${selected.status}`) }}</status-pill>
          <span class="font-mono text-xs text-tx-muted">{{ selected.statusCode }} · {{ selected.time }}</span>
        </div>
        <p class="font-mono text-[11px] text-tx-secondary break-all">{{ selected.endpoint }}</p>

        <div class="space-y-1.5">
          <p class="text-[11px] font-bold tracking-wider text-tx-secondary">{{ t('dashboard.ops.webhookLog.request') }}</p>
          <pre dir="ltr" class="font-mono text-[11px] bg-bg-base border border-border-subtle rounded-md p-3 overflow-x-auto">{{ selected.request }}</pre>
        </div>
        <div class="space-y-1.5">
          <p class="text-[11px] font-bold tracking-wider text-tx-secondary">{{ t('dashboard.ops.webhookLog.response') }}</p>
          <pre dir="ltr" class="font-mono text-[11px] bg-bg-base border border-border-subtle rounded-md p-3 overflow-x-auto">{{ selected.response }}</pre>
        </div>

        <div class="flex gap-2">
          <LazyVButton class="flex-1" icon="ph:arrow-clockwise-bold" iconPosition="left" :label="t('dashboard.ops.webhookLog.retry')" @click="store.retry(selected.id)" />
          <LazyVButton class="flex-1" variant="secondary" icon="ph:play-bold" iconPosition="left" :label="t('dashboard.ops.webhookLog.replay')" @click="store.replay(selected.id)" />
        </div>
      </div>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.webhookLog.title') })

const store = useEcoWebhookLogStore()
const { deliveries } = storeToRefs(store)
const { schedule } = store

const filter = ref('all')
const selectedId = ref<string | null>(null)

const tones: Record<string, Tone> = { delivered: 'success', failed: 'danger', retrying: 'warning' }

const selected = computed(() => deliveries.value.find((d) => d.id === selectedId.value) ?? null)
const panelOpen = computed({
  get: () => selected.value !== null,
  set: (v: boolean) => {
    if (!v) selectedId.value = null
  },
})

const filtered = computed(() => deliveries.value.filter((d) => filter.value === 'all' || d.status === filter.value))

const tabs = computed(() => [
  { name: t('dashboard.ops.common.all'), value: 'all', count: deliveries.value.length },
  ...(['delivered', 'failed', 'retrying'] as const).map((s) => ({
    name: t(`dashboard.ops.webhookLog.status.${s}`),
    value: s,
    count: deliveries.value.filter((d) => d.status === s).length,
  })),
])

const headers = computed(() => [
  { key: 'event', label: t('dashboard.ops.webhookLog.event') },
  { key: 'endpoint', label: t('dashboard.ops.webhookLog.endpoint') },
  { key: 'attempts', label: t('dashboard.ops.webhookLog.attempts') },
  { key: 'statusCode', label: t('dashboard.ops.webhookLog.code') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
  { key: 'time', label: t('dashboard.ops.webhookLog.time') },
])
</script>
