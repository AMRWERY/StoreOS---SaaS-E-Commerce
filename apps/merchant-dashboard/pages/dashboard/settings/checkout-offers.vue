<template>
  <div class="min-h-screen text-tx-primary flex flex-col overflow-hidden pb-10 -mt-10">
    <div class="flex-1 overflow-y-auto space-y-6 px-4 py-3.5">
      <div class="max-w-5xl mx-auto space-y-6">
        <ops-page-header
          :title="t('dashboard.ops.checkoutOffers.title')"
          :subtitle="t('dashboard.ops.checkoutOffers.subtitle')"
          :count="offers.length"
        >
          <LazyVButton icon="ph:plus-bold" :label="t('dashboard.ops.checkoutOffers.create')" @click="openPanel" />
        </ops-page-header>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LazyVStatCard
            :label="t('dashboard.ops.checkoutOffers.stats.revenue')"
            :value="money(totalRevenue)"
            iconName="ph:coins-bold"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.checkoutOffers.stats.views')"
            :value="totalViews.toLocaleString('en-US')"
            iconName="ph:eye-bold"
          />
          <LazyVStatCard
            :label="t('dashboard.ops.checkoutOffers.stats.conversion')"
            :value="`${avgConversion}%`"
            iconName="ph:chart-line-up-bold"
            iconColor="text-success"
          />
        </div>

        <LazyVTabs v-model="tab" :tabs="tabs" />

        <section class="card overflow-hidden">
          <LazyVTable v-if="rows.length" :headers="headers" :items="rows">
            <template #cell(name)="{ item }">
              <span class="text-sm font-medium">{{ item.name }}</span>
            </template>
            <template #cell(trigger)="{ item }">
              <div class="text-xs">
                <p class="text-tx-muted">{{ t(`dashboard.ops.checkoutOffers.triggers.${item.triggerType}`) }}</p>
                <p :class="item.triggerType === 'cart_value' ? 'font-mono' : ''">
                  {{ item.triggerType === 'cart_value' ? money(Number(item.trigger)) : item.trigger }}
                </p>
              </div>
            </template>
            <template #cell(offered)="{ item }">
              <span class="text-xs">{{ productById(item.offeredProductId)?.label }}</span>
            </template>
            <template #cell(discount)="{ item }">
              <span class="font-mono text-sm">
                {{ item.discountType === 'percent' ? `${item.discountValue}%` : money(item.discountValue) }}
              </span>
            </template>
            <template #cell(placement)="{ item }">
              <status-pill :tone="placementTones[item.placement]">
                {{ t(`dashboard.ops.checkoutOffers.placements.${item.placement}`) }}
              </status-pill>
            </template>
            <template #cell(views)="{ item }">
              <span class="font-mono text-xs">{{ item.views.toLocaleString('en-US') }}</span>
            </template>
            <template #cell(conversion)="{ item }">
              <span class="font-mono text-xs">{{ conversionOf(item) }}%</span>
            </template>
            <template #cell(revenue)="{ item }">
              <span class="font-mono text-sm">{{ money(item.revenue) }}</span>
            </template>
            <template #cell(enabled)="{ item }">
              <LazyVSwitchButton :modelValue="item.enabled" @update:modelValue="toggle(item.id)" />
            </template>
            <template #cell(actions)="{ item }">
              <div class="flex justify-end">
                <LazyVButton
                  size="none"
                  variant="ghost"
                  className="px-3 py-1 text-[11px]"
                  :label="t('common.delete')"
                  @click="remove(item.id)"
                />
              </div>
            </template>
          </LazyVTable>
          <ops-empty-state
            v-else
            :title="t('dashboard.ops.checkoutOffers.empty')"
            :hint="t('dashboard.ops.checkoutOffers.emptyHint')"
            icon="ph:gift-bold"
          />
        </section>
      </div>
    </div>

    <LazyVSidePanel
      v-model="panelOpen"
      width="lg"
      :title="t('dashboard.ops.checkoutOffers.panel.title')"
      :subtitle="t('dashboard.ops.checkoutOffers.panel.subtitle')"
    >
      <div class="space-y-4">
        <LazyVInput v-model="draft.name" :label="t('dashboard.ops.checkoutOffers.panel.name')" />
        <LazyVSelectInput
          v-model="draft.triggerType"
          :label="t('dashboard.ops.checkoutOffers.panel.triggerType')"
          :options="triggerTypeOptions"
        />
        <LazyVSelectInput
          v-if="draft.triggerType === 'product'"
          v-model="draft.trigger"
          :label="t('dashboard.ops.checkoutOffers.panel.triggerProduct')"
          :options="productLabelOptions"
        />
        <LazyVSelectInput
          v-else-if="draft.triggerType === 'collection'"
          v-model="draft.trigger"
          :label="t('dashboard.ops.checkoutOffers.panel.triggerCollection')"
          :options="collectionOptions"
        />
        <LazyVInput
          v-else
          v-model="draft.trigger"
          type="number"
          inputClass="font-mono"
          :label="t('dashboard.ops.checkoutOffers.panel.triggerCartValue')"
        />
        <LazyVSelectInput
          v-model="draft.offeredProductId"
          :label="t('dashboard.ops.checkoutOffers.panel.offered')"
          :options="productOptions"
        />
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <LazyVSelectInput
            v-model="draft.discountType"
            :label="t('dashboard.ops.checkoutOffers.panel.discountType')"
            :options="discountTypeOptions"
          />
          <LazyVInput
            :modelValue="String(draft.discountValue)"
            type="number"
            inputClass="font-mono"
            :label="t('dashboard.ops.checkoutOffers.panel.discountValue')"
            @update:modelValue="(v: string | number | boolean) => (draft.discountValue = Number(v))"
          />
        </div>
        <LazyVSelectInput
          v-model="draft.placement"
          :label="t('dashboard.ops.checkoutOffers.panel.placement')"
          :options="placementOptions"
        />

        <div class="space-y-2">
          <p class="text-[10px] font-bold text-tx-secondary tracking-wider">
            {{ t('dashboard.ops.checkoutOffers.panel.preview') }}
          </p>
          <chk-offer-preview
            :title="productById(draft.offeredProductId)?.label ?? ''"
            :price="productById(draft.offeredProductId)?.price ?? 0"
            :discounted="discountedPrice(draft)"
          />
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <LazyVButton variant="secondary" :label="t('common.cancel')" @click="panelOpen = false" />
          <LazyVButton :label="t('common.create')" :disabled="!canSave" @click="submit" />
        </div>
      </template>
    </LazyVSidePanel>
  </div>
