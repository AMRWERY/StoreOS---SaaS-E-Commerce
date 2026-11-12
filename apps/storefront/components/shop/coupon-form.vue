<template>
  <div class="space-y-2">
    <div v-if="cart.coupon" class="flex items-center justify-between rounded-xl bg-success-dim px-4 py-3">
      <span class="text-sm text-success inline-flex items-center gap-2">
        <Icon name="lucide:tag" class="w-4 h-4" />
        <span class="font-mono font-semibold">{{ cart.coupon.code }}</span>
        {{ t('shop.coupon.applied') }}
      </span>
      <button type="button" class="text-xs text-tx-secondary hover:text-danger transition-colors duration-200" @click="cart.removeCoupon()">{{ t('shop.cart.remove') }}</button>
    </div>
    <form v-else class="flex gap-2" @submit.prevent="apply">
      <input v-model="code" type="text" :placeholder="t('shop.coupon.placeholder')" :aria-label="t('shop.coupon.label')" autocomplete="off"
        class="flex-1 min-w-0 bg-bg-primary border border-border-default focus:border-brand rounded-xl px-4 py-2.5 text-sm font-mono uppercase placeholder:normal-case placeholder:font-sans placeholder:text-tx-muted text-tx-primary outline-none transition-colors duration-200">
      <button type="submit" class="shrink-0 rounded-xl border border-border-default bg-bg-elevated px-4 text-sm font-semibold text-tx-primary hover:border-brand transition-colors duration-200">{{ t('shop.coupon.apply') }}</button>
    </form>
    <p v-if="invalid" class="text-xs text-danger">{{ t('shop.coupon.invalid') }}</p>
    <p v-else-if="!cart.coupon" class="text-xs text-tx-muted">{{ t('shop.coupon.hint') }}</p>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const cart = useCartStore()
const code = ref('')
const invalid = ref(false)

function apply() {
  if (!code.value.trim()) return
  invalid.value = !cart.applyCoupon(code.value)
  if (!invalid.value) code.value = ''
}
</script>
