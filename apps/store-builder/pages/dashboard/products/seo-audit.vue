<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.seoAudit.title')"
          :subtitle="t('dashboard.ops.seoAudit.subtitle')"
          :count="rows.length"
        />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LazyVStatCard
            :label="t('dashboard.ops.seoAudit.stats.average')"
            :value="`${average}/100`"
            iconName="ph:gauge-bold"
            iconColor="text-brand"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.seoAudit.stats.healthy')"
            :value="rows.filter((r) => r.score >= 80).length"
            iconName="ph:check-circle-bold"
            iconColor="text-success"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.seoAudit.stats.needsWork')"
            :value="rows.filter((r) => r.score < 60).length"
            iconName="ph:warning-bold"
            iconColor="text-warning"
          />
        </div>

        <section class="card overflow-hidden">
          <LazyVTable v-if="rows.length" :headers="headers" :items="rows">
            <template #cell(title)="{ item }">
              <span class="text-sm font-semibold">{{ item.title }}</span>
            </template>
            <template #cell(score)="{ item }">
              <status-pill :tone="scoreTone(item.score)">
                <span class="font-mono">{{ item.score }}</span>
              </status-pill>
            </template>
            <template #cell(missing)="{ item }">
              <div v-if="item.missing.length" class="flex flex-wrap gap-1">
                <status-pill v-for="m in item.missing" :key="m" tone="danger">
                  {{ t(`dashboard.ops.seoAudit.fields.${m}`) }}
                </status-pill>
              </div>
              <span v-else class="text-xs text-tx-muted">{{ t('dashboard.ops.seoAudit.complete') }}</span>
            </template>
            <template #cell(actions)="{ item }">
              <nuxt-link-locale
                :to="`/dashboard/products/product-form?id=${item.id}`"
                class="text-xs font-semibold text-brand hover:text-brand-hover transition-colors"
              >
                {{ t('dashboard.ops.seoAudit.quickFix') }}
              </nuxt-link-locale>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.seoAudit.empty')"
            :hint="t('dashboard.ops.seoAudit.emptyHint')"
            icon="ph:magnifying-glass-bold"
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
useSeoPage({ titleTemplate: () => t('dashboard.ops.seoAudit.title') })

const store = useCatxSeoAuditStore()
const { rows, average } = storeToRefs(store)

const scoreTone = (s: number): Tone => (s >= 80 ? 'success' : s >= 60 ? 'warning' : 'danger')

const headers = computed(() => [
  { key: 'title', label: t('dashboard.ops.seoAudit.product') },
  { key: 'score', label: t('dashboard.ops.seoAudit.score') },
  { key: 'missing', label: t('dashboard.ops.seoAudit.missing') },
  { key: 'actions', label: '' },
])
</script>
