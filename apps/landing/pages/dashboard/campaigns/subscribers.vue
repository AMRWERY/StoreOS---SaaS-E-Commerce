<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-6xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.subscribers.title')"
          :subtitle="t('dashboard.ops.subscribers.subtitle')"
          :count="subscribers.length"
        >
          <LazyVButton
            variant="secondary"
            icon="ph:download-simple-bold"
            iconPosition="left"
            :label="t('dashboard.ops.subscribers.export')"
            :disabled="!subscribers.length"
            @click="exportCsv"
          />
          <LazyVButton
            icon="ph:upload-simple-bold"
            iconPosition="left"
            :label="t('dashboard.ops.subscribers.import')"
            @click="importOpen = true"
          />
        </ops-page-header>

        <div
          v-if="importedFile"
          class="flex items-center gap-3 rounded-md border border-success/30 bg-success-dim px-3 py-2.5 text-xs text-success"
        >
          <Icon name="ph:check-circle-bold" />
          {{ t('dashboard.ops.subscribers.importDone', { file: importedFile }) }}
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <LazyVStatCard
            :label="t('dashboard.ops.subscribers.stats.total')"
            :value="subscribers.length"
            iconName="ph:users-bold"
            valueColor="font-mono"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.subscribers.stats.optedIn')"
            :value="countBy('opted_in')"
            iconName="ph:check-circle-bold"
            iconColor="text-success"
            valueColor="font-mono"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.subscribers.stats.pending')"
            :value="countBy('pending')"
            iconName="ph:hourglass-bold"
            iconColor="text-warning"
            valueColor="font-mono"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.subscribers.stats.unsubscribed')"
            :value="countBy('unsubscribed')"
            iconName="ph:prohibit-bold"
            iconColor="text-danger"
            valueColor="font-mono"
          />
        </div>

        <div class="flex items-start gap-3 rounded-md border border-info/30 bg-info-dim px-3 py-3">
          <Icon name="ph:shield-check-bold" class="mt-0.5 shrink-0 text-info" />
          <div>
            <p class="text-xs font-semibold text-info">{{ t('dashboard.ops.subscribers.gdprTitle') }}</p>
            <p class="mt-1 text-[11px] leading-relaxed text-tx-secondary">{{ t('dashboard.ops.subscribers.gdprBody') }}</p>
          </div>
        </div>

        <section class="card overflow-hidden">
          <LazyVTable v-if="subscribers.length" :headers="headers" :items="subscribers">
            <template #cell(contact)="{ item }">
              <span class="font-mono text-xs">{{ item.contact }}</span>
            </template>
            <template #cell(source)="{ item }">
              <span class="text-xs text-tx-secondary">{{ t(`dashboard.ops.subscribers.source.${item.source}`) }}</span>
            </template>
            <template #cell(consent)="{ item }">
              <status-pill :tone="tones[item.consent]">
                {{ t(`dashboard.ops.subscribers.consent.${item.consent}`) }}
              </status-pill>
            </template>
            <template #cell(subscribedAt)="{ item }">
              <span class="font-mono text-xs text-tx-muted">{{ item.subscribedAt }}</span>
            </template>
            <template #cell(tags)="{ item }">
              <div v-if="item.tags.length" class="flex flex-wrap gap-1">
                <span
                  v-for="tag in item.tags"
                  :key="tag"
                  class="rounded bg-bg-elevated px-1.5 py-0.5 text-[10px] text-tx-secondary"
                >
                  {{ tag }}
                </span>
              </div>
              <span v-else class="text-xs text-tx-muted">—</span>
            </template>
            <template #cell(actions)="{ item }">
              <button
                v-if="item.consent !== 'unsubscribed'"
                class="text-[11px] font-semibold text-tx-muted hover:text-danger transition-colors"
                @click="unsubscribe(item.id)"
              >
                {{ t('dashboard.ops.subscribers.unsubscribe') }}
              </button>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.subscribers.empty')"
            :hint="t('dashboard.ops.subscribers.emptyHint')"
            icon="ph:users-bold"
          />
        </section>
      </div>
    </div>

    <LazyVDialog v-model="importOpen" :title="t('dashboard.ops.subscribers.import')">
      <div class="space-y-4 p-1">
        <LazyVFileUpload
          accept=".csv"
          :title="t('dashboard.ops.subscribers.uploadTitle')"
          :subtitle="t('dashboard.ops.subscribers.uploadHint')"
          @change="onFile"
        />
        <p class="text-[11px] leading-relaxed text-tx-muted">{{ t('dashboard.ops.subscribers.importConsent') }}</p>
        <LazyVButton
          class="w-full"
          :label="t('dashboard.ops.subscribers.import')"
          :disabled="!pendingFile"
          @click="confirmImport"
        />
      </div>
    </LazyVDialog>
  </div>
</template>

<script lang="ts" setup>
import type { ConsentStatus } from '@/types/marketing'
import type { Tone } from '@/types/operations'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.subscribers.title') })

const store = useMktSubscribersStore()
const { subscribers } = storeToRefs(store)
const { unsubscribe } = store

const countBy = (c: ConsentStatus) => subscribers.value.filter((s) => s.consent === c).length

const tones: Record<string, Tone> = { opted_in: 'success', pending: 'warning', unsubscribed: 'danger' }

const headers = computed(() => [
  { key: 'contact', label: t('dashboard.ops.subscribers.cols.contact') },
  { key: 'source', label: t('dashboard.ops.subscribers.cols.source') },
  { key: 'consent', label: t('dashboard.ops.subscribers.cols.consent') },
  { key: 'subscribedAt', label: t('dashboard.ops.subscribers.cols.subscribedAt') },
  { key: 'tags', label: t('dashboard.ops.subscribers.cols.tags') },
  { key: 'actions', label: '', align: 'end' as const },
])

const importOpen = ref(false)
const pendingFile = ref<File | null>(null)
const importedFile = ref('')

function onFile(file: File | null) {
  pendingFile.value = file
}
function confirmImport() {
  if (!pendingFile.value) return
  importedFile.value = pendingFile.value.name
  pendingFile.value = null
  importOpen.value = false
}

function exportCsv() {
  const rows = [
    'contact,source,consent,subscribed_at,tags',
    ...subscribers.value.map((s) => [s.contact, s.source, s.consent, s.subscribedAt, s.tags.join('|')].join(',')),
  ]
  const url = URL.createObjectURL(new Blob([rows.join('\n')], { type: 'text/csv' }))
  const a = document.createElement('a')
  a.href = url
  a.download = 'subscribers.csv'
  a.click()
  URL.revokeObjectURL(url)
}
</script>
