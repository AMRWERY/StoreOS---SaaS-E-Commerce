<template>
  <nuxt-link-locale :to="`/account/orders/${order.id}`" class="flex items-center gap-4 rounded-2xl border border-border-subtle bg-bg-primary p-4 hover:border-border-default transition-colors duration-200">
    <div class="flex -space-x-3 rtl:space-x-reverse shrink-0">
      <product-visual v-for="(i, idx) in order.items.slice(0, 2)" :key="idx" :tone="i.tone" :icon="i.icon" ratio="aspect-square" icon-size="w-5 h-5" class="w-12 rounded-xl border-2 border-bg-primary" />
    </div>
    <div class="flex-1 min-w-0">
      <p class="font-mono text-sm font-semibold text-tx-primary">{{ order.id }}</p>
      <p class="text-xs text-tx-muted font-mono">{{ formatDate(order.placedAt) }}</p>
    </div>
    <order-status-badge :status="order.status" class="hidden sm:inline-flex" />
    <span class="font-mono text-sm text-tx-primary">{{ formatMoney(order.total) }}</span>
    <Icon name="lucide:chevron-right" class="w-4 h-4 text-tx-muted rtl:rotate-180" />
  </nuxt-link-locale>
</template>

<script lang="ts" setup>
import type { ShopOrder } from '@/types/shop'

defineProps<{ order: ShopOrder }>()
const { formatMoney, formatDate } = useShopFormat()
</script>
