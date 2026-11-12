<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-4 px-4 py-3.5">
      <div class="w-full space-y-4">
        <ops-page-header :title="t('dashboard.ops.pos.title')" :subtitle="t('dashboard.ops.pos.subtitle')">
          <LazyVSwitchButton v-model="offline" :label="offline ? t('dashboard.ops.pos.offline') : t('dashboard.ops.pos.online')" />
        </ops-page-header>

        <div
          v-if="offline"
          class="flex items-center gap-2 border border-warning bg-warning-dim text-warning rounded-md px-3 py-2 text-xs font-semibold"
        >
          <Icon name="ph:wifi-slash-bold" class="w-4 h-4" />
          {{ t('dashboard.ops.pos.offlineHint') }}
        </div>

        <section class="card px-4 py-3 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="s in shiftStats" :key="s.key">
            <p class="text-[10px] font-bold tracking-widest text-tx-muted">{{ t(`dashboard.ops.pos.shift.${s.key}`) }}</p>
            <p class="font-mono text-sm font-semibold">{{ s.value }}</p>
          </div>
        </section>

        <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <section class="xl:col-span-2 space-y-3">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <LazyVInput v-model="search" :placeholder="t('dashboard.ops.pos.search')" />
              <LazyVInput
                v-model="barcode"
                :placeholder="t('dashboard.ops.pos.barcode')"
                input-class="font-mono"
                @keyup.enter="scan"
              />
            </div>
            <div v-if="filteredProducts.length" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              <button
                v-for="p in filteredProducts"
                :key="p.id"
                type="button"
                class="card p-4 min-h-28 text-start flex flex-col justify-between gap-3 hover:bg-bg-elevated active:border-brand transition-colors"
                @click="store.add(p)"
              >
                <Icon :name="p.icon" class="w-7 h-7 text-brand" />
                <div>
                  <p class="text-sm font-semibold">{{ p.name }}</p>
                  <p class="font-mono text-xs text-tx-muted">{{ money(p.price) }}</p>
                </div>
              </button>
            </div>
            <ops-empty-state
              v-else
              :title="t('dashboard.ops.pos.noProducts')"
              :hint="t('dashboard.ops.pos.noProductsHint')"
              icon="ph:magnifying-glass-bold"
            />
          </section>

          <aside class="card flex flex-col xl:self-start">
            <header class="px-4 py-3 border-b border-border-subtle flex items-center justify-between">
              <h3 class="text-sm font-bold">{{ t('dashboard.ops.pos.cart') }}</h3>
              <div class="flex items-center gap-3">
                <button
                  v-for="(h, i) in held"
                  :key="i"
                  class="text-[11px] font-semibold text-brand hover:text-brand-hover"
                  @click="store.resume(i)"
                >
                  {{ t('dashboard.ops.pos.resume') }} <span class="font-mono">#{{ i + 1 }}</span>
                  <span class="font-mono text-tx-muted">({{ h.length }})</span>
                </button>
              </div>
            </header>

            <ul v-if="cart.length" class="divide-y divide-border-subtle">
              <li v-for="line in cart" :key="line.id" class="px-4 py-3 flex items-center gap-3">
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-semibold truncate">{{ line.name }}</p>
                  <p class="font-mono text-xs text-tx-muted">{{ money(line.price) }}</p>
                </div>
                <div class="flex items-center gap-1">
                  <button
                    type="button"
                    class="w-9 h-9 rounded-md bg-bg-elevated hover:bg-bg-overlay flex items-center justify-center"
                    :aria-label="t('dashboard.ops.pos.decrease')"
                    @click="store.setQty(line.id, line.qty - 1)"
                  >
                    <Icon name="ph:minus-bold" class="w-4 h-4" />
                  </button>
                  <span class="w-8 text-center font-mono text-sm font-semibold">{{ line.qty }}</span>
                  <button
                    type="button"
                    class="w-9 h-9 rounded-md bg-bg-elevated hover:bg-bg-overlay flex items-center justify-center"
                    :aria-label="t('dashboard.ops.pos.increase')"
                    @click="store.setQty(line.id, line.qty + 1)"
                  >
                    <Icon name="ph:plus-bold" class="w-4 h-4" />
                  </button>
                </div>
                <span class="font-mono text-sm font-semibold w-20 text-end">{{ money(line.price * line.qty) }}</span>
              </li>
            </ul>
            <ops-empty-state
              v-else
              :title="t('dashboard.ops.pos.emptyCart')"
              :hint="t('dashboard.ops.pos.emptyCartHint')"
              icon="ph:shopping-cart-bold"
            />

            <div class="p-4 space-y-3 border-t border-border-subtle">
              <LazyVSelectInput
                v-model="customer"
                :label="t('dashboard.ops.pos.customer')"
                :placeholder="t('dashboard.ops.pos.noCustomer')"
                :options="customerOptions"
              />
              <LazyVInput v-model="discountPct" type="number" :label="t('dashboard.ops.pos.discount')" input-class="font-mono" />

              <dl class="space-y-1.5 text-xs">
                <div class="flex justify-between">
                  <dt class="text-tx-muted">{{ t('dashboard.ops.pos.subtotal') }}</dt>
                  <dd class="font-mono">{{ money(subtotal) }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-tx-muted">{{ t('dashboard.ops.pos.discount') }}</dt>
                  <dd class="font-mono text-success">-{{ money(discountAmount) }}</dd>
                </div>
                <div class="flex justify-between text-base font-bold pt-1.5 border-t border-border-subtle">
                  <dt>{{ t('dashboard.ops.pos.total') }}</dt>
                  <dd class="font-mono">{{ money(total) }}</dd>
                </div>
              </dl>

              <div class="grid grid-cols-3 gap-2">
                <button
                  v-for="m in methods"
                  :key="m.key"
                  type="button"
                  :disabled="!cart.length"
                  :class="[
                    'min-h-14 rounded-md border flex flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors disabled:opacity-40',
                    method === m.key ? 'border-brand bg-brand-dim text-brand' : 'border-border-default hover:bg-bg-elevated',
                  ]"
                  @click="method = m.key"
                >
                  <Icon :name="m.icon" class="w-5 h-5" />
                  {{ t(`dashboard.ops.pos.pay.${m.key}`) }}
                </button>
              </div>

              <div class="flex gap-2">
                <LazyVButton class="flex-1" className="min-h-12" :disabled="!cart.length" :label="t('dashboard.ops.pos.charge')" @click="charge" />
                <LazyVButton variant="secondary" className="min-h-12" :disabled="!cart.length" :label="t('dashboard.ops.pos.hold')" @click="store.hold()" />
                <LazyVButton variant="ghost" className="min-h-12" icon="ph:trash-bold" :disabled="!cart.length" @click="store.clear()" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>

    <LazyVDialog v-model="receiptOpen" :title="t('dashboard.ops.pos.receiptTitle')" maxWidth="sm">
      <div class="font-mono text-xs space-y-3" dir="ltr">
        <div class="text-center">
          <p class="font-bold text-sm">StoreOS</p>
          <p class="text-tx-muted">{{ receipt.id }} · 2026-11-12</p>
        </div>
        <ul class="space-y-1 border-y border-dashed border-border-default py-2">
          <li v-for="l in receipt.lines" :key="l.id" class="flex justify-between">
            <span>{{ l.qty }} x {{ l.name }}</span>
            <span>{{ money(l.price * l.qty) }}</span>
          </li>
        </ul>
        <div class="flex justify-between font-bold text-sm">
          <span>{{ t('dashboard.ops.pos.total') }}</span>
          <span>{{ money(receipt.total) }}</span>
        </div>
        <p class="text-tx-muted text-center">{{ t(`dashboard.ops.pos.pay.${receipt.method}`) }}</p>
      </div>
      <p class="text-center text-xs text-tx-muted mt-4">{{ t('dashboard.ops.pos.thanks') }}</p>
      <template #footer>
        <LazyVButton variant="secondary" icon="ph:printer-bold" iconPosition="left" :label="t('dashboard.ops.pos.print')" />
        <LazyVButton :label="t('dashboard.ops.pos.newSale')" @click="receiptOpen = false" />
      </template>
    </LazyVDialog>
  </div>
