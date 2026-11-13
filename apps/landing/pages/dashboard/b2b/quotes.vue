<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.b2b.quotes.title')"
          :subtitle="t('dashboard.ops.b2b.quotes.subtitle')"
          :count="quotes.length"
        />

        <eco-b2b-tabs />

        <section class="card overflow-hidden">
          <LazyVTable v-if="quotes.length" :headers="headers" :items="quotes">
            <template #cell(id)="{ item }">
              <button class="font-mono text-sm font-semibold text-brand hover:text-brand-hover transition-colors" @click="selectedId = item.id">
                {{ item.id }}
              </button>
            </template>
            <template #cell(date)="{ item }">
              <span class="font-mono text-xs text-tx-muted">{{ item.date }}</span>
            </template>
            <template #cell(total)="{ item }">
              <span class="font-mono text-sm font-semibold">{{ money(totalOf(item)) }}</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="tones[item.status]">{{ t(`dashboard.ops.b2b.quoteStatus.${item.status}`) }}</status-pill>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.b2b.quotes.empty')"
            :hint="t('dashboard.ops.b2b.quotes.emptyHint')"
            icon="ph:file-text-bold"
          />
        </section>
      </div>
    </div>

    <LazyVSidePanel
      v-model="panelOpen"
      :title="selected?.id ?? ''"
      :subtitle="t('dashboard.ops.b2b.quotes.detail')"
    >
      <div v-if="selected" class="space-y-5 p-1">
        <div>
          <p class="text-sm font-semibold">{{ selected.company }}</p>
          <p class="text-xs text-tx-muted">{{ selected.contact }}</p>
        </div>

        <div class="card overflow-hidden">
          <LazyVTable :headers="lineHeaders" :items="selected.lines">
            <template #cell(qty)="{ item }">
              <span class="font-mono text-sm">{{ item.qty }}</span>
            </template>
            <template #cell(unitPrice)="{ item }">
              <span class="font-mono text-sm">{{ money(item.unitPrice) }}</span>
            </template>
          </LazyVTable>
        </div>

        <LazyVInput v-model="discount" type="number" :label="t('dashboard.ops.b2b.quotes.discount')" :disabled="selected.status !== 'requested'" />

        <dl class="space-y-1.5 text-xs">
          <div class="flex justify-between">
            <dt class="text-tx-muted">{{ t('dashboard.ops.b2b.quotes.subtotal') }}</dt>
            <dd class="font-mono">{{ money(subtotalOf(selected)) }}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-tx-muted">{{ t('dashboard.ops.b2b.quotes.discount') }}</dt>
            <dd class="font-mono text-success">-{{ Math.min(100, Math.max(0, Number(discount) || 0)) }}%</dd>
          </div>
          <div class="flex justify-between text-sm font-bold pt-1.5 border-t border-border-subtle">
            <dt>{{ t('dashboard.ops.b2b.quotes.total') }}</dt>
            <dd class="font-mono">{{ money(Math.round(subtotalOf(selected) * (1 - pct / 100))) }}</dd>
          </div>
        </dl>

        <LazyVButton
          v-if="selected.status === 'requested'"
          class="w-full"
          icon="ph:paper-plane-tilt-bold"
          iconPosition="left"
          :label="t('dashboard.ops.b2b.quotes.send')"
          @click="send"
        />
      </div>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
import type { EcoQuote } from '@/types/ecosystem'
import type { Tone } from '@/types/operations'

const { t } = useI18n()
const { money } = useOpsFormat()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.b2b.quotes.title') })

const store = useEcoB2bStore()
const { quotes } = storeToRefs(store)

const selectedId = ref<string | null>(null)
const discount = ref<string | number>(0)

const selected = computed(() => quotes.value.find((q) => q.id === selectedId.value) ?? null)
const panelOpen = computed({
  get: () => selected.value !== null,
  set: (v: boolean) => {
    if (!v) selectedId.value = null
  },
})
const pct = computed(() => Math.min(100, Math.max(0, Number(discount.value) || 0)))

watch(selected, (q) => {
  discount.value = q?.discountPct ?? 0
})

const tones: Record<string, Tone> = { requested: 'warning', sent: 'info', accepted: 'success', expired: 'neutral' }

const headers = computed(() => [
  { key: 'id', label: t('dashboard.ops.b2b.quotes.quote') },
  { key: 'company', label: t('dashboard.ops.b2b.quotes.company') },
  { key: 'contact', label: t('dashboard.ops.b2b.quotes.contact') },
  { key: 'date', label: t('dashboard.ops.common.date') },
  { key: 'total', label: t('dashboard.ops.b2b.quotes.total') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
])
const lineHeaders = computed(() => [
  { key: 'name', label: t('dashboard.ops.b2b.quotes.item') },
  { key: 'qty', label: t('dashboard.ops.b2b.quotes.qty') },
  { key: 'unitPrice', label: t('dashboard.ops.b2b.quotes.unitPrice') },
])

const subtotalOf = (q: EcoQuote) => q.lines.reduce((s, l) => s + l.qty * l.unitPrice, 0)
const totalOf = (q: EcoQuote) => Math.round(subtotalOf(q) * (1 - q.discountPct / 100))

function send() {
  if (selected.value) store.sendQuote(selected.value.id, pct.value)
}
</script>
