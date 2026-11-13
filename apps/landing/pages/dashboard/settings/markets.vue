<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header :title="t(`${p}.title`)" :subtitle="t(`${p}.subtitle`)" :count="markets.length">
          <LazyVButton
            icon="ph:plus-bold"
            iconPosition="left"
            :label="t(`${p}.create`)"
            :disabled="!availableCountries.length"
            @click="openPanel"
          />
        </ops-page-header>

        <section v-if="markets.length" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <article v-for="m in markets" :key="m.code" class="card p-4 space-y-4">
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-2">
                <h3 class="text-sm font-bold">{{ t(`${p}.countries.${m.code}`) }}</h3>
                <status-pill v-if="m.primary" tone="purple">{{ t(`${p}.primary`) }}</status-pill>
              </div>
              <span class="font-mono text-xs font-semibold text-brand">{{ m.currency }}</span>
            </div>

            <dl class="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
              <div>
                <dt class="text-tx-muted">{{ t(`${p}.language`) }}</dt>
                <dd class="font-semibold mt-0.5">{{ t(`${p}.lang.${m.language}`) }}</dd>
              </div>
              <div>
                <dt class="text-tx-muted">{{ t(`${p}.ratePolicy`) }}</dt>
                <dd class="mt-0.5">
                  <span class="font-semibold">{{ t(`${p}.policy.${m.ratePolicy}`) }}</span>
                  <span v-if="!m.primary" class="font-mono text-tx-secondary"> - 1 EGP = {{ m.rate }} {{ m.currency }}</span>
                </dd>
              </div>
              <div>
                <dt class="text-tx-muted">{{ t(`${p}.rounding`) }}</dt>
                <dd class="font-semibold mt-0.5">{{ t(`${p}.rules.${m.rounding}`) }}</dd>
              </div>
              <div>
                <dt class="text-tx-muted">{{ t(`${p}.domain`) }}</dt>
                <dd class="mt-0.5">
                  <span class="font-semibold">{{ t(`${p}.strategy.${m.domainStrategy}`) }}</span>
                  <span class="font-mono text-tx-secondary" dir="ltr"> - {{ m.domain }}</span>
                </dd>
              </div>
            </dl>

            <div class="space-y-2">
              <p class="text-[11px] font-semibold text-tx-muted">{{ t(`${p}.shippingMethods`) }}</p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="s in shippingKeys"
                  :key="s"
                  type="button"
                  class="rounded-full border px-2.5 py-0.5 text-[10px] font-semibold transition-colors duration-200"
                  :class="chip(m.shipping.includes(s))"
                  :aria-pressed="m.shipping.includes(s)"
                  @click="toggleMethod(m.code, 'shipping', s)"
                >
                  {{ t(`${p}.ship.${s}`) }}
                </button>
              </div>
            </div>
            <div class="space-y-2">
              <p class="text-[11px] font-semibold text-tx-muted">{{ t(`${p}.paymentMethods`) }}</p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="s in paymentKeys"
                  :key="s"
                  type="button"
                  class="rounded-full border px-2.5 py-0.5 text-[10px] font-semibold transition-colors duration-200"
                  :class="chip(m.payment.includes(s))"
                  :aria-pressed="m.payment.includes(s)"
                  @click="toggleMethod(m.code, 'payment', s)"
                >
                  {{ t(`${p}.pay.${s}`) }}
                </button>
              </div>
            </div>
          </article>
        </section>
        <ops-empty-state v-else :title="t(`${p}.empty`)" :hint="t(`${p}.emptyHint`)" icon="ph:globe-hemisphere-west-bold" />

        <section class="card overflow-hidden">
          <div class="p-4 border-b border-border-subtle">
            <h2 class="text-sm font-bold">{{ t(`${p}.priceListTitle`) }}</h2>
            <p class="text-xs text-tx-muted mt-1">{{ t(`${p}.priceListHint`) }}</p>
          </div>
          <LazyVTable v-if="products.length" :headers="priceHeaders" :items="products">
            <template #cell(name)="{ item }">
              <span class="text-sm font-semibold">{{ item.name }}</span>
            </template>
            <template #cell(base)="{ item }">
              <span class="font-mono text-sm">{{ item.base.toLocaleString('en-US') }} EGP</span>
            </template>
            <template v-for="m in foreignMarkets" :key="m.code" #[`cell(${m.code})`]="{ item }">
              <span class="font-mono text-sm">{{ convert(item.base, m) }} {{ m.currency }}</span>
            </template>
          </LazyVTable>
          <ops-empty-state v-else :title="t(`${p}.emptyPrices`)" :hint="t(`${p}.emptyHint`)" icon="ph:tag-bold" />
        </section>
      </div>
    </div>

    <LazyVSidePanel v-model="isOpen" :title="t(`${p}.create`)" :subtitle="t(`${p}.createSubtitle`)">
      <form class="space-y-5 p-1" @submit.prevent="submit">
        <LazyVSelectInput v-model="form.code" :label="t(`${p}.country`)" :options="countryOptions" />
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <LazyVInput :modelValue="defaults.currency" :label="t(`${p}.currency`)" readonly />
          <LazyVSelectInput v-model="form.language" :label="t(`${p}.language`)" :options="languageOptions" />
        </div>
        <LazyVSelectInput v-model="form.ratePolicy" :label="t(`${p}.ratePolicy`)" :options="policyOptions" />
        <LazyVInput v-model="form.rate" type="number" :label="t(`${p}.rate`)" :disabled="form.ratePolicy === 'auto'" required />
        <LazyVSelectInput v-model="form.rounding" :label="t(`${p}.rounding`)" :options="roundingOptions" />
        <LazyVSelectInput v-model="form.domainStrategy" :label="t(`${p}.domain`)" :options="strategyOptions" />
        <LazyVButton type="submit" class="w-full" :label="t(`${p}.create`)" />
      </form>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
