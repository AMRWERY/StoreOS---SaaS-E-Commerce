<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header :title="t(`${p}.title`)" :subtitle="t(`${p}.subtitle`)" :count="cohorts.length" />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LazyVStatCard
            :label="t(`${p}.stats.avgM1`)"
            :value="`${avgM1.toFixed(1)}%`"
            iconName="ph:arrow-counter-clockwise-bold"
          />
          <LazyVStatCard
            :label="t(`${p}.stats.avgLtv`)"
            :value="money(avgLtv)"
            iconName="ph:coins-bold"
            iconColor="text-success"
          />
          <LazyVStatCard
            :label="t(`${p}.stats.bestCohort`)"
            :value="best?.cohort ?? '-'"
            iconName="ph:trophy-bold"
            iconColor="text-accent"
          />
        </div>

        <section class="card overflow-hidden">
          <div class="p-4 border-b border-border-subtle">
            <h2 class="text-sm font-bold">{{ t(`${p}.heatmapTitle`) }}</h2>
            <p class="text-xs text-tx-muted mt-1">{{ t(`${p}.heatmapHint`) }}</p>
          </div>
          <div v-if="cohorts.length" class="overflow-x-auto">
            <table class="w-full text-xs">
              <thead>
                <tr class="text-tx-muted">
                  <th class="px-4 py-2 text-start font-semibold">{{ t(`${p}.cohort`) }}</th>
                  <th class="px-3 py-2 text-end font-semibold">{{ t(`${p}.size`) }}</th>
                  <th v-for="m in monthCols" :key="m" class="px-1 py-2 text-center font-mono font-semibold">M{{ m }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="c in cohorts" :key="c.cohort" class="border-t border-border-subtle">
                  <td class="px-4 py-2 font-mono font-semibold">{{ c.cohort }}</td>
                  <td class="px-3 py-2 font-mono text-end text-tx-secondary">{{ c.size }}</td>
                  <td v-for="m in monthCols" :key="m" class="p-1">
                    <div
                      v-if="c.retention[m] !== undefined"
                      class="relative h-9 min-w-12 rounded overflow-hidden bg-bg-elevated flex items-center justify-center"
                    >
                      <div class="absolute inset-0 bg-brand" :style="{ opacity: (c.retention[m] ?? 0) / 100 }" />
                      <span class="relative font-mono text-[11px] font-semibold text-tx-primary">
                        {{ c.retention[m] }}%
                      </span>
                    </div>
                    <div v-else class="h-9 min-w-12 flex items-center justify-center text-tx-muted font-mono">-</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <ops-empty-state v-else :title="t(`${p}.empty`)" :hint="t(`${p}.emptyHint`)" icon="ph:users-three-bold" />
        </section>

        <section class="card p-4 space-y-4">
          <h2 class="text-sm font-bold">{{ t(`${p}.ltvTitle`) }}</h2>
          <ul v-if="cohorts.length" class="space-y-3">
            <li v-for="c in cohorts" :key="c.cohort" class="grid grid-cols-[5rem_1fr_6rem] items-center gap-3">
              <span class="font-mono text-xs font-semibold">{{ c.cohort }}</span>
              <insight-bar :pct="(c.ltv / maxLtv) * 100" tone="success" />
              <span class="font-mono text-xs text-end">{{ money(c.ltv) }}</span>
            </li>
          </ul>
          <ops-empty-state v-else :title="t(`${p}.empty`)" :hint="t(`${p}.emptyHint`)" icon="ph:coins-bold" />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const { money } = useOpsFormat()
const p = 'dashboard.ops.cohorts'

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.cohorts.title') })

const { cohorts } = storeToRefs(useRepCohortsStore())

const monthCols = computed(() =>
  Array.from({ length: Math.max(0, ...cohorts.value.map((c) => c.retention.length)) }, (_, i) => i),
)
const avgM1 = computed(() => {
  const vals = cohorts.value.map((c) => c.retention[1]).filter((v): v is number => v !== undefined)
  return vals.length ? vals.reduce((s, v) => s + v, 0) / vals.length : 0
})
const avgLtv = computed(() =>
  cohorts.value.length ? Math.round(cohorts.value.reduce((s, c) => s + c.ltv, 0) / cohorts.value.length) : 0,
)
const maxLtv = computed(() => Math.max(1, ...cohorts.value.map((c) => c.ltv)))
const best = computed(() => [...cohorts.value].sort((a, b) => b.ltv - a.ltv)[0])
</script>
