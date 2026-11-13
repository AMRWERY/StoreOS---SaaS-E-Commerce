<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header :title="t(`${p}.title`)" :subtitle="t(`${p}.subtitle`)">
          <LazyVButton
            icon="ph:calendar-plus-bold"
            iconPosition="left"
            variant="secondary"
            :label="t(`${p}.newSchedule`)"
            @click="scheduleOpen = true"
          />
        </ops-page-header>

        <section class="card p-4 space-y-4">
          <h2 class="text-sm font-bold">{{ t(`${p}.builderTitle`) }}</h2>

          <div class="space-y-2">
            <p class="text-[11px] font-semibold text-tx-muted">{{ t(`${p}.metrics`) }}</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="m in metricKeys"
                :key="m"
                type="button"
                class="rounded-full border px-3 py-1 text-xs font-semibold transition-colors duration-200"
                :class="
                  metrics.includes(m)
                    ? 'bg-brand-dim border-brand text-brand'
                    : 'bg-bg-elevated border-border-subtle text-tx-secondary hover:text-tx-primary'
                "
                :aria-pressed="metrics.includes(m)"
                @click="toggleMetric(m)"
              >
                {{ t(`${p}.metric.${m}`) }}
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <LazyVSelectInput v-model="dimension" :label="t(`${p}.dimension`)" :options="dimensionOptions" />
            <LazyVSelectInput v-model="filter" :label="t(`${p}.filter`)" :options="filterOptions" />
            <LazyVSelectInput v-model="range" :label="t(`${p}.range`)" :options="rangeOptions" />
          </div>

          <div class="flex flex-wrap items-end justify-between gap-3">
            <LazyVTabs v-model="view" :tabs="viewTabs" />
            <div class="flex items-end gap-2">
              <LazyVInput v-model="reportName" :placeholder="t(`${p}.reportName`)" />
              <LazyVButton
                icon="ph:floppy-disk-bold"
                iconPosition="left"
                :label="t('dashboard.ops.common.save')"
                :disabled="!reportName.trim()"
                @click="save"
              />
            </div>
          </div>

          <div class="border-t border-border-subtle pt-4">
            <p class="text-[11px] font-semibold text-tx-muted mb-3">{{ t(`${p}.preview`) }}</p>

            <div v-if="view === 'chart'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="m in metrics" :key="m" class="rounded-md bg-bg-elevated border border-border-subtle p-3 space-y-3">
                <p class="text-xs font-bold">{{ t(`${p}.metric.${m}`) }}</p>
                <ul class="space-y-2">
                  <li v-for="r in preview" :key="r.label" class="grid grid-cols-[6rem_1fr_5.5rem] items-center gap-2">
                    <span class="text-[11px] text-tx-secondary truncate">{{ r.label }}</span>
                    <insight-bar :pct="(r.values[m] / maxOf(m)) * 100" tone="brand" />
                    <span class="font-mono text-[11px] text-end">{{ fmt(m, r.values[m]) }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div v-else class="overflow-hidden rounded-md border border-border-subtle">
              <LazyVTable :headers="previewHeaders" :items="preview">
                <template v-for="m in metrics" :key="m" #[`cell(${m})`]="{ item }">
                  <span class="font-mono text-sm">{{ fmt(m, item.values[m]) }}</span>
                </template>
              </LazyVTable>
            </div>
          </div>
        </section>

        <section class="card overflow-hidden">
          <div class="p-4 border-b border-border-subtle">
            <h2 class="text-sm font-bold">{{ t(`${p}.savedTitle`) }}</h2>
          </div>
          <ul v-if="saved.length" class="divide-y divide-border-subtle">
            <li v-for="r in saved" :key="r.id" class="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <div>
                <p class="text-sm font-semibold">{{ r.name }}</p>
                <p class="text-[11px] text-tx-muted">
                  {{ r.metrics.map((m) => t(`${p}.metric.${m}`)).join(' / ') }} -
                  {{ t(`${p}.dim.${r.dimension}`) }} -
                  <span class="font-mono">{{ t(`${p}.ranges.${r.range}`) }}</span>
                </p>
              </div>
              <div class="flex items-center gap-4">
                <span class="font-mono text-[11px] text-tx-muted">{{ r.updatedAt }}</span>
                <button class="text-[11px] font-semibold text-brand hover:text-brand-hover transition-colors" @click="load(r)">
                  {{ t(`${p}.open`) }}
                </button>
                <button class="text-[11px] font-semibold text-tx-muted hover:text-danger transition-colors" @click="removeReport(r.id)">
                  {{ t('dashboard.ops.common.delete') }}
                </button>
              </div>
            </li>
          </ul>
          <ops-empty-state v-else :title="t(`${p}.emptySaved`)" :hint="t(`${p}.emptySavedHint`)" icon="ph:bookmark-simple-bold" />
        </section>

        <section class="card overflow-hidden">
          <div class="p-4 border-b border-border-subtle">
            <h2 class="text-sm font-bold">{{ t(`${p}.scheduledTitle`) }}</h2>
          </div>
          <LazyVTable v-if="scheduled.length" :headers="scheduleHeaders" :items="scheduled">
            <template #cell(name)="{ item }">
              <span class="text-sm font-semibold">{{ item.name }}</span>
            </template>
            <template #cell(frequency)="{ item }">
              <span class="text-sm">{{ t(`${p}.freq.${item.frequency}`) }}</span>
            </template>
            <template #cell(recipients)="{ item }">
              <span class="font-mono text-xs text-tx-secondary">{{ item.recipients.join(', ') }}</span>
            </template>
            <template #cell(format)="{ item }">
              <span class="font-mono text-xs font-semibold uppercase">{{ item.format }}</span>
            </template>
            <template #cell(nextRun)="{ item }">
              <span class="font-mono text-xs text-tx-muted">{{ item.nextRun }}</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="item.status === 'active' ? 'success' : 'warning'">
                {{ t(`${p}.scheduleStatus.${item.status}`) }}
              </status-pill>
            </template>
            <template #cell(actions)="{ item }">
              <button class="text-[11px] font-semibold text-tx-muted hover:text-tx-primary transition-colors" @click="toggleSchedule(item.id)">
                {{ item.status === 'active' ? t(`${p}.pause`) : t(`${p}.resume`) }}
              </button>
            </template>
          </LazyVTable>
          <ops-empty-state v-else :title="t(`${p}.emptyScheduled`)" :hint="t(`${p}.emptyScheduledHint`)" icon="ph:calendar-blank-bold" />
        </section>
      </div>
    </div>

    <LazyVSidePanel v-model="scheduleOpen" :title="t(`${p}.newSchedule`)" :subtitle="t(`${p}.scheduleSubtitle`)">
      <form class="space-y-5 p-1" @submit.prevent="submitSchedule">
        <LazyVSelectInput v-model="form.reportId" :label="t(`${p}.report`)" :options="savedOptions" />
        <LazyVSelectInput v-model="form.frequency" :label="t(`${p}.frequency`)" :options="frequencyOptions" />
        <LazyVInput v-model="form.recipients" :label="t(`${p}.recipients`)" placeholder="owner@store.eg, finance@store.eg" required />
        <LazyVSelectInput v-model="form.format" :label="t(`${p}.format`)" :options="formatOptions" />
        <LazyVButton type="submit" class="w-full" :label="t(`${p}.createSchedule`)" :disabled="!saved.length" />
      </form>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
import type {
  ReportDimension,
  ReportFormat,
  ReportFrequency,
  ReportMetric,
  ReportRange,
  ReportView,
  SavedReport,
} from '@/types/insights'

const { t } = useI18n()
const { money } = useOpsFormat()
const p = 'dashboard.ops.reports'

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.reports.title') })

const store = useRepReportsStore()
const { saved, scheduled } = storeToRefs(store)
const { removeReport, toggleSchedule } = store

const metricKeys: ReportMetric[] = ['revenue', 'orders', 'aov', 'sessions', 'conversion']
const metrics = ref<ReportMetric[]>(['revenue', 'orders'])
const dimension = ref<ReportDimension>('channel')
const filter = ref('all')
const range = ref<ReportRange>('30d')
const view = ref<ReportView>('chart')
const reportName = ref('')
const scheduleOpen = ref(false)
const form = reactive({
  reportId: '',
  frequency: 'weekly' as ReportFrequency,
  recipients: '',
  format: 'pdf' as ReportFormat,
})

const dimensionOptions = computed(() =>
  (['channel', 'city', 'payment'] as const).map((d) => ({ value: d, label: t(`${p}.dim.${d}`) })),
)
const filterOptions = computed(() =>
  ['all', 'newCustomers', 'returning', 'codOnly'].map((f) => ({ value: f, label: t(`${p}.filters.${f}`) })),
)
const rangeOptions = computed(() =>
  (['7d', '30d', '90d'] as const).map((r) => ({ value: r, label: t(`${p}.ranges.${r}`) })),
)
const frequencyOptions = computed(() =>
  (['daily', 'weekly', 'monthly'] as const).map((f) => ({ value: f, label: t(`${p}.freq.${f}`) })),
)
const formatOptions = [
  { value: 'csv', label: 'CSV' },
  { value: 'pdf', label: 'PDF' },
]
const savedOptions = computed(() => saved.value.map((r) => ({ value: r.id, label: r.name })))
const viewTabs = computed(() => [
  { name: t(`${p}.chart`), value: 'chart' },
  { name: t(`${p}.table`), value: 'table' },
])

/* ---- mock preview data ---- */
const DIM_VALUES: Record<ReportDimension, string[]> = {
  channel: ['Facebook', 'Instagram', 'Google', 'WhatsApp', 'Direct'],
  city: ['Cairo', 'Giza', 'Alexandria', 'Mansoura', 'Tanta'],
  payment: ['COD', 'Card', 'Fawry', 'Wallet', 'InstaPay'],
}
const WEIGHTS = [0.32, 0.26, 0.18, 0.14, 0.1]
const JITTER = [1, 1.1, 0.9, 1.05, 0.95]
const RANGE_FACTOR: Record<ReportRange, number> = { '7d': 0.25, '30d': 1, '90d': 2.8 }
const FILTER_FACTOR: Record<string, number> = { all: 1, newCustomers: 0.45, returning: 0.55, codOnly: 0.6 }

type Values = Record<ReportMetric, number>
const preview = computed(() => {
  const f = RANGE_FACTOR[range.value] * (FILTER_FACTOR[filter.value] ?? 1)
  const shift = dimension.value === 'channel' ? 0 : dimension.value === 'city' ? 1 : 2
  return DIM_VALUES[dimension.value].map((label, i) => {
    const w = WEIGHTS[(i + shift) % WEIGHTS.length]!
    const j = JITTER[(i + shift) % JITTER.length]!
    const revenue = Math.round(310000 * w * f)
    const orders = Math.round(1480 * w * f * j)
    const sessions = Math.round(48200 * w * f)
    const values: Values = {
      revenue,
      orders,
      sessions,
      aov: orders ? Math.round(revenue / orders) : 0,
      conversion: sessions ? (orders / sessions) * 100 : 0,
    }
    return { label, values }
  })
})
const maxOf = (m: ReportMetric) => Math.max(1, ...preview.value.map((r) => r.values[m]))
const fmt = (m: ReportMetric, v: number) => {
  if (m === 'revenue' || m === 'aov') return money(v)
  if (m === 'conversion') return `${v.toFixed(2)}%`
  return v.toLocaleString('en-US')
}

const previewHeaders = computed(() => [
  { key: 'label', label: t(`${p}.dim.${dimension.value}`) },
  ...metrics.value.map((m) => ({ key: m, label: t(`${p}.metric.${m}`) })),
])

const scheduleHeaders = computed(() => [
  { key: 'name', label: t(`${p}.report`) },
  { key: 'frequency', label: t(`${p}.frequency`) },
  { key: 'recipients', label: t(`${p}.recipients`) },
  { key: 'format', label: t(`${p}.format`) },
  { key: 'nextRun', label: t(`${p}.nextRun`) },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
  { key: 'actions', label: '', align: 'end' as const },
])

function toggleMetric(m: ReportMetric) {
  if (metrics.value.includes(m)) {
    if (metrics.value.length > 1) metrics.value = metrics.value.filter((x) => x !== m)
  } else {
    metrics.value = [...metrics.value, m]
  }
}

function save() {
  if (!reportName.value.trim()) return
  store.saveReport({
    name: reportName.value.trim(),
    metrics: [...metrics.value],
    dimension: dimension.value,
    range: range.value,
    view: view.value,
  })
  reportName.value = ''
}

function load(r: SavedReport) {
  metrics.value = [...r.metrics]
  dimension.value = r.dimension
  range.value = r.range
  view.value = r.view
}

function submitSchedule() {
  const report = saved.value.find((r) => r.id === form.reportId) ?? saved.value[0]
  const recipients = form.recipients
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  if (!report || !recipients.length) return
  store.addSchedule({
    name: report.name,
    frequency: form.frequency,
    recipients,
    format: form.format,
  })
  Object.assign(form, { reportId: '', recipients: '' })
  scheduleOpen.value = false
}
</script>
