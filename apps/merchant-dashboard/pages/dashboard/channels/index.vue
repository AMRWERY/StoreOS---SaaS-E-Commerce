<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header :title="t(`${p}.title`)" :subtitle="t(`${p}.subtitle`)" :count="channels.length" />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LazyVStatCard
            :label="t(`${p}.stats.connected`)"
            :value="channels.filter((c) => c.status !== 'disconnected').length"
            iconName="ph:plugs-connected-bold"
            iconColor="text-success"
          />
          <LazyVStatCard
            :label="t(`${p}.stats.synced`)"
            :value="totalProducts.toLocaleString('en-US')"
            iconName="ph:package-bold"
          />
          <LazyVStatCard
            :label="t(`${p}.stats.errors`)"
            :value="totalErrors"
            iconName="ph:warning-bold"
            iconColor="text-danger"
          />
        </div>

        <section v-if="channels.length" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <article v-for="c in channels" :key="c.key" class="card p-4 space-y-4">
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-center gap-3">
                <span class="flex h-9 w-9 items-center justify-center rounded-md bg-bg-elevated border border-border-subtle">
                  <Icon :name="c.icon" class="text-lg text-tx-secondary" />
                </span>
                <h3 class="text-sm font-bold">{{ c.name }}</h3>
              </div>
              <status-pill :tone="statusTones[c.status]">{{ t(`${p}.status.${c.status}`) }}</status-pill>
            </div>

            <dl class="grid grid-cols-3 gap-3 text-xs">
              <div>
                <dt class="text-tx-muted">{{ t(`${p}.products`) }}</dt>
                <dd class="font-mono font-semibold mt-0.5">{{ c.products }}</dd>
              </div>
              <div>
                <dt class="text-tx-muted">{{ t(`${p}.errors`) }}</dt>
                <dd class="font-mono font-semibold mt-0.5" :class="c.errors ? 'text-danger' : ''">{{ c.errors }}</dd>
              </div>
              <div>
                <dt class="text-tx-muted">{{ t(`${p}.lastSync`) }}</dt>
                <dd class="font-mono font-semibold mt-0.5">{{ c.lastSync ?? '-' }}</dd>
              </div>
            </dl>

            <div class="flex items-center gap-2">
              <LazyVButton
                v-if="c.status === 'disconnected'"
                size="none"
                className="px-3 py-1.5 text-xs"
                :label="t(`${p}.connect`)"
                @click="connect(c.key)"
              />
              <template v-else>
                <LazyVButton
                  variant="secondary"
                  icon="ph:arrows-clockwise-bold"
                  iconPosition="left"
                  size="none"
                  className="px-3 py-1.5 text-xs"
                  :label="t(`${p}.syncNow`)"
                  @click="syncNow(c.key)"
                />
                <button
                  class="text-[11px] font-semibold text-tx-muted hover:text-danger transition-colors px-2"
                  @click="disconnect(c.key)"
                >
                  {{ t(`${p}.disconnect`) }}
                </button>
              </template>
            </div>
          </article>
        </section>
        <ops-empty-state v-else :title="t(`${p}.empty`)" :hint="t(`${p}.emptyHint`)" icon="ph:plugs-bold" />

        <section class="card overflow-hidden">
          <div class="p-4 border-b border-border-subtle">
            <h2 class="text-sm font-bold">{{ t(`${p}.publishingTitle`) }}</h2>
            <p class="text-xs text-tx-muted mt-1">{{ t(`${p}.publishingHint`) }}</p>
          </div>
          <LazyVTable v-if="channels.length" :headers="publishHeaders" :items="channels">
            <template #cell(name)="{ item }">
              <span class="text-sm font-semibold">{{ item.name }}</span>
            </template>
            <template v-for="k in publishKeys" :key="k" #[`cell(${k})`]="{ item }">
              <LazyVSwitchButton
                :modelValue="item.publish[k]"
                @update:modelValue="setPublish(item.key, k, $event)"
              />
            </template>
          </LazyVTable>
          <ops-empty-state v-else :title="t(`${p}.empty`)" :hint="t(`${p}.emptyHint`)" icon="ph:plugs-bold" />
        </section>

        <section class="card overflow-hidden">
          <div class="p-4 border-b border-border-subtle flex flex-wrap items-center justify-between gap-3">
            <h2 class="text-sm font-bold">{{ t(`${p}.diagnosticsTitle`) }}</h2>
            <LazyVTabs v-model="severity" :tabs="severityTabs" />
          </div>
          <LazyVTable v-if="filteredIssues.length" :headers="issueHeaders" :items="filteredIssues">
            <template #cell(product)="{ item }">
              <span class="text-sm font-semibold">{{ item.product }}</span>
            </template>
            <template #cell(channel)="{ item }">
              <span class="text-xs text-tx-secondary">{{ channelName(item.channel) }}</span>
            </template>
            <template #cell(issue)="{ item }">
              <span class="text-xs">{{ t(`${p}.issues.${item.issue}`) }}</span>
            </template>
            <template #cell(severity)="{ item }">
              <status-pill :tone="severityTones[item.severity]">{{ t(`${p}.severity.${item.severity}`) }}</status-pill>
            </template>
          </LazyVTable>
          <ops-empty-state v-else :title="t(`${p}.noIssues`)" :hint="t(`${p}.noIssuesHint`)" icon="ph:check-circle-bold" />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ChannelKey, SalesChannel } from '@/types/insights'
import type { Tone } from '@/types/operations'

const { t } = useI18n()
const p = 'dashboard.ops.channels'

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.channels.title') })

const store = useChanChannelsStore()
const { channels, issues } = storeToRefs(store)
const { connect, disconnect, syncNow } = store

const statusTones: Record<string, Tone> = { connected: 'success', disconnected: 'neutral', error: 'danger' }
const severityTones: Record<string, Tone> = { error: 'danger', warning: 'warning', info: 'info' }

const severity = ref('all')
const publishKeys = ['products', 'inventory', 'prices'] as const

const totalProducts = computed(() => channels.value.reduce((s, c) => s + c.products, 0))
const totalErrors = computed(() => channels.value.reduce((s, c) => s + c.errors, 0))
const filteredIssues = computed(() =>
  severity.value === 'all' ? issues.value : issues.value.filter((i) => i.severity === severity.value),
)

const severityTabs = computed(() => [
  { name: t('dashboard.ops.common.all'), value: 'all', count: issues.value.length },
  { name: t(`${p}.severity.error`), value: 'error', count: issues.value.filter((i) => i.severity === 'error').length },
  { name: t(`${p}.severity.warning`), value: 'warning', count: issues.value.filter((i) => i.severity === 'warning').length },
])

const publishHeaders = computed(() => [
  { key: 'name', label: t(`${p}.channel`) },
  ...publishKeys.map((k) => ({ key: k, label: t(`${p}.publish.${k}`) })),
])
const issueHeaders = computed(() => [
  { key: 'product', label: t(`${p}.product`) },
  { key: 'channel', label: t(`${p}.channel`) },
  { key: 'issue', label: t(`${p}.issue`) },
  { key: 'severity', label: t(`${p}.severityLabel`) },
])

const channelName = (key: ChannelKey) => channels.value.find((c) => c.key === key)?.name ?? key

function setPublish(key: ChannelKey, field: keyof SalesChannel['publish'], value: boolean) {
  const c = channels.value.find((x) => x.key === key)
  if (c && c.status !== 'disconnected') c.publish[field] = value
}
</script>
