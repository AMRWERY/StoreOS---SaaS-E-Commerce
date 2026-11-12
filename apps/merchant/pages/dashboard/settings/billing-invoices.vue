<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header :title="t(`${p}.title`)" :subtitle="t(`${p}.subtitle`)" :count="invoices.length" />

        <LazyVAlertBanner v-if="hasFailed" variant="error" icon="ph:warning-circle-bold" :dismissible="false">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p class="font-bold">{{ t(`${p}.dunning.title`) }}</p>
              <p class="text-xs text-tx-secondary mt-0.5">{{ t(`${p}.dunning.body`) }}</p>
            </div>
            <LazyVButton
              size="none"
              className="px-3 py-1.5 text-xs"
              :label="t(`${p}.updateMethod`)"
              @click="cardOpen = true"
            />
          </div>
        </LazyVAlertBanner>

        <section class="card p-4 space-y-4">
          <div class="flex items-center justify-between gap-3">
            <h2 class="text-sm font-bold">{{ t(`${p}.usageTitle`) }}</h2>
            <status-pill tone="purple">{{ t(`${p}.currentPlan`, { plan: planConfig.label }) }}</status-pill>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div v-for="m in meters" :key="m.key" class="space-y-2">
              <div class="flex items-center justify-between text-xs">
                <span class="font-semibold">{{ t(`${p}.meters.${m.key}`) }}</span>
                <span class="font-mono text-tx-secondary">
                  {{ m.used.toLocaleString('en-US') }} / {{ m.limit === null ? t(`${p}.unlimited`) : m.limit.toLocaleString('en-US') }}
                </span>
              </div>
              <insight-bar :pct="m.pct" :tone="m.tone" />
            </div>
          </div>
        </section>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <section class="card p-4 space-y-4">
            <h2 class="text-sm font-bold">{{ t(`${p}.methodTitle`) }}</h2>
            <div class="flex items-center justify-between gap-3 rounded-md border border-border-subtle bg-bg-elevated p-4">
              <div class="flex items-center gap-3">
                <Icon name="ph:credit-card-bold" class="text-2xl text-tx-secondary" />
                <div>
                  <p class="font-mono text-sm font-semibold" dir="ltr">{{ card.brand }} **** {{ card.last4 }}</p>
                  <p class="text-[11px] text-tx-muted">{{ t(`${p}.expires`) }} <span class="font-mono">{{ card.expiry }}</span></p>
                </div>
              </div>
              <LazyVButton
                variant="secondary"
                size="none"
                className="px-3 py-1.5 text-xs"
                :label="t(`${p}.updateMethod`)"
                @click="cardOpen = true"
              />
            </div>
          </section>

          <section class="card p-4 space-y-3">
            <div class="flex items-center justify-between">
              <h2 class="text-sm font-bold">{{ t(`${p}.upcomingTitle`) }}</h2>
              <span class="font-mono text-[11px] text-tx-muted">{{ t(`${p}.upcomingDate`) }}: 2026-12-01</span>
            </div>
            <dl class="space-y-2 text-sm">
              <div class="flex justify-between"><dt class="text-tx-muted">{{ t(`${p}.planFee`, { plan: planConfig.label }) }}</dt><dd class="font-mono">{{ money(planFee) }}</dd></div>
              <div class="flex justify-between"><dt class="text-tx-muted">{{ t(`${p}.vat`) }}</dt><dd class="font-mono">{{ money(vat(planFee)) }}</dd></div>
              <div class="flex justify-between border-t border-border-subtle pt-2 font-bold"><dt>{{ t(`${p}.total`) }}</dt><dd class="font-mono">{{ money(withVat(planFee)) }}</dd></div>
            </dl>
          </section>
        </div>

        <section class="card overflow-hidden">
          <div class="p-4 border-b border-border-subtle">
            <h2 class="text-sm font-bold">{{ t(`${p}.invoicesTitle`) }}</h2>
          </div>
          <LazyVTable v-if="invoices.length" :headers="headers" :items="invoices">
            <template #cell(id)="{ item }">
              <span class="font-mono text-sm font-semibold text-brand">{{ item.id }}</span>
            </template>
            <template #cell(period)="{ item }">
              <span class="font-mono text-xs text-tx-muted">{{ item.period }}</span>
            </template>
            <template #cell(amount)="{ item }">
              <div>
                <p class="font-mono text-sm font-semibold">{{ money(withVat(item.net)) }}</p>
                <p class="font-mono text-[10px] text-tx-muted">{{ t(`${p}.inclVat`) }}</p>
              </div>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="tones[item.status]">{{ t(`${p}.status.${item.status}`) }}</status-pill>
            </template>
            <template #cell(actions)="{ item }">
              <button
                class="inline-flex items-center gap-1 text-[11px] font-semibold text-tx-muted hover:text-tx-primary transition-colors"
                :aria-label="t(`${p}.downloadInvoice`, { id: item.id })"
              >
                <Icon name="ph:download-simple-bold" />
                {{ t(`${p}.download`) }}
              </button>
            </template>
          </LazyVTable>
          <ops-empty-state v-else :title="t(`${p}.empty`)" :hint="t(`${p}.emptyHint`)" icon="ph:receipt-bold" />
        </section>
      </div>
    </div>

    <LazyVSidePanel v-model="cardOpen" :title="t(`${p}.updateMethod`)" :subtitle="t(`${p}.updateSubtitle`)">
      <form class="space-y-5 p-1" @submit.prevent="submitCard">
        <LazyVInput v-model="cardForm.number" :label="t(`${p}.cardNumber`)" placeholder="4242 4242 4242 4242" dir="ltr" required />
        <div class="grid grid-cols-2 gap-4">
          <LazyVInput v-model="cardForm.expiry" :label="t(`${p}.expiry`)" placeholder="MM/YY" dir="ltr" required />
          <LazyVInput v-model="cardForm.cvc" :label="t(`${p}.cvc`)" placeholder="123" dir="ltr" required />
        </div>
        <LazyVButton type="submit" class="w-full" :label="t(`${p}.saveMethod`)" />
      </form>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'

