<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-6xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.campaigns.title')"
          :subtitle="t('dashboard.ops.campaigns.subtitle')"
          :count="campaigns.length"
        >
          <LazyVButton
            variant="secondary"
            icon="ph:users-bold"
            iconPosition="left"
            :label="t('dashboard.ops.campaigns.subscribers')"
            :to="localePath('/dashboard/campaigns/subscribers')"
          />
          <LazyVButton
            variant="secondary"
            icon="ph:shopping-cart-bold"
            iconPosition="left"
            :label="t('dashboard.ops.campaigns.abandoned')"
            :to="localePath('/dashboard/campaigns/abandoned-cart')"
          />
          <LazyVButton
            icon="ph:plus-bold"
            iconPosition="left"
            :label="t('dashboard.ops.campaigns.create')"
            :to="localePath('/dashboard/campaigns/new')"
          />
        </ops-page-header>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <LazyVStatCard
            :label="t('dashboard.ops.campaigns.stats.sent')"
            :value="totalSent.toLocaleString('en-US')"
            iconName="ph:paper-plane-tilt-bold"
            valueColor="font-mono"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.campaigns.stats.openRate')"
            :value="`${avgOpen}%`"
            iconName="ph:envelope-open-bold"
            iconColor="text-info"
            valueColor="font-mono"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.campaigns.stats.clickRate')"
            :value="`${avgClick}%`"
            iconName="ph:cursor-click-bold"
            iconColor="text-status-purple"
            valueColor="font-mono"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.campaigns.stats.revenue')"
            :value="money(totalRevenue)"
            iconName="ph:coins-bold"
            iconColor="text-success"
            valueColor="font-mono"
          />
        </div>

        <LazyVTabs v-model="tab" :tabs="tabs" />

        <section class="card overflow-hidden">
          <LazyVTable v-if="filtered.length" :headers="headers" :items="filtered">
            <template #cell(name)="{ item }">
              <div>
                <p class="text-sm font-semibold">{{ item.name }}</p>
                <p class="font-mono text-[10px] text-tx-muted">{{ item.id }}</p>
              </div>
            </template>
            <template #cell(channel)="{ item }">
              <span class="inline-flex items-center gap-1.5 text-xs text-tx-secondary">
                <Icon :name="channelIcons[item.channel]" class="text-sm" />
                {{ t(`dashboard.ops.campaigns.channel.${item.channel}`) }}
              </span>
            </template>
            <template #cell(audience)="{ item }">
              <span class="text-xs text-tx-secondary">{{ item.audience }}</span>
            </template>
            <template #cell(date)="{ item }">
              <span class="font-mono text-xs text-tx-muted">{{ item.date || '—' }}</span>
            </template>
            <template #cell(sent)="{ item }">
              <span class="font-mono text-sm">{{ item.sent ? item.sent.toLocaleString('en-US') : '—' }}</span>
            </template>
            <template #cell(openRate)="{ item }">
              <span class="font-mono text-sm">{{ item.openRate ? `${item.openRate}%` : '—' }}</span>
            </template>
            <template #cell(clickRate)="{ item }">
              <span class="font-mono text-sm">{{ item.clickRate ? `${item.clickRate}%` : '—' }}</span>
            </template>
            <template #cell(revenue)="{ item }">
              <span class="font-mono text-sm font-semibold">{{ item.revenue ? money(item.revenue) : '—' }}</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="tones[item.status]">
                {{ t(`dashboard.ops.campaigns.status.${item.status}`) }}
              </status-pill>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.campaigns.empty')"
            :hint="t('dashboard.ops.campaigns.emptyHint')"
            icon="ph:megaphone-bold"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'

const { t } = useI18n()
const localePath = useLocalePath()
const { money } = useOpsFormat()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.campaigns.title') })

const store = useMktCampaignsStore()
const { campaigns } = storeToRefs(store)

const tab = ref('all')
const tabs = computed(() => [
  { name: t('dashboard.ops.common.all'), value: 'all', count: campaigns.value.length },
  ...(['draft', 'scheduled', 'sent'] as const).map((s) => ({
    name: t(`dashboard.ops.campaigns.status.${s}`),
    value: s,
    count: campaigns.value.filter((c) => c.status === s).length,
  })),
])
const filtered = computed(() =>
  tab.value === 'all' ? campaigns.value : campaigns.value.filter((c) => c.status === tab.value),
)

const sentCampaigns = computed(() => campaigns.value.filter((c) => c.status === 'sent'))
const totalSent = computed(() => sentCampaigns.value.reduce((s, c) => s + c.sent, 0))
const totalRevenue = computed(() => sentCampaigns.value.reduce((s, c) => s + c.revenue, 0))
const avg = (key: 'openRate' | 'clickRate') => {
  const rows = sentCampaigns.value.filter((c) => c[key] > 0)
  return rows.length ? Math.round((rows.reduce((s, c) => s + c[key], 0) / rows.length) * 10) / 10 : 0
}
const avgOpen = computed(() => avg('openRate'))
const avgClick = computed(() => avg('clickRate'))

const tones: Record<string, Tone> = { draft: 'neutral', scheduled: 'info', sent: 'success' }
const channelIcons: Record<string, string> = {
  email: 'ph:envelope-simple-bold',
  sms: 'ph:chat-text-bold',
  whatsapp: 'ph:whatsapp-logo-bold',
}

const headers = computed(() => [
  { key: 'name', label: t('dashboard.ops.campaigns.cols.name') },
  { key: 'channel', label: t('dashboard.ops.campaigns.cols.channel') },
  { key: 'audience', label: t('dashboard.ops.campaigns.cols.audience') },
  { key: 'date', label: t('dashboard.ops.common.date') },
  { key: 'sent', label: t('dashboard.ops.campaigns.stats.sent') },
  { key: 'openRate', label: t('dashboard.ops.campaigns.stats.openRate') },
  { key: 'clickRate', label: t('dashboard.ops.campaigns.stats.clickRate') },
  { key: 'revenue', label: t('dashboard.ops.campaigns.stats.revenue') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
])
</script>
