<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight text-tx-primary mb-10">{{ t('shop.cart.pageTitle') }}</h1>

    <shop-empty-state v-if="!cart.items.length" icon="lucide:shopping-bag" :title="t('shop.cart.emptyTitle')" :description="t('shop.cart.emptyDesc')">
      <v-button to="/collections/all" :label="t('shop.cart.continue')" class="rounded-full px-7 py-3" />
    </shop-empty-state>

    <div v-else class="grid lg:grid-cols-[1fr_380px] gap-10">
      <div>
        <free-shipping-meter />
        <ul class="divide-y divide-border-subtle">
          <cart-line-item v-for="item in cart.items" :key="item.variantId" :item="item" />
        </ul>
        <nuxt-link-locale to="/collections/all" class="mt-6 inline-flex items-center gap-2 text-sm text-tx-secondary hover:text-brand transition-colors duration-200">
          <Icon name="lucide:arrow-left" class="w-4 h-4 rtl:rotate-180" />{{ t('shop.cart.continue') }}
        </nuxt-link-locale>
      </div>

      <aside class="h-fit rounded-3xl bg-bg-primary border border-border-subtle p-6 space-y-6 lg:sticky lg:top-24">
        <h2 class="text-base font-semibold text-tx-primary">{{ t('shop.cart.summary') }}</h2>
        <coupon-form />
        <order-totals :subtotal="cart.subtotal" :shipping="cart.shipping" :discount="cart.discount" :total="cart.total" :code="cart.coupon?.code" />
        <v-button to="/checkout" :label="t('shop.cart.checkout')" icon="lucide:arrow-right" class="w-full rounded-full py-3" />
        <p class="text-xs text-tx-muted text-center inline-flex items-center justify-center gap-1.5 w-full"><Icon name="lucide:banknote" class="w-3.5 h-3.5" />{{ t('shop.cart.codNote') }}</p>
      </aside>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const cart = useCartStore()

useSeoMeta({
  title: () => t('shop.seo.cartTitle'),
  description: () => t('shop.seo.cartDesc'),
  robots: 'noindex, nofollow',
})
</script>
