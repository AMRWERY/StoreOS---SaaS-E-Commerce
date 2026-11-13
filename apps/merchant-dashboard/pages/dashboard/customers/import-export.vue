<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.customerIo.title')"
          :subtitle="t('dashboard.ops.customerIo.subtitle')"
          :count="jobs.length"
        />

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section class="card px-4 py-3.5 space-y-4">
            <h2 class="text-eyebrow">{{ t('dashboard.ops.customerIo.importTitle') }}</h2>
            <LazyVFileUpload
              accept=".csv"
              :title="t('dashboard.ops.customerIo.uploadTitle')"
              :subtitle="t('dashboard.ops.customerIo.uploadHint')"
              @change="onFile"
            />

            <template v-if="fileName">
              <p class="text-xs text-tx-secondary">
                {{ t('dashboard.ops.customerIo.mapping') }}
                <span class="font-mono text-tx-muted">{{ fileName }}</span>
              </p>
              <div class="space-y-2">
                <div v-for="(col, i) in columns" :key="col" class="grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
                  <span class="font-mono text-xs bg-bg-elevated border border-border-subtle rounded px-2 py-1.5">{{ col }}</span>
                  <Icon name="ph:arrow-right-bold" class="text-tx-muted rtl:rotate-180" />
                  <LazyVSelectInput v-model="mapping[i]" :options="fieldOptions" />
                </div>
              </div>

              <div class="overflow-hidden border border-border-subtle rounded-md">
                <LazyVTable :headers="previewHeaders" :items="previewItems">
                  <template v-for="(col, i) in columns" :key="col" #[`cell(c${i})`]="{ item }">
                    <span class="font-mono text-xs">{{ item[`c${i}`] }}</span>
                  </template>
                </LazyVTable>
              </div>

              <div class="border border-border-subtle rounded-md overflow-hidden">
                <div class="px-3 py-2 border-b border-border-subtle flex items-center justify-between">
                  <h3 class="text-eyebrow">{{ t('dashboard.ops.customerIo.validation') }}</h3>
                  <status-pill tone="danger"><span class="font-mono">{{ errors.length }}</span></status-pill>
                </div>
                <LazyVTable v-if="errors.length" :headers="errorHeaders" :items="errors">
                  <template #cell(row)="{ item }">
                    <span class="font-mono text-xs">{{ item.row }}</span>
                  </template>
                  <template #cell(field)="{ item }">
                    <span class="font-mono text-xs">{{ item.field }}</span>
                  </template>
                  <template #cell(reason)="{ item }">
                    <span class="text-xs text-danger">{{ t(`dashboard.ops.customerIo.reasons.${item.reason}`) }}</span>
                  </template>
                </LazyVTable>
                <ops-empty-state v-else :title="t('dashboard.ops.customerIo.noErrors')" icon="ph:check-circle-bold" />
              </div>

              <LazyVButton class="w-full" :label="t('dashboard.ops.customerIo.startImport')" @click="startImport" />
            </template>
          </section>

          <section class="card px-4 py-3.5 space-y-4 self-start">
            <h2 class="text-eyebrow">{{ t('dashboard.ops.customerIo.exportTitle') }}</h2>
            <LazyVSelectInput v-model="exportFilter" :label="t('dashboard.ops.customerIo.filter')" :options="filterOptions" />
            <LazyVSwitchButton v-model="includeTags" :label="t('dashboard.ops.customerIo.includeTags')" />
            <LazyVButton
              variant="secondary"
              icon="ph:download-simple-bold"
              iconPosition="left"
              class="w-full"
              :label="t('dashboard.ops.customerIo.startExport')"
              @click="startExport"
            />
          </section>
        </div>

        <section class="card overflow-hidden">
          <div class="px-4 py-3 border-b border-border-subtle">
            <h2 class="text-eyebrow">{{ t('dashboard.ops.customerIo.history') }}</h2>
          </div>
          <LazyVTable v-if="jobs.length" :headers="jobHeaders" :items="jobs">
            <template #cell(kind)="{ item }">
              <status-pill :tone="item.kind === 'import' ? 'info' : 'purple'">
                {{ t(`dashboard.ops.customerIo.kinds.${item.kind}`) }}
              </status-pill>
            </template>
            <template #cell(file)="{ item }">
              <span class="font-mono text-xs">{{ item.file }}</span>
            </template>
            <template #cell(rows)="{ item }">
              <span class="font-mono text-sm">{{ item.rows }}</span>
            </template>
            <template #cell(date)="{ item }">
              <span class="font-mono text-xs">{{ item.date }}</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="jobTones[item.status]">
                {{ t(`dashboard.ops.customerIo.statuses.${item.status}`) }}
              </status-pill>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.customerIo.emptyJobs')"
            :hint="t('dashboard.ops.customerIo.emptyJobsHint')"
            icon="ph:clock-counter-clockwise-bold"
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
useSeoPage({ titleTemplate: () => t('dashboard.ops.customerIo.title') })

const store = useCatxCustomerIoStore()
const { jobs, columns, previewRows, errors } = storeToRefs(store)

const fileName = ref('')
const mapping = ref<string[]>(['name', 'email', 'phone', 'city'])
const exportFilter = ref('all')
const includeTags = ref(true)

const jobTones: Record<string, Tone> = { done: 'success', processing: 'info', failed: 'danger' }

const fieldKeys = ['name', 'email', 'phone', 'city', 'skip']
const fieldOptions = computed(() => fieldKeys.map((k) => ({ value: k, label: t(`dashboard.ops.customerIo.fields.${k}`) })))
const filterOptions = computed(() =>
  ['all', 'marketing', 'vip', 'inactive'].map((k) => ({ value: k, label: t(`dashboard.ops.customerIo.filters.${k}`) })),
)

const previewHeaders = computed(() => columns.value.map((c, i) => ({ key: `c${i}`, label: c })))
const previewItems = computed(() =>
  previewRows.value.map((r, idx) => {
    const row: Record<string, string | number> = { id: idx }
    r.forEach((v, i) => {
      row[`c${i}`] = v
    })
    return row
  }),
)

const errorHeaders = computed(() => [
  { key: 'row', label: t('dashboard.ops.customerIo.cols.row') },
  { key: 'field', label: t('dashboard.ops.customerIo.cols.field') },
  { key: 'reason', label: t('dashboard.ops.customerIo.cols.reason') },
])

const jobHeaders = computed(() => [
  { key: 'kind', label: t('dashboard.ops.customerIo.cols.type') },
  { key: 'file', label: t('dashboard.ops.customerIo.cols.file') },
  { key: 'rows', label: t('dashboard.ops.customerIo.cols.rows') },
  { key: 'date', label: t('dashboard.ops.common.date') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
])

function onFile(file: File | null) {
  fileName.value = file ? file.name : ''
}

function startImport() {
  store.addJob('import', fileName.value, previewRows.value.length)
}

function startExport() {
  store.addJob('export', `customers-${exportFilter.value}.csv`, 0)
}
</script>
