<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.themeHistory.title')"
          :subtitle="t('dashboard.ops.themeHistory.subtitle')"
          :count="versions.length"
        >
          <LazyVButton
            variant="secondary"
            icon="ph:arrow-left-bold"
            iconPosition="left"
            :label="t('dashboard.ops.themeHistory.back')"
            :to="localePath('/dashboard/themes')"
          />
        </ops-page-header>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <section class="card overflow-hidden lg:col-span-2">
            <LazyVTable v-if="versions.length" :headers="headers" :items="versions">
              <template #cell(version)="{ item }">
                <span class="font-mono text-sm font-semibold">{{ item.version }}</span>
              </template>
              <template #cell(date)="{ item }">
                <span class="font-mono text-xs text-tx-muted">{{ item.date }}</span>
              </template>
              <template #cell(status)="{ item }">
                <status-pill :tone="tones[item.status]">
                  {{ t(`dashboard.ops.themeHistory.status.${item.status}`) }}
                </status-pill>
              </template>
              <template #cell(actions)="{ item }">
                <button
                  v-if="item.status === 'previous'"
                  class="text-[11px] font-semibold text-tx-muted hover:text-brand transition-colors"
                  @click="pending = item.id"
                >
                  {{ t('dashboard.ops.themeHistory.restore') }}
                </button>
              </template>
            </LazyVTable>
            <ops-empty-state
              v-else
              :title="t('dashboard.ops.themeHistory.empty')"
              :hint="t('dashboard.ops.themeHistory.emptyHint')"
              icon="ph:clock-counter-clockwise-bold"
            />
          </section>

          <div class="space-y-4">
            <section class="card p-4 space-y-3">
              <h3 class="text-sm font-bold">{{ t('dashboard.ops.themeHistory.diffTitle') }}</h3>
              <p class="text-xs text-tx-muted">{{ t('dashboard.ops.themeHistory.diffHint') }}</p>
              <ul class="space-y-2">
                <li v-for="row in diff" :key="row.key" class="flex items-center justify-between text-xs">
                  <span class="text-tx-secondary">{{ t(`dashboard.ops.themeHistory.diff.${row.key}`) }}</span>
                  <span :class="['font-mono font-semibold', row.color]">{{ row.value }}</span>
                </li>
              </ul>
            </section>

            <section class="card p-4 space-y-3">
              <h3 class="text-sm font-bold">{{ t('dashboard.ops.themeHistory.previewLink') }}</h3>
              <p class="text-xs text-tx-muted">{{ t('dashboard.ops.themeHistory.previewLinkHint') }}</p>
              <LazyVSelectInput
                v-model="expiry"
                :label="t('dashboard.ops.themeHistory.expiry')"
                :options="expiryOptions"
              />
              <LazyVButton
                class="w-full"
                variant="secondary"
                icon="ph:link-bold"
                iconPosition="left"
                :label="t('dashboard.ops.themeHistory.generate')"
                @click="generate"
              />
              <div v-if="link" class="flex items-center gap-2">
                <code class="flex-1 min-w-0 truncate font-mono text-[11px] bg-bg-base border border-border-subtle rounded px-2 py-1.5">
                  {{ link }}
                </code>
                <LazyVButton
                  size="sm"
                  :label="copied ? t('dashboard.ops.themeHistory.copied') : t('dashboard.ops.themeHistory.copy')"
                  @click="copy"
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <LazyVDialog v-model="confirmOpen" :title="t('dashboard.ops.themeHistory.restoreTitle')" maxWidth="md">
      <p class="text-sm text-tx-secondary">{{ t('dashboard.ops.themeHistory.restoreBody') }}</p>
      <template #footer>
        <LazyVButton variant="ghost" :label="t('dashboard.ops.themeHistory.cancel')" @click="pending = null" />
        <LazyVButton :label="t('dashboard.ops.themeHistory.confirm')" @click="confirmRestore" />
      </template>
    </LazyVDialog>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'

const { t } = useI18n()
const localePath = useLocalePath()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.themeHistory.title') })

const store = useEcoThemesStore()
const { versions } = storeToRefs(store)

const pending = ref<string | null>(null)
const confirmOpen = computed({
  get: () => pending.value !== null,
  set: (v: boolean) => {
    if (!v) pending.value = null
  },
})

const expiry = ref('24h')
const link = ref('')
const copied = ref(false)

const tones: Record<string, Tone> = { published: 'success', draft: 'warning', previous: 'neutral' }

const diff = [
  { key: 'added', value: '+2', color: 'text-success' },
  { key: 'changed', value: '~5', color: 'text-warning' },
  { key: 'removed', value: '-1', color: 'text-danger' },
]

const expiryOptions = computed(() => [
  { value: '1h', label: t('dashboard.ops.themeHistory.expiryOptions.h1') },
  { value: '24h', label: t('dashboard.ops.themeHistory.expiryOptions.h24') },
  { value: '7d', label: t('dashboard.ops.themeHistory.expiryOptions.d7') },
])

const headers = computed(() => [
  { key: 'version', label: t('dashboard.ops.themeHistory.version') },
  { key: 'author', label: t('dashboard.ops.themeHistory.author') },
  { key: 'note', label: t('dashboard.ops.themeHistory.note') },
  { key: 'date', label: t('dashboard.ops.common.date') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
  { key: 'actions', label: '', align: 'end' as const },
])

function confirmRestore() {
  if (pending.value) store.restore(pending.value)
  pending.value = null
}

function generate() {
  link.value = `https://preview.storeos.app/p/${Math.random().toString(36).slice(2, 10)}?exp=${expiry.value}`
  copied.value = false
}

async function copy() {
  try {
    await navigator.clipboard.writeText(link.value)
  } catch {
    // clipboard unavailable: mock-only feedback
  }
  copied.value = true
}
</script>
