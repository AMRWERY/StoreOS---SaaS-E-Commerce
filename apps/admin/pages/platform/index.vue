<template>
  <div>
    <platform-page-header :title="t('platform.overview.title')" :subtitle="t('platform.overview.subtitle')" />

    <!-- KPIs -->
    <div class="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <platform-kpi-card
        :label="t('platform.overview.kpi.activeStores')"
        :value="num(overview.activeStores)"
        icon="ph:storefront"
        :sub="t('platform.overview.kpi.activeStoresSub')"
      />
      <platform-kpi-card
        :label="t('platform.overview.kpi.mrr')"
        :value="`${t('platform.common.egp')} ${compact(overview.mrr)}`"
        icon="ph:repeat"
        icon-color="text-success"
        :sub="t('platform.overview.kpi.mrrSub')"
      />
      <platform-kpi-card
        :label="t('platform.overview.kpi.gmv')"
        :value="`${t('platform.common.egp')} ${compact(overview.gmv)}`"
        icon="ph:chart-line-up"
        icon-color="text-info"
        :sub="t('platform.overview.kpi.gmvSub')"
      />
      <platform-kpi-card
        :label="t('platform.overview.kpi.abuse')"
        :value="num(overview.openAbuseCases)"
        icon="ph:warning-octagon"
        icon-color="text-danger"
        :sub="t('platform.overview.kpi.abuseSub')"
      />
    </div>

    <!-- System health strip -->
    <section class="card mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
      <h3 class="text-eyebrow">{{ t('platform.overview.systemHealth') }}</h3>
      <div v-for="p in health.providers" :key="p.id" class="flex items-center gap-2 text-[11px]">
        <span class="h-2 w-2 rounded-full" :class="DOT[p.status]"></span>
        <span class="text-tx-secondary">{{ p.name }}</span>
        <span class="font-mono text-tx-muted">{{ p.latencyMs ? `${p.latencyMs}ms` : '—' }}</span>
      </div>
      <nuxt-link-locale to="/platform/health" class="ms-auto text-[11px] font-semibold text-brand hover:underline">
        {{ t('platform.overview.viewHealth') }}
      </nuxt-link-locale>
    </section>

    <div class="mb-4 grid grid-cols-1 gap-3 lg:grid-cols-12">
      <!-- Trend -->
      <section class="card px-4 py-3.5 lg:col-span-8">
        <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 class="text-sm font-bold">{{ t('platform.overview.trend.title') }}</h3>
            <p class="text-[11px] text-tx-muted">{{ t('platform.overview.trend.subtitle') }}</p>
          </div>
          <div class="flex rounded-md border border-border-subtle bg-bg-base p-0.5">
            <button
              v-for="opt in metricOptions"
              :key="opt.value"
              type="button"
              class="rounded px-3 py-1 text-[11px] font-semibold transition-colors"
              :class="metric === opt.value ? 'bg-brand-dim text-brand' : 'text-tx-secondary hover:text-tx-primary'"
              @click="metric = opt.value"
            >{{ opt.label }}</button>
          </div>
        </div>
        <div class="flex h-52 items-end gap-3">
          <div v-for="pt in overview.trend" :key="pt.label" class="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
            <span class="font-mono text-[10px] text-tx-secondary">{{ compact(pt[metric]) }}</span>
            <div
              class="w-full rounded-t bg-brand transition-all duration-300"
              :style="{ height: `${(pt[metric] / maxValue) * 100}%` }"
            ></div>
            <span class="font-mono text-[10px] text-tx-muted">{{ pt.label }}</span>
          </div>
        </div>
      </section>

      <!-- Plan distribution -->
      <section class="card px-4 py-3.5 lg:col-span-4">
        <h3 class="mb-1 text-sm font-bold">{{ t('platform.overview.plans.title') }}</h3>
        <p class="mb-4 text-[11px] text-tx-muted">{{ t('platform.overview.plans.subtitle') }}</p>
        <div class="space-y-3">
          <div v-for="row in overview.planDistribution" :key="row.plan">
            <div class="mb-1 flex items-center justify-between text-[11px]">
              <span class="text-tx-secondary">{{ t(`platform.plan.${row.plan}`) }}</span>
              <span class="font-mono text-tx-muted">{{ num(row.stores) }} · {{ share(row.stores) }}%</span>
            </div>
            <div class="h-1.5 overflow-hidden rounded-full bg-bg-elevated">
              <div class="h-full rounded-full bg-brand transition-all duration-300" :style="{ width: `${share(row.stores)}%` }"></div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Recent signups -->
    <section class="card overflow-hidden">
      <div class="flex items-center justify-between border-b border-border-subtle px-4 py-3">
        <h3 class="text-sm font-bold">{{ t('platform.overview.signups.title') }}</h3>
        <nuxt-link-locale to="/platform/merchants" class="text-[11px] font-semibold text-brand hover:underline">
          {{ t('platform.overview.signups.viewAll') }}
        </nuxt-link-locale>
      </div>
      <v-table :headers="headers" :items="recentSignups" table-class="cursor-pointer" @row-click="openMerchant">
        <template #cell(store)="{ item }">
          <span class="text-xs font-semibold text-tx-primary">{{ item.store }}</span>
        </template>
        <template #cell(owner)="{ item }">
          <span class="text-xs text-tx-secondary">{{ item.owner }}</span>
        </template>
        <template #cell(plan)="{ item }">
          <platform-status-pill :label="t(`platform.plan.${item.plan}`)" :tone="tones.plan(item.plan)" />
        </template>
        <template #cell(signupDate)="{ item }">
          <span class="font-mono text-xs text-tx-secondary">{{ item.signupDate }}</span>
        </template>
      </v-table>
    </section>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ layout: 'platform' })

const { t } = useI18n()
const localePath = useLocalePath()
const { num, compact } = usePlatformFormat()
const tones = usePlatformTones()

useSeoMeta({ title: t('platform.overview.title'), robots: 'noindex, nofollow' })

const overview = usePlatformOverviewStore()
const health = usePlatformHealthStore()
const merchantsStore = usePlatformMerchantsStore()

const DOT: Record<string, string> = { healthy: 'bg-success', degraded: 'bg-warning', down: 'bg-danger' }

const metric = ref<'gmv' | 'mrr'>('gmv')
const metricOptions = computed(() => [
  { value: 'gmv' as const, label: t('platform.overview.trend.gmv') },
  { value: 'mrr' as const, label: t('platform.overview.trend.mrr') },
])
const maxValue = computed(() => Math.max(...overview.trend.map((p) => p[metric.value])))

const totalStores = computed(() => overview.planDistribution.reduce((sum, r) => sum + r.stores, 0))
const share = (n: number) => Math.round((n / totalStores.value) * 100)

const headers = computed(() => [
  { label: t('platform.common.store'), key: 'store' },
  { label: t('platform.common.owner'), key: 'owner' },
  { label: t('platform.common.plan'), key: 'plan' },
  { label: t('platform.common.signupDate'), key: 'signupDate', align: 'end' as const },
])

const recentSignups = computed(() =>
  [...merchantsStore.merchants].sort((a, b) => b.signupDate.localeCompare(a.signupDate)).slice(0, 5),
)

const openMerchant = (item: { id: string }) => navigateTo(localePath(`/platform/merchants/${item.id}`))
</script>