</template>

<script lang="ts" setup>
import type { EcoPosCartLine } from '@/types/ecosystem'

const { t } = useI18n()
const { money } = useOpsFormat()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.pos.title') })

const store = useEcoPosStore()
const { cart, held } = storeToRefs(store)
const { products, customers } = store

const offline = ref(false)
const search = ref<string | number | boolean>('')
const barcode = ref<string | number | boolean>('')
const customer = ref('')
const discountPct = ref<string | number | boolean>(0)
const method = ref<'cash' | 'card' | 'wallet'>('cash')
const receiptOpen = ref(false)
const salesToday = ref(14)
const sessionTotal = ref(8450)
const receipt = ref<{ id: string; lines: EcoPosCartLine[]; total: number; method: 'cash' | 'card' | 'wallet' }>({
  id: '',
  lines: [],
  total: 0,
  method: 'cash',
})

const methods = [
  { key: 'cash' as const, icon: 'ph:money-bold' },
  { key: 'card' as const, icon: 'ph:credit-card-bold' },
  { key: 'wallet' as const, icon: 'ph:device-mobile-bold' },
]

const customerOptions = customers.map((c) => ({ value: c, label: c }))

const shiftStats = computed(() => [
  { key: 'cashDrawer', value: money(2000 + sessionTotal.value) },
  { key: 'sales', value: String(salesToday.value) },
  { key: 'revenue', value: money(sessionTotal.value) },
  { key: 'opened', value: '09:00' },
])

const filteredProducts = computed(() => {
  const q = String(search.value).trim().toLowerCase()
  return products.filter((p) => !q || p.name.toLowerCase().includes(q) || p.barcode.includes(q))
})

const subtotal = computed(() => cart.value.reduce((s, l) => s + l.price * l.qty, 0))
const pct = computed(() => Math.min(100, Math.max(0, Number(discountPct.value) || 0)))
const discountAmount = computed(() => Math.round((subtotal.value * pct.value) / 100))
const total = computed(() => subtotal.value - discountAmount.value)

function scan() {
  const code = String(barcode.value).trim()
  const hit = products.find((p) => p.barcode === code)
  if (hit) store.add(hit)
  barcode.value = ''
}

function charge() {
  if (!cart.value.length) return
  receipt.value = {
    id: `POS-${String(salesToday.value + 1).padStart(4, '0')}`,
    lines: cart.value.map((l) => ({ ...l })),
    total: total.value,
    method: method.value,
  }
  salesToday.value += 1
  sessionTotal.value += total.value
  store.clear()
  discountPct.value = 0
  customer.value = ''
  receiptOpen.value = true
}
</script>
