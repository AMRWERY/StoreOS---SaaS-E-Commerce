<template>
  <v-side-panel v-model="cart.drawerOpen" :title="t('shop.cart.title')" :subtitle="t('shop.cart.itemCount', { count: cart.count })" width="md">
    <div v-if="!cart.items.length" class="p-4 h-full flex items-center">
      <shop-empty-state class="w-full" icon="lucide:shopping-bag" :title="t('shop.cart.emptyTitle')" :description="t('shop.cart.emptyDesc')">
        <v-button to="/collections/all" :label="t('shop.cart.continue')" @click="cart.drawerOpen = false" />
      </shop-empty-state>
    </div>
    <div v-else class="px-5">
      <free-shipping-meter class="mt-4" />
      <ul class="divide-y divide-border-subtle">
        <cart-line-item v-for="item in cart.items" :key="item.variantId" :item="item" @navigate="cart.drawerOpen = false" />
      </ul>
    </div>
    <template v-if="cart.items.length" #footer>
      <div class="space-y-4 w-full">
        <div class="flex items-center justify-between text-sm">
          <span class="text-tx-secondary">{{ t('shop.totals.subtotal') }}</span>
          <span class="font-mono font-semibold text-tx-primary">{{ formatMoney(cart.subtotal) }}</span>
        </div>
        <p class="text-xs text-tx-muted">{{ t('shop.cart.shippingAtCheckout') }}</p>
        <div class="grid grid-cols-2 gap-3">
          <v-button to="/cart" variant="secondary" :label="t('shop.cart.viewCart')" @click="cart.drawerOpen = false" />
          <v-button to="/checkout" :label="t('shop.cart.checkout')" @click="cart.drawerOpen = false" />
        </div>
      </div>
    </template>
  </v-side-panel>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const cart = useCartStore()
const { formatMoney } = useShopFormat()
</script>
