<template>
  <account-shell :title="order ? order.id : t('shop.orderStatus.notFoundTitle')">
    <nuxt-link-locale to="/account/orders" class="-mt-4 inline-flex items-center gap-2 text-sm text-tx-secondary hover:text-brand transition-colors duration-200">
      <Icon name="lucide:arrow-left" class="w-4 h-4 rtl:rotate-180" />{{ t('shop.account.backToOrders') }}
    </nuxt-link-locale>

    <template v-if="order">
      <div class="flex flex-wrap items-center gap-3 text-sm text-tx-secondary">
        <order-status-badge :status="order.status" />
        <span class="font-mono text-xs">{{ formatDate(order.placedAt) }}</span>
        <span>{{ t(`shop.checkout.pay_${order.paymentMethod}`) }}</span>
      </div>
      <div class="grid md:grid-cols-2 gap-6">
        <section class="rounded-3xl bg-bg-primary border border-border-subtle p-6">
          <h2 class="text-base font-semibold text-tx-primary mb-6">{{ t('shop.orderStatus.timeline') }}</h2>
          <order-timeline :status="order.status" />
        </section>
        <section class="rounded-3xl bg-bg-primary border border-border-subtle p-6 space-y-5">
          <h2 class="text-base font-semibold text-tx-primary">{{ t('shop.orderStatus.items') }}</h2>
          <ul class="space-y-3">
            <li v-for="(i, idx) in order.items" :key="idx" class="flex items-center gap-3">
              <product-visual :tone="i.tone" :icon="i.icon" ratio="aspect-square" icon-size="w-5 h-5" class="w-12 rounded-xl" />
              <div class="flex-1 min-w-0">
                <p class="text-sm text-tx-primary truncate">{{ loc(i.title) }}</p>
                <p class="text-xs text-tx-muted">{{ i.variantLabel }} <span class="font-mono">x {{ i.qty }}</span></p>
              </div>
              <span class="font-mono text-sm text-tx-primary">{{ formatMoney(i.unitPrice * i.qty) }}</span>
            </li>
          </ul>
          <order-totals :subtotal="order.subtotal" :shipping="order.shipping" :discount="order.discount" :total="order.total" />
          <p class="text-xs text-tx-muted flex items-start gap-2"><Icon name="lucide:map-pin" class="w-4 h-4 shrink-0" />{{ order.address }}</p>
        </section>
      </div>
    </template>
    <shop-empty-state v-else icon="lucide:package-x" :title="t('shop.orderStatus.notFoundTitle')" :description="t('shop.orderStatus.notFoundDesc')" />
  </account-shell>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const route = useRoute()
const { loc } = useLocalized()
const { formatMoney, formatDate } = useShopFormat()
const account = useShopAccountStore()

const order = computed(() => account.orders.find(o => o.id === String(route.params.id)))

useSeoMeta({ title: () => t('shop.seo.orderDetailTitle'), description: () => t('shop.seo.accountDesc'), robots: 'noindex, nofollow' })
</script>
