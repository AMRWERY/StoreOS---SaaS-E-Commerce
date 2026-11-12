<template>
  <div>
    <platform-page-header :title="t('platform.flags.title')" :subtitle="t('platform.flags.subtitle')" />

    <section v-if="store.flags.length" class="card divide-y divide-border-subtle">
      <article
        v-for="flag in store.flags"
        :key="flag.key"
        class="grid grid-cols-1 items-center gap-4 px-4 py-4 lg:grid-cols-12"
      >
        <div class="min-w-0 lg:col-span-4">
          <div class="flex flex-wrap items-center gap-2">
            <code class="font-mono text-xs font-semibold text-tx-primary">{{ flag.key }}</code>
            <platform-status-pill
              :label="t(`platform.flags.env.${flag.environment}`)"
              :tone="flag.environment === 'production' ? 'info' : 'yellow'"
            />
          </div>
          <p class="mt-1 text-[11px] text-tx-muted">{{ t(`platform.flags.items.${flag.key}`) }}</p>
        </div>

        <div class="lg:col-span-2">
          <v-switch-button
            :model-value="flag.enabled"
            :label="flag.enabled ? t('platform.flags.enabled') : t('platform.flags.disabled')"
            @update:model-value="(v: boolean) => (flag.enabled = v)"
          />
        </div>

        <div class="lg:col-span-4" :class="flag.enabled ? '' : 'opacity-50'">
          <LazyVRangeInput
            :model-value="flag.rollout"
            :label="t('platform.flags.rollout')"
            :min="0"
            :max="100"
            :step="5"
            unit="%"
            :disabled="!flag.enabled"
            @update:model-value="(v: number | [number, number]) => (flag.rollout = Array.isArray(v) ? v[0] : v)"
          />
        </div>

        <div class="lg:col-span-2">
          <v-select-input
            :model-value="flag.targetPlan"
            :label="t('platform.flags.targetPlan')"
            :options="planOptions"
            @update:model-value="(v: string | number) => (flag.targetPlan = v as PlatformFlag['targetPlan'])"
          />
        </div>
      </article>
    </section>
    <platform-empty-state v-else :title="t('platform.flags.empty')" icon="ph:flag" />
  </div>
</template>

<script lang="ts" setup>
import type { PlatformFlag } from '@/types/platform'

definePageMeta({ layout: 'platform' })

const { t } = useI18n()

useSeoMeta({ title: t('platform.flags.title'), robots: 'noindex, nofollow' })

const store = usePlatformFlagsStore()

const planOptions = computed(() => [
  { value: 'all', label: t('platform.flags.allPlans') },
  ...(['trial', 'free', 'starter', 'growth', 'enterprise'] as const).map((p) => ({
    value: p,
    label: t(`platform.plan.${p}`),
  })),
])
</script>
