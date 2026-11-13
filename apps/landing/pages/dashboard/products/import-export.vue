<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.importExport.title')"
          :subtitle="t('dashboard.ops.importExport.subtitle')"
          :count="jobs.length"
        />

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <!-- Import -->
          <section class="card p-5 space-y-4">
            <h2 class="text-eyebrow">{{ t('dashboard.ops.importExport.import') }}</h2>
            <LazyVFileUpload
              accept=".csv"
              :title="t('dashboard.ops.importExport.dropTitle')"
              :subtitle="t('dashboard.ops.importExport.dropHint')"
              @change="onFile"
            />
            <div v-if="parsedRows" class="flex items-center justify-between text-xs">
              <span class="text-tx-secondary">
                {{ t('dashboard.ops.importExport.parsed') }}
                <span class="font-mono text-tx-primary">{{ parsedRows }}</span>
                · {{ t('dashboard.ops.importExport.issues') }}
                <span class="font-mono text-warning">{{ issues.length }}</span>
              </span>
              <LazyVButton
                size="none"
                className="px-3 py-1 text-[11px]"
                :label="t('dashboard.ops.importExport.runImport')"
                @click="runImport"
              />
            </div>
          </section>

          <!-- Export -->
          <section class="card p-5 space-y-4">
            <h2 class="text-eyebrow">{{ t('dashboard.ops.importExport.export') }}</h2>
            <div class="grid grid-cols-2 gap-2">
              <label
                v-for="col in columns"
                :key="col"
                class="flex items-center gap-2 text-xs text-tx-secondary cursor-pointer"
              >
                <input v-model="selectedColumns" type="checkbox" :value="col" class="accent-brand" />
                {{ t(`dashboard.ops.importExport.columns.${col}`) }}
              </label>
            </div>
            <LazyVButton
              icon="ph:download-simple-bold"
              iconPosition="left"
              :label="t('dashboard.ops.importExport.runExport')"
              :disabled="!selectedColumns.length"
              @click="runExport"
            />
          </section>
        </div>

        <!-- Validation report -->
        <section v-if="parsedRows" class="card overflow-hidden">
          <div class="px-5 py-3 border-b border-border-subtle">
            <h2 class="text-eyebrow">{{ t('dashboard.ops.importExport.report') }}</h2>
          </div>
          <LazyVTable v-if="issues.length" :headers="issueHeaders" :items="issues">
            <template #cell(row)="{ item }">
              <span class="font-mono text-xs">{{ item.row }}</span>
            </template>
            <template #cell(field)="{ item }">
              <span class="font-mono text-xs text-brand">{{ item.field }}</span>
            </template>
            <template #cell(error)="{ item }">
              <status-pill tone="warning">{{ t(`dashboard.ops.importExport.errors.${item.error}`) }}</status-pill>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.importExport.noIssues')"
            :hint="t('dashboard.ops.importExport.noIssuesHint')"
            icon="ph:check-circle-bold"
          />
        </section>

        <!-- History -->
        <section class="card overflow-hidden">
          <div class="px-5 py-3 border-b border-border-subtle">
            <h2 class="text-eyebrow">{{ t('dashboard.ops.importExport.history') }}</h2>
          </div>
          <LazyVTable v-if="jobs.length" :headers="jobHeaders" :items="jobs">
            <template #cell(id)="{ item }">
              <span class="font-mono text-sm font-semibold text-brand">{{ item.id }}</span>
            </template>
            <template #cell(kind)="{ item }">
              <span class="text-xs text-tx-secondary">{{ t(`dashboard.ops.importExport.kinds.${item.kind}`) }}</span>
            </template>
            <template #cell(file)="{ item }">
              <span class="font-mono text-xs">{{ item.file }}</span>
            </template>
            <template #cell(rows)="{ item }">
              <span class="font-mono text-xs">{{ item.rows }}</span>
            </template>
            <template #cell(createdAt)="{ item }">
              <span class="font-mono text-xs text-tx-muted">{{ item.createdAt }}</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="tones[item.status]">
                {{ t(`dashboard.ops.importExport.status.${item.status}`) }}
              </status-pill>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.importExport.empty')"
            :hint="t('dashboard.ops.importExport.emptyHint')"
            icon="ph:file-csv-bold"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.importExport.title') })

const store = useCatalogImportJobsStore()
const { jobs, issues } = storeToRefs(store)

const parsedRows = ref(0)
const fileName = ref('')

function onFile(file: File | null) {
  if (!file) {
    parsedRows.value = 0
    fileName.value = ''
    store.clearIssues()
    return
  }
  fileName.value = file.name
  parsedRows.value = store.mockParse()
}

function runImport() {
  store.addJob('import', fileName.value, parsedRows.value)
}

const columns = ['title', 'sku', 'price', 'stock', 'vendor', 'tags'] as const
const selectedColumns = ref<string[]>(['title', 'sku', 'price', 'stock'])

function runExport() {
  store.addJob('export', 'products-export.csv', 1180)
}

const tones: Record<string, Tone> = { completed: 'success', failed: 'danger', processing: 'info' }

const issueHeaders = computed(() => [
  { key: 'row', label: t('dashboard.ops.importExport.row') },
  { key: 'field', label: t('dashboard.ops.importExport.field') },
  { key: 'error', label: t('dashboard.ops.importExport.error') },
])
const jobHeaders = computed(() => [
  { key: 'id', label: t('dashboard.ops.importExport.job') },
  { key: 'kind', label: t('dashboard.ops.importExport.type') },
  { key: 'file', label: t('dashboard.ops.importExport.file') },
  { key: 'rows', label: t('dashboard.ops.importExport.rows') },
  { key: 'createdAt', label: t('dashboard.ops.common.date') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
])
</script>
