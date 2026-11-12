<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.activity.title')"
          :subtitle="t('dashboard.ops.activity.subtitle')"
          :count="entries.length"
        >
          <LazyVButton
            size="none"
            variant="secondary"
            className="px-3 py-1.5 text-xs"
            icon="ph:download-simple-bold"
            iconPosition="left"
            :label="t('dashboard.ops.activity.export')"
          />
        </ops-page-header>

        <LazyVTabs v-model="tab" :tabs="tabs" />

        <LazyVSearchInput v-model="query" :placeholder="t('dashboard.ops.activity.search')" />

        <section class="card overflow-hidden">
          <LazyVTable v-if="filtered.length" :headers="headers" :items="filtered" @row-click="selected = $event">
            <template #cell(actor)="{ item }">
              <span class="text-sm font-semibold">{{ item.actor }}</span>
            </template>
            <template #cell(action)="{ item }">
              <div class="flex items-center gap-2">
                <span class="text-xs">{{ t(`dashboard.ops.activity.actions.${item.action}`) }}</span>
                <status-pill :tone="tones[item.category]">
                  {{ t(`dashboard.ops.activity.tabs.${item.category}`) }}
                </status-pill>
              </div>
            </template>
            <template #cell(resource)="{ item }">
              <span class="font-mono text-xs">{{ item.resource }}</span>
            </template>
            <template #cell(ip)="{ item }">
              <span class="font-mono text-xs text-tx-secondary">{{ item.ip }}</span>
            </template>
            <template #cell(at)="{ item }">
              <span class="font-mono text-xs text-tx-secondary">{{ item.at }}</span>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.activity.empty')"
            :hint="t('dashboard.ops.activity.emptyHint')"
            icon="ph:clock-counter-clockwise-bold"
          />
        </section>
      </div>
    </div>

    <LazyVSidePanel
      :model-value="!!selected"
      :title="t('dashboard.ops.activity.detail')"
      :subtitle="selected?.id"
      @update:model-value="selected = null"
    >
      <div v-if="selected" class="space-y-5">
        <dl class="space-y-3 text-xs">
          <div class="flex justify-between gap-4">
            <dt class="text-tx-muted">{{ t('dashboard.ops.activity.actor') }}</dt>
            <dd class="font-semibold">{{ selected.actor }}</dd>
          </div>
          <div class="flex justify-between gap-4">
            <dt class="text-tx-muted">{{ t('dashboard.ops.activity.action') }}</dt>
            <dd>{{ t(`dashboard.ops.activity.actions.${selected.action}`) }}</dd>
          </div>
          <div class="flex justify-between gap-4">
            <dt class="text-tx-muted">{{ t('dashboard.ops.activity.resource') }}</dt>
            <dd class="font-mono">{{ selected.resource }}</dd>
          </div>
          <div class="flex justify-between gap-4">
            <dt class="text-tx-muted">{{ t('dashboard.ops.activity.ip') }}</dt>
            <dd class="font-mono">{{ selected.ip }}</dd>
          </div>
          <div class="flex justify-between gap-4">
            <dt class="text-tx-muted">{{ t('dashboard.ops.activity.time') }}</dt>
            <dd class="font-mono">{{ selected.at }}</dd>
          </div>
        </dl>

        <div class="grid grid-cols-2 gap-3">
          <div class="rounded-md border border-border-subtle bg-danger-dim p-3 space-y-1">
            <p class="text-[10px] font-bold text-danger">{{ t('dashboard.ops.activity.before') }}</p>
            <template v-if="selected.before">
              <p v-for="(v, k) in selected.before" :key="k" class="font-mono text-[11px] text-tx-primary">
                {{ k }}: {{ v }}
              </p>
            </template>
            <p v-else class="text-[11px] text-tx-muted">{{ t('dashboard.ops.activity.none') }}</p>
          </div>
          <div class="rounded-md border border-border-subtle bg-success-dim p-3 space-y-1">
            <p class="text-[10px] font-bold text-success">{{ t('dashboard.ops.activity.after') }}</p>
            <template v-if="selected.after">
              <p v-for="(v, k) in selected.after" :key="k" class="font-mono text-[11px] text-tx-primary">
                {{ k }}: {{ v }}
              </p>
            </template>
            <p v-else class="text-[11px] text-tx-muted">{{ t('dashboard.ops.activity.none') }}</p>
          </div>
        </div>
      </div>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'
import type { AuditCategory, AuditEntry } from '@/types/platformTools'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.activity.title') })

const { entries } = storeToRefs(useActivityLogStore())

const tab = ref('all')
const query = ref('')
const selected = ref<AuditEntry | null>(null)

const categories: AuditCategory[] = ['orders', 'products', 'payments', 'staff', 'settings']
const tabs = computed(() => [
  { name: t('dashboard.ops.common.all'), value: 'all', count: entries.value.length },
  ...categories.map((c) => ({
    name: t(`dashboard.ops.activity.tabs.${c}`),
    value: c,
    count: entries.value.filter((e) => e.category === c).length,
  })),
])

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return entries.value.filter(
    (e) =>
      (tab.value === 'all' || e.category === tab.value) &&
      (!q || [e.actor, e.resource, e.ip, e.id].some((s) => s.toLowerCase().includes(q))),
  )
})

const tones: Record<string, Tone> = {
  orders: 'info',
  products: 'purple',
  payments: 'success',
  staff: 'warning',
  settings: 'neutral',
}

const headers = computed(() => [
  { key: 'actor', label: t('dashboard.ops.activity.actor') },
  { key: 'action', label: t('dashboard.ops.activity.action') },
  { key: 'resource', label: t('dashboard.ops.activity.resource') },
  { key: 'ip', label: t('dashboard.ops.activity.ip') },
  { key: 'at', label: t('dashboard.ops.activity.time') },
])
</script>
