<template>
  <NuxtPage v-if="isDetail" />
  <account-shell v-else :title="t('shop.account.orders')" :subtitle="t('shop.account.ordersSubtitle')">
    <div v-if="account.orders.length" class="space-y-3">
      <account-order-row v-for="o in account.orders" :key="o.id" :order="o" />
    </div>
    <shop-empty-state v-else icon="lucide:package" :title="t('shop.account.noOrdersTitle')" :description="t('shop.account.noOrdersDesc')">
      <v-button to="/collections/all" :label="t('shop.cart.continue')" />
    </shop-empty-state>
  </account-shell>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const route = useRoute()
const account = useShopAccountStore()

// Nested route: /account/orders/[id] renders through this page's <NuxtPage>.
const isDetail = computed(() => !!route.params.id)

useSeoMeta({ title: () => t('shop.seo.ordersTitle'), description: () => t('shop.seo.accountDesc'), robots: 'noindex, nofollow' })
</script>