const { t } = useI18n()
const { money } = useOpsFormat()
const p = 'dashboard.ops.billingInvoices'

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.billingInvoices.title') })

const { planConfig, plan } = useAuth()
const store = useFinBillingStore()
const { usage, invoices, card } = storeToRefs(store)

const VAT_RATE = 0.14
const vat = (net: number) => Math.round(net * VAT_RATE * 100) / 100
const withVat = (net: number) => Math.round(net * (1 + VAT_RATE) * 100) / 100

const tones: Record<string, Tone> = { paid: 'success', failed: 'danger', due: 'warning' }

const hasFailed = computed(() => invoices.value.some((i) => i.status === 'failed'))
const planFee = computed(() => store.planPrices[plan.value] ?? 0)

const meters = computed(() => {
  const cfg = planConfig.value
  const rows = [
    { key: 'orders', raw: usage.value.orders, limit: cfg.maxOrders },
    { key: 'skus', raw: usage.value.skus, limit: cfg.maxSkus },
    { key: 'members', raw: usage.value.members, limit: cfg.maxMembers },
  ]
  return rows.map((r) => {
    const used = r.limit ? Math.min(r.raw, Math.max(1, Math.round(r.limit * 0.72))) : r.raw
    const pct = r.limit ? (used / r.limit) * 100 : 8
    const tone: 'brand' | 'warning' | 'danger' = pct >= 95 ? 'danger' : pct >= 80 ? 'warning' : 'brand'
    return { key: r.key, used, limit: r.limit, pct, tone }
  })
})

const headers = computed(() => [
  { key: 'id', label: t(`${p}.invoiceNumber`) },
  { key: 'period', label: t(`${p}.period`) },
  { key: 'amount', label: t('dashboard.ops.common.amount') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
  { key: 'actions', label: '', align: 'end' as const },
])

const cardOpen = ref(false)
const cardForm = reactive({ number: '', expiry: '', cvc: '' })

function submitCard() {
  const digits = cardForm.number.replace(/\D/g, '')
  if (digits.length < 12 || !cardForm.expiry || !cardForm.cvc) return
  store.updateCard(digits.slice(-4), cardForm.expiry)
  Object.assign(cardForm, { number: '', expiry: '', cvc: '' })
  cardOpen.value = false
}
</script>
