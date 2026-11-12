<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-6xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.bundles.title')"
          :subtitle="t('dashboard.ops.bundles.subtitle')"
          :count="bundles.length"
        >
          <LazyVButton
            icon="ph:plus-bold"
            iconPosition="left"
            :label="t('dashboard.ops.bundles.create')"
            @click="isOpen = true"
          />
        </ops-page-header>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LazyVStatCard
            :label="t('dashboard.ops.bundles.stats.total')"
            :value="bundles.length"
            iconName="ph:package-bold"
            valueColor="font-mono"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.bundles.stats.active')"
            :value="bundles.filter((b) => b.status === 'active').length"
            iconName="ph:check-circle-bold"
            iconColor="text-success"
            valueColor="font-mono"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.bundles.stats.savings')"
            :value="`${avgDiscount}%`"
            iconName="ph:tag-bold"
            iconColor="text-accent"
            valueColor="font-mono"
          />
        </div>

        <section class="card overflow-hidden">
          <LazyVTable v-if="bundles.length" :headers="headers" :items="bundles">
            <template #cell(name)="{ item }">
              <div>
                <p class="text-sm font-semibold">{{ item.name }}</p>
                <p class="font-mono text-[10px] text-tx-muted">{{ item.id }}</p>
              </div>
            </template>
            <template #cell(items)="{ item }">
              <span class="text-xs text-tx-secondary">
                {{ itemsLabel(item) }}
              </span>
            </template>
            <template #cell(price)="{ item }">
              <div>
                <p class="font-mono text-sm font-semibold">{{ money(item.price) }}</p>
                <p class="font-mono text-[10px] text-tx-muted line-through">{{ money(bundleSum(item)) }}</p>
              </div>
            </template>
            <template #cell(discount)="{ item }">
              <span class="font-mono text-sm text-success">{{ discountPct(item) }}%</span>
            </template>
            <template #cell(stock)="{ item }">
              <span :class="['font-mono text-sm', item.stock ? '' : 'text-danger']">{{ item.stock }}</span>
            </template>
            <template #cell(status)="{ item }">
              <status-pill :tone="tones[item.status]">{{ t(`dashboard.ops.bundles.status.${item.status}`) }}</status-pill>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.bundles.empty')"
            :hint="t('dashboard.ops.bundles.emptyHint')"
            icon="ph:package-bold"
          />
        </section>

        <section class="card overflow-hidden">
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle px-5 py-3">
            <div>
              <h2 class="text-sm font-semibold">{{ t('dashboard.ops.bundles.upsell.title') }}</h2>
              <p class="mt-0.5 text-[11px] text-tx-muted">{{ t('dashboard.ops.bundles.upsell.subtitle') }}</p>
            </div>
          </div>
          <ul v-if="rules.length" class="divide-y divide-border-subtle">
            <li v-for="r in rules" :key="r.id" class="flex flex-wrap items-center gap-3 px-5 py-3">
              <span class="text-sm font-medium">{{ productName(r.triggerId) }}</span>
              <Icon name="ph:arrow-right-bold" class="text-tx-muted rtl:rotate-180" />
              <span class="text-sm font-medium text-brand">{{ productName(r.offeredId) }}</span>
              <status-pill tone="info" class="ms-auto">{{ t(`dashboard.ops.bundles.placement.${r.placement}`) }}</status-pill>
              <button
                class="text-tx-muted transition-colors hover:text-danger"
                :aria-label="t('dashboard.ops.common.delete')"
                @click="removeRule(r.id)"
              >
                <Icon name="ph:trash-bold" />
              </button>
            </li>
          </ul>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.bundles.upsell.empty')"
            :hint="t('dashboard.ops.bundles.upsell.emptyHint')"
            icon="ph:arrows-split-bold"
          />
          <form class="grid grid-cols-1 items-end gap-3 border-t border-border-subtle p-5 md:grid-cols-4" @submit.prevent="submitRule">
            <LazyVSelectInput v-model="ruleForm.triggerId" :label="t('dashboard.ops.bundles.upsell.trigger')" :options="productOptions" />
            <LazyVSelectInput v-model="ruleForm.offeredId" :label="t('dashboard.ops.bundles.upsell.offered')" :options="productOptions" />
            <LazyVSelectInput v-model="ruleForm.placement" :label="t('dashboard.ops.bundles.upsell.placement')" :options="placementOptions" />
            <LazyVButton type="submit" :label="t('dashboard.ops.bundles.upsell.add')" :disabled="ruleForm.triggerId === ruleForm.offeredId" />
          </form>
        </section>
      </div>
    </div>

    <LazyVSidePanel
      v-model="isOpen"
      :title="t('dashboard.ops.bundles.create')"
      :subtitle="t('dashboard.ops.bundles.createSubtitle')"
    >
      <form class="space-y-5 p-1" @submit.prevent="submit">
        <LazyVInput v-model="form.name" :label="t('dashboard.ops.bundles.name')" required />

        <div class="space-y-2">
          <p class="text-[10px] font-bold tracking-wider text-tx-secondary">{{ t('dashboard.ops.bundles.pickProducts') }}</p>
          <ul class="space-y-2">
            <li
              v-for="p in products"
              :key="p.id"
              :class="[
                'flex items-center gap-3 rounded-md border px-3 py-2 transition-colors',
                (qty[p.id] ?? 0) > 0 ? 'border-brand bg-brand-dim' : 'border-border-subtle bg-bg-elevated',
              ]"
            >
              <div class="min-w-0 flex-1">
                <p class="truncate text-xs font-medium">{{ p.name }}</p>
                <p class="font-mono text-[10px] text-tx-muted">{{ money(p.price) }}</p>
              </div>
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  class="flex h-6 w-6 items-center justify-center rounded border border-border-default text-tx-secondary transition-colors hover:text-tx-primary"
                  @click="step(p.id, -1)"
                >
                  <Icon name="ph:minus-bold" />
                </button>
                <span class="w-5 text-center font-mono text-xs">{{ qty[p.id] ?? 0 }}</span>
                <button
                  type="button"
                  class="flex h-6 w-6 items-center justify-center rounded border border-border-default text-tx-secondary transition-colors hover:text-tx-primary"
                  @click="step(p.id, 1)"
                >
                  <Icon name="ph:plus-bold" />
                </button>
              </div>
            </li>
          </ul>
        </div>

        <div class="space-y-2 rounded-md border border-border-subtle bg-bg-elevated p-3 text-xs">
          <div class="flex items-center justify-between">
            <span class="text-tx-muted">{{ t('dashboard.ops.bundles.sum') }}</span>
            <span class="font-mono">{{ money(draftSum) }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-tx-muted">{{ t('dashboard.ops.bundles.suggested') }}</span>
            <span class="font-mono text-brand">{{ money(suggested) }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-tx-muted">{{ t('dashboard.ops.bundles.discount') }}</span>
            <span class="font-mono text-success">{{ draftDiscount }}%</span>
          </div>
        </div>

        <LazyVInput
          v-model="form.price"
          type="number"
          :label="t('dashboard.ops.bundles.price')"
          :placeholder="String(suggested)"
        />
        <LazyVInput v-model="form.stock" type="number" :label="t('dashboard.ops.bundles.stockLabel')" />
        <LazyVButton type="submit" class="w-full" :label="t('dashboard.ops.bundles.create')" :disabled="!selectedItems.length" />
      </form>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
import type { Bundle, BundleItem, UpsellPlacement } from '@/types/marketing'
import type { Tone } from '@/types/operations'

const { t } = useI18n()
const { money } = useOpsFormat()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.bundles.title') })

const store = useMktBundlesStore()
const { bundles, rules } = storeToRefs(store)
const { products, productName, bundleSum, removeRule } = store

const itemsLabel = (b: Bundle) => b.items.map((i) => `${productName(i.productId)} ×${i.qty}`).join('، ')

const tones: Record<string, Tone> = { active: 'success', draft: 'neutral' }

const headers = computed(() => [
  { key: 'name', label: t('dashboard.ops.bundles.cols.bundle') },
  { key: 'items', label: t('dashboard.ops.bundles.cols.products') },
  { key: 'price', label: t('dashboard.ops.bundles.cols.price') },
  { key: 'discount', label: t('dashboard.ops.bundles.cols.discount') },
  { key: 'stock', label: t('dashboard.ops.bundles.cols.stock') },
  { key: 'status', label: t('dashboard.ops.common.statusLabel') },
])

const discountPct = (b: Bundle) => {
  const sum = bundleSum(b)
  return sum ? Math.round(((sum - b.price) / sum) * 100) : 0
}
const avgDiscount = computed(() =>
  bundles.value.length ? Math.round(bundles.value.reduce((s, b) => s + discountPct(b), 0) / bundles.value.length) : 0,
)

// Create panel
const isOpen = ref(false)
const form = reactive({ name: '', price: '' as string | number, stock: 10 as string | number })
const qty = reactive<Record<string, number>>({})

function step(id: string, d: number) {
  qty[id] = Math.max(0, (qty[id] ?? 0) + d)
}

const selectedItems = computed<BundleItem[]>(() =>
  Object.entries(qty)
    .filter(([, n]) => n > 0)
    .map(([productId, n]) => ({ productId, qty: n })),
)
const draftSum = computed(() => bundleSum({ items: selectedItems.value }))
const suggested = computed(() => Math.round(draftSum.value * 0.9))
const finalPrice = computed(() => Number(form.price) || suggested.value)
const draftDiscount = computed(() =>
  draftSum.value ? Math.max(0, Math.round(((draftSum.value - finalPrice.value) / draftSum.value) * 100)) : 0,
)

function submit() {
  if (!form.name.trim() || !selectedItems.value.length) return
  store.addBundle({
    name: form.name.trim(),
    items: selectedItems.value,
    price: finalPrice.value,
    stock: Number(form.stock) || 0,
    status: 'active',
  })
  Object.keys(qty).forEach((k) => delete qty[k])
  Object.assign(form, { name: '', price: '', stock: 10 })
  isOpen.value = false
}

// Upsell rules
const productOptions = computed(() => products.map((p) => ({ value: p.id, label: p.name })))
const placementOptions = computed(() =>
  (['product', 'cart', 'post_purchase'] as UpsellPlacement[]).map((p) => ({
    value: p,
    label: t(`dashboard.ops.bundles.placement.${p}`),
  })),
)
const ruleForm = reactive({ triggerId: 'p1', offeredId: 'p2', placement: 'product' as UpsellPlacement })

function submitRule() {
  if (ruleForm.triggerId === ruleForm.offeredId) return
  store.addRule({ ...ruleForm })
}
</script>
