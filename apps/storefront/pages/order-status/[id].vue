<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-12">
    <template v-if="order">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-10">
        <div class="space-y-1">
          <p class="text-xs text-tx-muted">{{ t('shop.orderLookup.orderNumber') }}</p>
          <h1 class="text-2xl font-semibold font-mono tracking-tight text-tx-primary">{{ order.id }}</h1>
          <p class="text-xs text-tx-muted font-mono">{{ formatDate(order.placedAt) }}</p>
        </div>
        <order-status-badge :status="order.status" />
      </div>

      <div class="grid sm:grid-cols-[1fr_280px] gap-8">
        <section class="rounded-3xl bg-bg-primary border border-border-subtle p-6 sm:p-8">
          <h2 class="text-base font-semibold text-tx-primary mb-6">{{ t('shop.orderStatus.timeline') }}</h2>
          <order-timeline :status="order.status" />
        </section>
        <aside class="space-y-6">
          <section class="rounded-3xl bg-bg-primary border border-border-subtle p-6 space-y-4">
            <h2 class="text-base font-semibold text-tx-primary">{{ t('shop.orderStatus.items') }}</h2>
            <ul class="space-y-3">
              <li v-for="(i, idx) in order.items" :key="idx" class="flex items-center gap-3">
                <product-visual :tone="i.tone" :icon="i.icon" :image="i.image" ratio="aspect-square" icon-size="w-5 h-5" class="w-12 rounded-xl" />
                <div class="flex-1 min-w-0">
                  <p class="text-sm text-tx-primary truncate">{{ loc(i.title) }}</p>
                  <p class="text-xs text-tx-muted font-mono">{{ i.qty }} x {{ formatMoney(i.unitPrice) }}</p>
                </div>
              </li>
            </ul>
            <order-totals :subtotal="order.subtotal" :shipping="order.shipping" :discount="order.discount" :total="order.total" />
          </section>
          <p class="text-xs text-tx-muted flex items-start gap-2"><Icon name="lucide:map-pin" class="w-4 h-4 shrink-0" />{{ order.address }}</p>
        </aside>
      </div>
    </template>
    <shop-empty-state v-else icon="lucide:package-x" :title="t('shop.orderStatus.notFoundTitle')" :description="t('shop.orderStatus.notFoundDesc')">
      <v-button to="/order-status" :label="t('shop.orderLookup.title')" />
    </shop-empty-state>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const route = useRoute()
const { loc } = useLocalized()
const { formatMoney, formatDate } = useShopFormat()
const orders = useShopOrdersStore()

const order = computed(() => orders.find(String(route.params.id)))

useSeoMeta({
  title: () => t('shop.seo.orderStatusTitle'),
  description: () => t('shop.seo.orderStatusDesc'),
  robots: 'noindex, nofollow',
})
</script>
