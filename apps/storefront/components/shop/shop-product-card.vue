<template>
  <article class="group">
    <nuxt-link-locale :to="`/products/${product.handle}`" class="block">
      <product-visual :tone="product.tone" :icon="product.icon" :label="loc(product.title)" class="rounded-2xl border border-border-subtle">
        <span v-if="product.isNew" class="absolute top-3 start-3 rounded-full bg-bg-base/80 text-tx-primary text-[10px] font-semibold px-2.5 py-1">
          {{ t('shop.product.new') }}
        </span>
        <span v-else-if="onSale" class="absolute top-3 start-3 rounded-full bg-accent text-white text-[10px] font-semibold px-2.5 py-1">
          {{ t('shop.product.sale') }}
        </span>
        <span v-if="!inStock" class="absolute bottom-3 start-3 rounded-full bg-bg-base/80 text-tx-secondary text-[10px] font-semibold px-2.5 py-1">
          {{ t('shop.product.soldOut') }}
        </span>
      </product-visual>
      <div class="mt-4 space-y-1.5">
        <h3 class="text-sm font-medium text-tx-primary group-hover:text-brand transition-colors duration-200">{{ loc(product.title) }}</h3>
        <div class="flex items-center justify-between gap-2">
          <shop-price :amount="product.price" :compare-at="product.compareAt" size="sm" />
          <span class="flex items-center gap-1 text-xs text-tx-muted">
            <Icon name="lucide:star" class="w-3 h-3 text-warning" />
            <span class="font-mono">{{ product.rating.toFixed(1) }}</span>
          </span>
        </div>
      </div>
    </nuxt-link-locale>
  </article>
</template>

<script lang="ts" setup>
import type { Product } from '@/types/shop'

const props = defineProps<{ product: Product }>()
const { t } = useI18n()
const { loc } = useLocalized()
const catalog = useCatalogStore()
const inStock = computed(() => catalog.isInStock(props.product))
const onSale = computed(() => !!props.product.compareAt && props.product.compareAt > props.product.price)
</script>
