<template>
  <div>
    <platform-page-header :title="t('platform.health.title')" :subtitle="t('platform.health.subtitle')" />

    <!-- Providers -->
    <div class="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
      <section v-for="p in store.providers" :key="p.id" class="card px-4 py-3.5">
        <div class="mb-3 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <Icon :name="p.icon" class="text-xl text-tx-secondary" />
            <h3 class="text-sm font-bold">{{ p.name }}</h3>
          </div>
          <platform-status-pill :label="t(`platform.health.status.${p.status}`)" :tone="tones.provider(p.status)" />
        </div>
        <dl class="space-y-1.5 text-[11px]">
          <div class="flex justify-between">
            <dt class="text-tx-muted">{{ t('platform.health.latency') }}</dt>
            <dd class="font-mono text-tx-primary">{{ p.latencyMs ? `${p.latencyMs} ms` : '—' }}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-tx-muted">{{ t('platform.health.uptime') }}</dt>
            <dd class="font-mono text-tx-primary">{{ p.uptime }}%</dd>
          </div>
        </dl>
      </section>
    </div>

    <!-- Queues -->
    <div class="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <section v-for="q in store.queues" :key="q.name" class="card px-4 py-3.5">
        <h3 class="mb-3 font-mono text-xs font-semibold text-tx-secondary">{{ q.name }}</h3>
        <p class="font-mono text-[22px] font-semibold tracking-tight text-tx-primary">{{ num(q.depth) }}</p>
        <p class="mb-3 text-[10px] text-tx-muted">{{ t('platform.health.queueDepth') }}</p>
        <dl class="space-y-1 text-[11px]">
          <div class="flex justify-between">
            <dt class="text-tx-muted">{{ t('platform.health.processing') }}</dt>
            <dd class="font-mono">{{ num(q.processing) }}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-tx-muted">{{ t('platform.health.failed24h') }}</dt>
            <dd class="font-mono" :class="q.failed24h > 100 ? 'text-danger' : ''">{{ num(q.failed24h) }}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-tx-muted">{{ t('platform.health.oldest') }}</dt>
            <dd class="font-mono" :class="q.oldestSeconds > 600 ? 'text-warning' : ''">{{ q.oldestSeconds }}s</dd>
          </div>
        </dl>
      </section>
    </div>

    <!-- Failed jobs -->
    <section class="card overflow-hidden">
      <div class="border-b border-border-subtle px-4 py-3">
        <h3 class="text-sm font-bold">{{ t('platform.health.failedJobs') }}</h3>
      </div>
      <v-table v-if="store.failedJobs.length" :headers="headers" :items="store.failedJobs">
        <template #cell(id)="{ item }">
          <span class="font-mono text-xs text-tx-secondary">{{ item.id }}</span>
        </template>
        <template #cell(kind)="{ item }">
          <platform-status-pill :label="t(`platform.health.kind.${item.kind}`)" tone="neutral" />
        </template>
        <template #cell(provider)="{ item }">
          <span class="text-xs text-tx-secondary">{{ item.provider }}</span>
        </template>
        <template #cell(store)="{ item }">
          <span class="text-xs text-tx-primary">{{ item.store }}</span>
        </template>
        <template #cell(error)="{ item }">
          <span class="font-mono text-[11px] text-danger">{{ item.error }}</span>
        </template>
        <template #cell(attempts)="{ item }">
          <span class="font-mono text-xs">{{ item.attempts }}</span>
        </template>
        <template #cell(failedAt)="{ item }">
          <span class="font-mono text-xs text-tx-secondary">{{ item.failedAt }}</span>
        </template>
        <template #cell(actions)="{ item }">
          <v-button size="none" variant="secondary" icon="ph:arrow-clockwise" icon-position="left" class-name="px-2.5 py-1 text-[11px]" :label="t('platform.health.retry')" @click.stop="store.retry(item.id)" />
        </template>
      </v-table>
      <platform-empty-state v-else :title="t('platform.health.noFailed')" :hint="t('platform.health.noFailedHint')" icon="ph:check-circle" />
    </section>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ layout: 'platform' })

const { t } = useI18n()
const { num } = usePlatformFormat()
const tones = usePlatformTones()

useSeoMeta({ title: t('platform.health.title'), robots: 'noindex, nofollow' })

const store = usePlatformHealthStore()

const headers = computed(() => [
  { label: t('platform.common.id'), key: 'id' },
  { label: t('platform.health.type'), key: 'kind' },
  { label: t('platform.health.provider'), key: 'provider' },
  { label: t('platform.common.store'), key: 'store' },
  { label: t('platform.health.error'), key: 'error' },
  { label: t('platform.health.attempts'), key: 'attempts', align: 'center' as const },
  { label: t('platform.health.failedAt'), key: 'failedAt' },
  { label: t('platform.common.actions'), key: 'actions', align: 'end' as const },
])
</script>
