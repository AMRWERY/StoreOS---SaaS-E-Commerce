<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.policies.title')"
          :subtitle="t('dashboard.ops.policies.subtitle')"
        />

        <LazyVTabs v-model="tab" :tabs="tabs" />

        <section class="card p-4 space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <h2 class="text-sm font-semibold">{{ t(`dashboard.ops.policies.names.${tab}`) }}</h2>
              <status-pill :tone="current.published ? 'success' : 'neutral'">
                {{ current.published ? t('dashboard.ops.policies.published') : t('dashboard.ops.policies.unpublished') }}
              </status-pill>
            </div>
            <LazyVSwitchButton v-model="current.published" :label="t('dashboard.ops.policies.publish')" />
          </div>

          <LazyVTextareaInput
            v-model="current.body"
            :rows="12"
            :placeholder="t('dashboard.ops.policies.placeholder')"
          />

          <div class="flex flex-wrap items-center justify-between gap-3">
            <span class="text-[11px] text-tx-muted">
              {{ t('dashboard.ops.policies.lastUpdated') }}:
              <span class="font-mono">{{ current.updatedAt }}</span>
            </span>
            <div class="flex items-center gap-2">
              <LazyVButton
                variant="secondary"
                size="none"
                className="px-3 py-1.5 text-[11px]"
                icon="ph:magic-wand-bold"
                :label="t('dashboard.ops.policies.generate')"
                @click="generate(tab)"
              />
              <LazyVButton
                size="none"
                className="px-4 py-1.5 text-[11px]"
                :label="t('dashboard.ops.common.save')"
                @click="save(tab)"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PolicyKey } from '@/types/storeContent'

const { t } = useI18n()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.policies.title') })

const store = useStorePoliciesStore()
const { policies } = storeToRefs(store)
const { generate, save } = store

const tab = ref<PolicyKey>('privacy')
const current = computed(() => store.get(tab.value))

const tabs = computed(() =>
  (['privacy', 'refund', 'shipping', 'terms'] as PolicyKey[]).map((k) => ({
    name: t(`dashboard.ops.policies.names.${k}`),
    value: k,
    count: policies.value.find((p) => p.key === k)?.published ? 1 : 0,
  })),
)
</script>
