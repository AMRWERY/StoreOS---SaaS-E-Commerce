<template>
  <div class="max-w-xl mx-auto px-4 sm:px-6 py-16 text-center space-y-8">
    <div class="w-20 h-20 mx-auto rounded-full bg-success-dim flex items-center justify-center">
      <Icon name="lucide:check" class="w-9 h-9 text-success" />
    </div>
    <div class="space-y-3">
      <h1 class="text-3xl font-semibold tracking-tight text-tx-primary">{{ t('shop.success.title') }}</h1>
      <p class="text-sm text-tx-secondary">{{ t('shop.success.subtitle') }}</p>
    </div>

    <div class="rounded-3xl bg-bg-primary border border-border-subtle p-6 space-y-4 text-start">
      <div class="flex items-center justify-between">
        <span class="text-xs text-tx-muted">{{ t('shop.success.orderNumber') }}</span>
        <span class="font-mono text-base font-semibold text-tx-primary">{{ orderId }}</span>
      </div>
      <template v-if="order">
        <div class="flex items-center justify-between">
          <span class="text-xs text-tx-muted">{{ t('shop.success.paymentMethod') }}</span>
          <span class="text-sm text-tx-primary">{{ t(`shop.checkout.pay_${order.paymentMethod}`) }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-xs text-tx-muted">{{ t('shop.totals.total') }}</span>
          <span class="font-mono text-base font-semibold text-tx-primary">{{ formatMoney(order.total) }}</span>
        </div>
      </template>
      <p class="text-xs text-tx-muted pt-4 border-t border-border-subtle">{{ t('shop.success.smsNote') }}</p>
    </div>

    <div class="flex flex-wrap justify-center gap-3">
      <v-button :to="`/order-status/${orderId}`" :label="t('shop.success.track')" class="rounded-full px-7 py-3" />
      <v-button to="/collections/all" variant="secondary" :label="t('shop.cart.continue')" class="rounded-full px-7 py-3" />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ layout: 'checkout' })

const { t } = useI18n()
const route = useRoute()
const { formatMoney } = useShopFormat()
const orders = useShopOrdersStore()

const orderId = computed(() => (typeof route.query.order === 'string' && route.query.order ? route.query.order : 'SO-10500'))
const order = computed(() => orders.find(orderId.value))

useSeoMeta({
  title: () => t('shop.seo.successTitle'),
  description: () => t('shop.seo.successDesc'),
  robots: 'noindex, nofollow',
})
</script>
