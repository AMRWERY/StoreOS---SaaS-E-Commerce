<template>
  <div class="bg-brand text-white text-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center gap-6 text-center">
      <span class="inline-flex items-center gap-1.5"><Icon name="lucide:truck" class="w-3.5 h-3.5" />{{ t('shop.announcement.shipping', { amount: formatNumber(FREE_SHIPPING_THRESHOLD) }) }}</span>
      <span class="hidden sm:inline-flex items-center gap-1.5"><Icon name="lucide:banknote" class="w-3.5 h-3.5" />{{ t('shop.announcement.cod') }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FREE_SHIPPING_THRESHOLD } from '@/data/shop-data'

const { t } = useI18n()
const { formatNumber } = useShopFormat()
</script>