import { MARKET_DEFAULTS } from '@/stores/finMarkets'
import type {
  DomainStrategy,
  Market,
  MarketCode,
  MarketPayment,
  MarketShipping,
  RatePolicy,
  RoundingRule,
} from '@/types/insights'

const { t } = useI18n()
const p = 'dashboard.ops.markets'

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.markets.title') })

const store = useFinMarketsStore()
const { markets, products } = storeToRefs(store)
const { toggleMethod } = store

const shippingKeys: MarketShipping[] = ['bosta', 'aramex', 'dhl', 'pickup']
const paymentKeys: MarketPayment[] = ['cod', 'card', 'fawry', 'wallet', 'mada', 'applePay']

const chip = (on: boolean) =>
  on
    ? 'bg-brand-dim border-brand text-brand'
    : 'bg-bg-elevated border-border-subtle text-tx-muted hover:text-tx-primary'

const foreignMarkets = computed(() => markets.value.filter((m) => !m.primary))

const priceHeaders = computed(() => [
  { key: 'name', label: t(`${p}.product`) },
  { key: 'base', label: t(`${p}.basePrice`) },
  ...foreignMarkets.value.map((m) => ({ key: m.code, label: `${m.currency} (${m.code})` })),
])

function convert(base: number, m: Market): string {
  const raw = base * m.rate
  let v = raw
  if (m.rounding === 'whole') v = Math.round(raw)
  else if (m.rounding === 'five') v = Math.round(raw / 5) * 5
  else if (m.rounding === 'ninetyNine') v = Math.max(0, Math.floor(raw) + 0.99)
  return v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

/* ---- create-market panel ---- */
const isOpen = ref(false)
const allCodes = Object.keys(MARKET_DEFAULTS) as MarketCode[]
const availableCountries = computed(() => allCodes.filter((c) => !markets.value.some((m) => m.code === c)))
const countryOptions = computed(() =>
  availableCountries.value.map((c) => ({ value: c, label: t(`${p}.countries.${c}`) })),
)
const languageOptions = computed(() => [
  { value: 'ar', label: t(`${p}.lang.ar`) },
  { value: 'en', label: t(`${p}.lang.en`) },
])
const policyOptions = computed(() =>
  (['auto', 'manual'] as const).map((k) => ({ value: k, label: t(`${p}.policy.${k}`) })),
)
const roundingOptions = computed(() =>
  (['none', 'whole', 'five', 'ninetyNine'] as const).map((k) => ({ value: k, label: t(`${p}.rules.${k}`) })),
)
const strategyOptions = computed(() =>
  (['domain', 'subfolder', 'subdomain'] as const).map((k) => ({ value: k, label: t(`${p}.strategy.${k}`) })),
)

const form = reactive({
  code: '' as string,
  language: 'ar' as 'ar' | 'en',
  ratePolicy: 'auto' as RatePolicy,
  rate: '' as string | number,
  rounding: 'whole' as RoundingRule,
  domainStrategy: 'subfolder' as DomainStrategy,
})
const defaults = computed(() => MARKET_DEFAULTS[form.code as MarketCode] ?? { currency: '', rate: 0, language: 'ar' as const })

watch(
  () => form.code,
  (code) => {
    const d = MARKET_DEFAULTS[code as MarketCode]
    if (d) {
      form.rate = d.rate
      form.language = d.language
    }
  },
)

function openPanel() {
  form.code = availableCountries.value[0] ?? ''
  isOpen.value = true
}

function submit() {
  const code = form.code as MarketCode
  const rate = Number(form.rate)
  if (!MARKET_DEFAULTS[code] || !rate) return
  store.addMarket({
    code,
    currency: MARKET_DEFAULTS[code].currency,
    language: form.language,
    ratePolicy: form.ratePolicy,
    rate,
    rounding: form.rounding,
    domainStrategy: form.domainStrategy,
  })
  isOpen.value = false
}
</script>
