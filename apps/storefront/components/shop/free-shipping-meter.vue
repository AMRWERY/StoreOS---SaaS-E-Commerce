<template>
  <div class="rounded-2xl bg-bg-elevated px-4 py-3 space-y-2">
    <p class="text-xs text-tx-secondary">
      <template v-if="cart.freeShippingRemaining > 0">
        {{ t('shop.cart.freeShippingAway', { amount: formatMoney(cart.freeShippingRemaining) }) }}
      </template>
      <template v-else>{{ t('shop.cart.freeShippingUnlocked') }}</template>
    </p>
    <div class="h-1.5 rounded-full bg-bg-overlay overflow-hidden" role="progressbar" :aria-valuenow="cart.freeShippingProgress" aria-valuemin="0" aria-valuemax="100">
      <div class="h-full rounded-full bg-brand transition-all duration-300" :style="{ width: `${cart.freeShippingProgress}%` }" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const cart = useCartStore()
const { formatMoney } = useShopFormat()
</script>
