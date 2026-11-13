<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header :title="t(`${p}.title`)" :subtitle="t(`${p}.subtitle`)">
          <div class="w-40">
            <LazyVSelectInput v-model="range" :options="rangeOptions" />
          </div>
          <div class="w-48">
            <LazyVSelectInput v-model="compare" :options="compareOptions" />
          </div>
        </ops-page-header>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LazyVStatCard
            :label="t(`${p}.stats.conversion`)"
            :value="`${overall.toFixed(2)}%`"
            iconName="ph:funnel-bold"
            :trend="compare === 'previous' ? deltaText(overall, prevOverall) : undefined"
            :trendColor="overall >= prevOverall ? 'text-success' : 'text-danger'"
          />
          <LazyVStatCard
            :label="t(`${p}.stats.cartRate`)"
            :value="`${cartRate.toFixed(1)}%`"
            iconName="ph:shopping-cart-bold"
            iconColor="text-info"
          />
          <LazyVStatCard
            :label="t(`${p}.stats.abandoned`)"
            :value="abandonedTotal.toLocaleString('en-US')"
            iconName="ph:warning-bold"
            iconColor="text-warning"
          />
        </div>

        <section class="card p-4 space-y-4">
          <h2 class="text-sm font-bold">{{ t(`${p}.stepsTitle`) }}</h2>
          <ul v-if="rows.length" class="space-y-4">
            <li v-for="(r, i) in rows" :key="r.key" class="space-y-1.5">
              <div class="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span class="font-semibold">{{ i + 1 }}. {{ t(`${p}.steps.${r.key}`) }}</span>
                <span class="flex items-center gap-3 font-mono">
                  <span class="text-tx-primary font-semibold">{{ r.count.toLocaleString('en-US') }}</span>
                  <span v-if="compare === 'previous'" :class="r.delta >= 0 ? 'text-success' : 'text-danger'">
                    {{ r.delta >= 0 ? '+' : '' }}{{ r.delta.toFixed(1) }}%
                  </span>
                  <span v-if="i > 0" class="text-danger">-{{ r.dropOff.toFixed(1) }}%</span>
                </span>
              </div>
              <insight-bar :pct="r.pctOfTop" tone="brand" :opacity="1 - i * 0.15" />
              <p v-if="i > 0" class="text-[11px] text-tx-muted">
                {{ t(`${p}.stepRate`, { rate: r.stepRate.toFixed(1) }) }}
              </p>
            </li>
          </ul>
          <ops-empty-state v-else :title="t(`${p}.empty`)" :hint="t(`${p}.emptyHint`)" icon="ph:funnel-bold" />
        </section>

        <section class="card overflow-hidden">
          <div class="p-4 border-b border-border-subtle">
            <h2 class="text-sm font-bold">{{ t(`${p}.abandonTitle`) }}</h2>
            <p class="text-xs text-tx-muted mt-1">{{ t(`${p}.abandonHint`) }}</p>
          </div>
          <LazyVTable v-if="stages.length" :headers="headers" :items="stages">
            <template #cell(stage)="{ item }">
              <span class="text-sm font-semibold">{{ t(`${p}.stages.${item.key}`) }}</span>
            </template>
            <template #cell(count)="{ item }">
              <span class="font-mono text-sm">{{ item.count.toLocaleString('en-US') }}</span>
            </template>
            <template #cell(share)="{ item }">
              <div class="flex items-center gap-3 min-w-40">
                <insight-bar class="flex-1" :pct="item.share" tone="warning" />
                <span class="font-mono text-xs text-tx-secondary w-12 text-end">{{ item.share.toFixed(1) }}%</span>
              </div>
            </template>
          </LazyVTable>
          <ops-empty-state v-else :title="t(`${p}.empty`)" :hint="t(`${p}.emptyHint`)" icon="ph:shopping-cart-bold" />
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const p = 'dashboard.ops.funnel'

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.funnel.title') })

const store = useRepFunnelStore()
const { steps, previousSteps, abandonment } = storeToRefs(store)

const range = ref('30d')
const compare = ref('none')

const factors: Record<string, number> = { '7d': 0.25, '30d': 1, '90d': 2.8 }
const factor = computed(() => factors[range.value] ?? 1)

const rangeOptions = computed(() => [
  { value: '7d', label: t(`${p}.ranges.7d`) },
  { value: '30d', label: t(`${p}.ranges.30d`) },
  { value: '90d', label: t(`${p}.ranges.90d`) },
])
const compareOptions = computed(() => [
  { value: 'none', label: t(`${p}.compare.none`) },
  { value: 'previous', label: t(`${p}.compare.previous`) },
])

const rows = computed(() => {
  const top = Math.round((steps.value[0]?.count ?? 0) * factor.value)
  return steps.value.map((s, i) => {
    const count = Math.round(s.count * factor.value)
    const prevCount = Math.round((previousSteps.value[i]?.count ?? 0) * factor.value)
    const before = i > 0 ? Math.round(steps.value[i - 1]!.count * factor.value) : count
    const stepRate = before ? (count / before) * 100 : 0
    return {
      key: s.key,
      count,
      pctOfTop: top ? (count / top) * 100 : 0,
      stepRate,
      dropOff: 100 - stepRate,
      delta: prevCount ? ((count - prevCount) / prevCount) * 100 : 0,
    }
  })
})

const overall = computed(() => {
  const first = steps.value[0]?.count ?? 0
  const last = steps.value[steps.value.length - 1]?.count ?? 0
  return first ? (last / first) * 100 : 0
})
const prevOverall = computed(() => {
  const first = previousSteps.value[0]?.count ?? 0
  const last = previousSteps.value[previousSteps.value.length - 1]?.count ?? 0
  return first ? (last / first) * 100 : 0
})
const cartRate = computed(() => {
  const views = steps.value[1]?.count ?? 0
  const carts = steps.value[2]?.count ?? 0
  return views ? (carts / views) * 100 : 0
})
const deltaText = (a: number, b: number) => `${a >= b ? '+' : ''}${(a - b).toFixed(2)}pp`

const abandonedTotal = computed(() =>
  Math.round(abandonment.value.reduce((s, a) => s + a.count, 0) * factor.value),
)
const stages = computed(() => {
  const total = abandonment.value.reduce((s, a) => s + a.count, 0)
  return abandonment.value.map((a) => ({
    key: a.key,
    count: Math.round(a.count * factor.value),
    share: total ? (a.count / total) * 100 : 0,
  }))
})

const headers = computed(() => [
  { key: 'stage', label: t(`${p}.stage`) },
  { key: 'count', label: t(`${p}.abandoned`) },
  { key: 'share', label: t(`${p}.share`) },
])
</script>
