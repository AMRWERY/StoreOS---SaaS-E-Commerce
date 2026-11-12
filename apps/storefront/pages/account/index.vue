<template>
  <account-shell :title="t('shop.account.welcome', { name: account.user?.name ?? '' })" :subtitle="t('shop.account.overviewSubtitle')">
    <div class="grid sm:grid-cols-3 gap-4">
      <div v-for="s in stats" :key="s.label" class="rounded-2xl bg-bg-primary border border-border-subtle p-5">
        <p class="text-xs text-tx-muted">{{ t(s.label) }}</p>
        <p class="mt-2 font-mono text-2xl font-semibold text-tx-primary">{{ s.value }}</p>
      </div>
    </div>

    <section class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-base font-semibold text-tx-primary">{{ t('shop.account.recentOrders') }}</h2>
        <nuxt-link-locale to="/account/orders" class="text-sm text-brand hover:text-brand-hover">{{ t('shop.common.viewAll') }}</nuxt-link-locale>
      </div>
      <div v-if="account.orders.length" class="space-y-3">
        <account-order-row v-for="o in account.orders.slice(0, 3)" :key="o.id" :order="o" />
      </div>
      <shop-empty-state v-else icon="lucide:package" :title="t('shop.account.noOrdersTitle')" :description="t('shop.account.noOrdersDesc')">
        <v-button to="/collections/all" :label="t('shop.cart.continue')" />
      </shop-empty-state>
    </section>
  </account-shell>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const account = useShopAccountStore()
const { formatMoney } = useShopFormat()

const stats = computed(() => [
  { label: 'shop.account.statOrders', value: account.orders.length },
  { label: 'shop.account.statSpent', value: formatMoney(account.orders.filter(o => o.status !== 'cancelled').reduce((n, o) => n + o.total, 0)) },
  { label: 'shop.account.statAddresses', value: account.addresses.length },
])

useSeoMeta({ title: () => t('shop.seo.accountTitle'), description: () => t('shop.seo.accountDesc'), robots: 'noindex, nofollow' })
</script>