</template>

<script lang="ts" setup>
import type { Tone } from '@/types/operations'
import type {
  CheckoutOffer,
  OfferDiscountType,
  OfferKind,
  OfferPlacement,
  OfferTriggerType,
} from '@/types/checkoutExtras'

const { t } = useI18n()
const { money } = useOpsFormat()

definePageMeta({ layout: 'dashboard' })
useSeoPage({ titleTemplate: () => t('dashboard.ops.checkoutOffers.title') })

const store = useChkOffersStore()
const { offers, products, collections, totalRevenue, totalViews, avgConversion } = storeToRefs(store)
const { productById, discountedPrice, toggle, remove, addOffer, byKind } = store

const tab = ref('bump')
const kind = computed<OfferKind>(() => (tab.value === 'post_purchase' ? 'post_purchase' : 'bump'))
const tabs = computed(() => [
  { name: t('dashboard.ops.checkoutOffers.tabs.bump'), value: 'bump', count: byKind('bump').length },
  { name: t('dashboard.ops.checkoutOffers.tabs.post_purchase'), value: 'post_purchase', count: byKind('post_purchase').length },
])
const rows = computed(() => offers.value.filter((o) => o.kind === kind.value))

const placementTones: Record<string, Tone> = { in_checkout: 'info', thank_you: 'purple' }

const conversionOf = (o: CheckoutOffer) =>
  o.views ? (Math.round((o.conversions / o.views) * 1000) / 10).toFixed(1) : '0.0'

const headers = computed(() => [
  { key: 'name', label: t('dashboard.ops.checkoutOffers.cols.name') },
  { key: 'trigger', label: t('dashboard.ops.checkoutOffers.cols.trigger') },
  { key: 'offered', label: t('dashboard.ops.checkoutOffers.cols.offered') },
  { key: 'discount', label: t('dashboard.ops.checkoutOffers.cols.discount') },
  { key: 'placement', label: t('dashboard.ops.checkoutOffers.cols.placement') },
  { key: 'views', label: t('dashboard.ops.checkoutOffers.cols.views') },
  { key: 'conversion', label: t('dashboard.ops.checkoutOffers.cols.conversion') },
  { key: 'revenue', label: t('dashboard.ops.checkoutOffers.cols.revenue') },
  { key: 'enabled', label: t('dashboard.ops.checkoutOffers.cols.enabled') },
  { key: 'actions', label: '', align: 'end' as const },
])

const triggerTypeOptions = computed(() =>
  (['product', 'collection', 'cart_value'] as const).map((v) => ({
    value: v,
    label: t(`dashboard.ops.checkoutOffers.triggers.${v}`),
  })),
)
const discountTypeOptions = computed(() =>
  (['percent', 'fixed'] as const).map((v) => ({ value: v, label: t(`dashboard.ops.checkoutOffers.discountTypes.${v}`) })),
)
const placementOptions = computed(() =>
  (['in_checkout', 'thank_you'] as const).map((v) => ({ value: v, label: t(`dashboard.ops.checkoutOffers.placements.${v}`) })),
)
const productOptions = computed(() => products.value.map((p) => ({ value: p.value, label: p.label })))
const productLabelOptions = computed(() => products.value.map((p) => ({ value: p.label, label: p.label })))
const collectionOptions = computed(() => collections.value.map((c) => ({ value: c.label, label: c.label })))

const panelOpen = ref(false)
const draft = reactive<{
  name: string
  triggerType: OfferTriggerType
  trigger: string
  offeredProductId: string
  discountType: OfferDiscountType
  discountValue: number
  placement: OfferPlacement
}>({
  name: '',
  triggerType: 'product',
  trigger: '',
  offeredProductId: '',
  discountType: 'percent',
  discountValue: 10,
  placement: 'in_checkout',
})

function openPanel() {
  Object.assign(draft, {
    name: '',
    triggerType: 'product',
    trigger: products.value[0]?.label ?? '',
    offeredProductId: products.value[0]?.value ?? '',
    discountType: 'percent',
    discountValue: 10,
    placement: kind.value === 'bump' ? 'in_checkout' : 'thank_you',
  })
  panelOpen.value = true
}

// Keep the trigger value valid when the trigger type changes.
watch(
  () => draft.triggerType,
  (type) => {
    if (!panelOpen.value) return
    draft.trigger =
      type === 'product' ? (products.value[0]?.label ?? '') : type === 'collection' ? (collections.value[0]?.label ?? '') : '500'
  },
)

const canSave = computed(() => !!draft.name.trim() && !!draft.trigger && !!draft.offeredProductId)

function submit() {
  if (!canSave.value) return
  addOffer({ ...draft, name: draft.name.trim(), kind: kind.value })
  panelOpen.value = false
}
</script>
