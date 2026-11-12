<template>
  <div>
    <platform-page-header :title="t('platform.plans.title')" :subtitle="t('platform.plans.subtitle')">
      <template #actions>
        <span v-if="saved" class="text-[11px] font-semibold text-success">{{ t('platform.plans.saved') }}</span>
        <v-button icon="ph:floppy-disk" icon-position="left" :label="t('platform.common.save')" @click="save" />
      </template>
    </platform-page-header>

    <!-- Limits -->
    <div class="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
      <section v-for="p in store.plans" :key="p.plan" class="card px-4 py-3.5">
        <div class="mb-3 flex items-center justify-between">
          <platform-status-pill :label="t(`platform.plan.${p.plan}`)" :tone="tones.plan(p.plan)" />
          <span class="font-mono text-xs text-tx-secondary">{{ t('platform.common.egp') }} {{ num(p.priceEgp) }}{{ t('platform.plans.perMonth') }}</span>
        </div>
        <div class="space-y-3">
          <v-input
            v-for="f in limitFields"
            :key="f.key"
            type="number"
            :label="f.label"
            :placeholder="t('platform.common.unlimited')"
            :model-value="p[f.key] ?? ''"
            input-class="font-mono"
            @update:model-value="(v: string | number | boolean) => setLimit(p, f.key, v)"
          />
        </div>
        <p class="mt-3 text-[10px] text-tx-muted">{{ t('platform.plans.blankUnlimited') }}</p>
      </section>
    </div>

    <!-- Feature matrix -->
    <section class="card overflow-hidden">
      <div class="border-b border-border-subtle px-4 py-3">
        <h3 class="text-sm font-bold">{{ t('platform.plans.matrix') }}</h3>
        <p class="text-[11px] text-tx-muted">{{ t('platform.plans.matrixHint') }}</p>
      </div>
      <div class="overflow-x-auto hide-scrollbar">
        <table class="w-full text-start">
          <thead class="border-b border-border-subtle bg-bg-overlay text-[10px] font-semibold text-tx-muted">
            <tr>
              <th class="px-4 py-3 text-start">{{ t('platform.plans.feature') }}</th>
              <th v-for="p in store.plans" :key="p.plan" class="px-4 py-3 text-center">{{ t(`platform.plan.${p.plan}`) }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border-subtle">
            <tr v-for="feature in PLATFORM_FEATURES" :key="feature" class="hover:bg-bg-elevated">
              <td class="px-4 py-2.5 text-xs text-tx-secondary">{{ t(`platform.features.${feature}`) }}</td>
              <td v-for="p in store.plans" :key="p.plan" class="px-4 py-2.5 text-center">
                <button
                  type="button"
                  class="rounded p-1 transition-colors hover:bg-bg-overlay"
                  :aria-label="t(`platform.features.${feature}`)"
                  @click="toggleFeature(p, feature)"
                >
                  <Icon
                    :name="p.features.includes(feature) ? 'ph:check-circle-fill' : 'ph:minus-circle'"
                    class="text-base"
                    :class="p.features.includes(feature) ? 'text-success' : 'text-tx-muted opacity-50'"
                  />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { PLATFORM_FEATURES } from '@/stores/platformPlans'
import type { PlanEntitlement } from '@/types/platform'

definePageMeta({ layout: 'platform' })

const { t } = useI18n()
const { num } = usePlatformFormat()
const tones = usePlatformTones()

useSeoMeta({ title: t('platform.plans.title'), robots: 'noindex, nofollow' })

const store = usePlatformPlansStore()

type LimitKey = 'maxOrders' | 'maxSkus' | 'maxStaff'

const limitFields = computed<{ key: LimitKey; label: string }[]>(() => [
  { key: 'maxOrders', label: t('platform.plans.maxOrders') },
  { key: 'maxSkus', label: t('platform.plans.maxSkus') },
  { key: 'maxStaff', label: t('platform.plans.maxStaff') },
])

const setLimit = (plan: PlanEntitlement, key: LimitKey, value: string | number | boolean) => {
  const raw = String(value).trim()
  plan[key] = raw === '' || Number(raw) < 0 || Number.isNaN(Number(raw)) ? null : Math.floor(Number(raw))
}

const toggleFeature = (plan: PlanEntitlement, feature: string) => {
  plan.features = plan.features.includes(feature)
    ? plan.features.filter((f) => f !== feature)
    : [...plan.features, feature]
}

const saved = ref(false)
const save = () => {
  saved.value = true
  setTimeout(() => (saved.value = false), 2000)
}
</script>
