<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.translations.title')"
          :subtitle="t('dashboard.ops.translations.subtitle')"
          :count="rows.length"
        />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LazyVStatCard
            :label="t('dashboard.ops.translations.stats.complete')"
            :value="`${overall}%`"
            iconName="ph:translate-bold"
            iconColor="text-success"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.translations.stats.missing')"
            :value="count('missing')"
            iconName="ph:warning-bold"
            iconColor="text-danger"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.translations.stats.outdated')"
            :value="count('outdated')"
            iconName="ph:clock-counter-clockwise-bold"
            iconColor="text-warning"
          />
        </div>

        <LazyVTabs v-model="tab" :tabs="tabs" />

        <section class="card overflow-hidden">
          <LazyVTable v-if="filtered.length" :headers="headers" :items="filtered">
            <template #cell(nameEn)="{ item }">
              <div class="space-y-0.5">
                <p class="text-sm font-medium">{{ item.nameEn }}</p>
                <p class="text-[10px] text-tx-muted">{{ t(`dashboard.ops.translations.kinds.${item.kind}`) }}</p>
              </div>
            </template>
            <template #cell(nameAr)="{ item }">
              <LazyVInput
                :modelValue="item.nameAr"
                :placeholder="t('dashboard.ops.translations.arPlaceholder')"
                inputClass="text-end"
                dir="rtl"
                @update:modelValue="(v: string | number | boolean) => setArabic(item.id, String(v))"
              />
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="tones[item.descriptionStatus]">
                {{ t(`dashboard.ops.translations.status.${item.descriptionStatus}`) }}
              </status-pill>
            </template>
            <template #cell(completeness)="{ item }">
              <div class="flex items-center gap-2 min-w-[110px]">
                <div class="flex-1">
                  <LazyVProgressBar
                    :progress="item.completeness"
                    :color="item.completeness === 100 ? 'green' : 'amber'"
                    :height="4"
                    :shadow="false"
                    :showProgressText="false"
                  />
                </div>
                <span class="font-mono text-[11px] text-tx-secondary">{{ item.completeness }}%</span>
              </div>
            </template>
            <template #cell(actions)="{ item }">
              <div class="flex justify-end">
                <LazyVButton
                  v-if="item.descriptionStatus !== 'translated'"
                  size="none"
                  variant="secondary"
                  className="px-3 py-1 text-[11px]"
                  :label="t('dashboard.ops.translations.markDone')"
                  @click="markStatus(item.id, 'translated')"
                />
              </div>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.translations.empty')"
            :hint="t('dashboard.ops.translations.emptyHint')"
            icon="ph:translate-bold"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TranslationStatus } from '@/types/storeContent'
import type { Tone } from '@/types/operations'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.translations.title') })

const store = useContentTranslationsStore()
const { rows } = storeToRefs(store)
const { setArabic, markStatus } = store

const tab = ref('all')
const count = (s: TranslationStatus) => rows.value.filter((r) => r.descriptionStatus === s).length
const overall = computed(() =>
  rows.value.length ? Math.round(rows.value.reduce((s, r) => s + r.completeness, 0) / rows.value.length) : 0,
)

const tabs = computed(() => [
  { name: t('dashboard.ops.common.all'), value: 'all', count: rows.value.length },
  { name: t('dashboard.ops.translations.status.missing'), value: 'missing', count: count('missing') },
  { name: t('dashboard.ops.translations.status.outdated'), value: 'outdated', count: count('outdated') },
])

const filtered = computed(() =>
  tab.value === 'all' ? rows.value : rows.value.filter((r) => r.descriptionStatus === tab.value),
)

const tones: Record<string, Tone> = { translated: 'success', missing: 'danger', outdated: 'warning' }

const headers = computed(() => [
  { key: 'nameEn', label: t('dashboard.ops.translations.nameEn') },
  { key: 'nameAr', label: t('dashboard.ops.translations.nameAr') },
  { key: 'status', label: t('dashboard.ops.translations.descStatus') },
  { key: 'completeness', label: t('dashboard.ops.translations.completeness') },
  { key: 'actions', label: '', align: 'end' as const },
])
</script>
