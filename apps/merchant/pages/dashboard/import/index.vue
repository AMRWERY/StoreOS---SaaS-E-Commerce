<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header :title="t('dashboard.ops.importer.title')" :subtitle="t('dashboard.ops.importer.subtitle')" />

        <section class="space-y-3">
          <h3 class="text-sm font-bold">{{ t('dashboard.ops.importer.chooseSource') }}</h3>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              v-for="s in sources"
              :key="s.id"
              type="button"
              :class="[
                'card p-4 text-start space-y-2 transition-colors',
                source === s.id ? 'border-brand bg-brand-dim' : 'hover:bg-bg-elevated',
              ]"
              @click="pick(s.id)"
            >
              <Icon :name="s.icon" class="w-6 h-6 text-brand" />
              <p class="text-sm font-bold">{{ t(`dashboard.ops.importer.source.${s.id}`) }}</p>
              <p class="text-[11px] text-tx-muted">{{ t(`dashboard.ops.importer.sourceHint.${s.id}`) }}</p>
            </button>
          </div>
        </section>

        <section v-if="source" class="card p-5 space-y-5">
          <ol class="flex flex-wrap items-center gap-3">
            <li v-for="(key, i) in stepKeys" :key="key" class="flex items-center gap-2">
              <span
                :class="[
                  'w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-mono font-semibold',
                  step > i + 1 ? 'bg-success-dim text-success' : step === i + 1 ? 'bg-brand text-white' : 'bg-bg-elevated text-tx-muted',
                ]"
              >
                {{ i + 1 }}
              </span>
              <span :class="['text-xs font-semibold', step === i + 1 ? 'text-tx-primary' : 'text-tx-muted']">
                {{ t(`dashboard.ops.importer.steps.${key}`) }}
              </span>
            </li>
          </ol>

          <div v-if="step === 1" class="space-y-4 max-w-md">
            <template v-if="source === 'csv'">
              <LazyVFileUpload
                :title="t('dashboard.ops.importer.csvDrop')"
                :subtitle="t('dashboard.ops.importer.csvHint')"
                accept=".csv"
              />
            </template>
            <template v-else>
              <p class="text-xs text-tx-muted">{{ t('dashboard.ops.importer.connectHint') }}</p>
              <LazyVInput v-model="storeUrl" :label="t('dashboard.ops.importer.storeUrl')" placeholder="https://" input-class="font-mono" />
              <LazyVInput v-model="apiKey" type="password" :label="t('dashboard.ops.importer.apiKey')" />
            </template>
          </div>

          <div v-else-if="step === 2" class="space-y-3">
            <p class="text-xs text-tx-muted">{{ t('dashboard.ops.importer.mapHint') }}</p>
            <div class="card overflow-hidden">
              <LazyVTable :headers="mapHeaders" :items="fieldMap">
                <template #cell(source)="{ item }">
                  <span class="font-mono text-xs">{{ item.source }}</span>
                </template>
                <template #cell(target)="{ item }">
                  <status-pill tone="info">{{ t(`dashboard.ops.importer.target.${item.target}`) }}</status-pill>
                </template>
              </LazyVTable>
            </div>
          </div>

          <div v-else-if="step === 3" class="space-y-3">
            <p class="text-xs text-tx-muted">{{ t('dashboard.ops.importer.reviewHint') }}</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <LazyVStatCard :label="t('dashboard.ops.importer.products')" :value="result.products" iconName="ph:package-bold" />
              <LazyVStatCard :label="t('dashboard.ops.importer.customers')" :value="result.customers" iconName="ph:users-bold" />
              <LazyVStatCard :label="t('dashboard.ops.importer.orders')" :value="result.orders" iconName="ph:receipt-bold" />
              <LazyVStatCard :label="t('dashboard.ops.importer.redirects')" :value="result.redirects" iconName="ph:arrows-left-right-bold" />
            </div>
          </div>

          <div v-else class="space-y-4">
            <template v-if="progress < 100">
              <div class="flex items-center justify-between text-xs">
                <span class="text-tx-secondary">{{ t('dashboard.ops.importer.running') }}</span>
                <span class="font-mono font-semibold">{{ progress }}%</span>
              </div>
              <div class="h-2 rounded-full bg-bg-elevated overflow-hidden">
                <div class="h-full bg-brand transition-all duration-300" :style="{ width: `${progress}%` }"></div>
              </div>
            </template>
            <template v-else>
              <div class="flex items-center gap-2 text-success">
                <Icon name="ph:check-circle-bold" class="w-5 h-5" />
                <h4 class="text-sm font-bold">{{ t('dashboard.ops.importer.resultTitle') }}</h4>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <LazyVStatCard :label="t('dashboard.ops.importer.products')" :value="result.products" iconName="ph:package-bold" iconColor="text-success" />
                <LazyVStatCard :label="t('dashboard.ops.importer.customers')" :value="result.customers" iconName="ph:users-bold" iconColor="text-success" />
                <LazyVStatCard :label="t('dashboard.ops.importer.orders')" :value="result.orders" iconName="ph:receipt-bold" iconColor="text-success" />
                <LazyVStatCard :label="t('dashboard.ops.importer.redirects')" :value="result.redirects" iconName="ph:arrows-left-right-bold" iconColor="text-success" />
              </div>
              <div class="border border-warning rounded-md bg-warning-dim p-3 space-y-1.5">
                <p class="text-xs font-bold text-warning">
                  {{ t('dashboard.ops.importer.warningsTitle') }}
                  <span class="font-mono">({{ result.warnings }})</span>
                </p>
                <ul class="text-xs text-tx-secondary list-disc ps-4 space-y-0.5">
                  <li v-for="n in result.warnings" :key="n">{{ t(`dashboard.ops.importer.warning${n}`) }}</li>
                </ul>
              </div>
            </template>
          </div>

          <div class="flex items-center gap-2 pt-1">
            <LazyVButton v-if="step > 1 && step < 4" variant="ghost" :label="t('dashboard.ops.importer.back')" @click="step -= 1" />
            <LazyVButton v-if="step < 3" :label="t('dashboard.ops.importer.next')" @click="step += 1" />
            <LazyVButton v-else-if="step === 3" :label="t('dashboard.ops.importer.start')" @click="start" />
            <LazyVButton v-else-if="progress >= 100" variant="secondary" :label="t('dashboard.ops.importer.importAnother')" @click="reset()" />
          </div>
        </section>

        <section class="space-y-3">
          <div class="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 class="text-sm font-bold">{{ t('dashboard.ops.importer.templatesTitle') }}</h3>
              <p class="text-xs text-tx-muted">{{ t('dashboard.ops.importer.templatesHint') }}</p>
            </div>
            <LazyVSwitchButton v-model="sampleData" :label="t('dashboard.ops.importer.sampleData')" />
          </div>
          <div v-if="templates.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <article v-for="tpl in templates" :key="tpl.id" class="card overflow-hidden">
              <div :class="['h-24 bg-gradient-to-br flex items-center justify-center', tpl.gradient]">
                <Icon :name="tpl.icon" class="w-8 h-8 text-tx-primary" />
              </div>
              <div class="p-4 space-y-3">
                <div>
                  <h4 class="text-sm font-bold">{{ t(`dashboard.ops.importer.tpl.${tpl.id}`) }}</h4>
                  <p class="text-[11px] text-tx-muted">
                    <span class="font-mono">{{ sampleData ? tpl.products : 0 }}</span> {{ t('dashboard.ops.importer.products') }}
                    ·
                    <span class="font-mono">{{ tpl.pages }}</span> {{ t('dashboard.ops.importer.pages') }}
                  </p>
                </div>
                <LazyVButton
                  size="sm"
                  class="w-full"
                  :variant="applied === tpl.id ? 'secondary' : 'primary'"
                  :label="applied === tpl.id ? t('dashboard.ops.importer.applied') : t('dashboard.ops.importer.apply')"
                  @click="applied = tpl.id"
                />
              </div>
            </article>
          </div>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.importer.noTemplates')"
            :hint="t('dashboard.ops.importer.noTemplatesHint')"
            icon="ph:squares-four-bold"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { EcoImportSourceId } from '@/types/ecosystem'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.importer.title') })

const { sources, templates, fieldMap, result } = storeToRefs(useEcoImporterStore())

const stepKeys = ['connect', 'map', 'review', 'import'] as const

const source = ref<EcoImportSourceId | null>(null)
const step = ref(1)
const progress = ref(0)
const storeUrl = ref('')
const apiKey = ref('')
const sampleData = ref(true)
const applied = ref<string | null>(null)

let timer: ReturnType<typeof setInterval> | null = null

const mapHeaders = computed(() => [
  { key: 'source', label: t('dashboard.ops.importer.sourceField') },
  { key: 'target', label: t('dashboard.ops.importer.targetField') },
])

function stopTimer() {
  if (timer) clearInterval(timer)
  timer = null
}

function pick(id: EcoImportSourceId) {
  source.value = id
  reset(false)
}

function reset(clearSource = true) {
  stopTimer()
  step.value = 1
  progress.value = 0
  if (clearSource) source.value = null
}

function start() {
  step.value = 4
  progress.value = 0
  stopTimer()
  timer = setInterval(() => {
    progress.value = Math.min(100, progress.value + 10)
    if (progress.value >= 100) stopTimer()
  }, 300)
}

onBeforeUnmount(stopTimer)
</script>
