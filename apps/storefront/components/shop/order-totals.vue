<template>
  <dl class="space-y-3 text-sm">
    <div class="flex items-center justify-between">
      <dt class="text-tx-secondary">{{ t('shop.totals.subtotal') }}</dt>
      <dd class="font-mono text-tx-primary">{{ formatMoney(subtotal) }}</dd>
    </div>
    <div v-if="discount > 0" class="flex items-center justify-between">
      <dt class="text-tx-secondary">{{ t('shop.totals.discount') }}<span v-if="code" class="ms-1.5 font-mono text-[10px] rounded-full bg-success-dim text-success px-2 py-0.5">{{ code }}</span></dt>
      <dd class="font-mono text-success">-{{ formatMoney(discount) }}</dd>
    </div>
    <div class="flex items-center justify-between">
      <dt class="text-tx-secondary">{{ t('shop.totals.shipping') }}</dt>
      <dd class="font-mono text-tx-primary">{{ shipping === 0 ? t('shop.totals.free') : formatMoney(shipping) }}</dd>
    </div>
    <div class="flex items-center justify-between pt-3 border-t border-border-subtle">
      <dt class="font-semibold text-tx-primary">{{ t('shop.totals.total') }}</dt>
      <dd class="font-mono text-lg font-semibold text-tx-primary">{{ formatMoney(total) }}</dd>
    </div>
  </dl>
</template>

<script lang="ts" setup>
defineProps<{ subtotal: number; shipping: number; discount: number; total: number; code?: string }>()
const { t } = useI18n()
const { formatMoney } = useShopFormat()
</script>
