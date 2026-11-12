<template>
  <li class="flex gap-4 py-5">
    <nuxt-link-locale :to="`/products/${item.product.handle}`" class="shrink-0" @click="emit('navigate')">
      <product-visual :tone="item.product.tone" :icon="item.product.icon" :label="loc(item.product.title)" ratio="aspect-square" icon-size="w-7 h-7" class="w-20 sm:w-24 rounded-xl border border-border-subtle" />
    </nuxt-link-locale>
    <div class="flex-1 min-w-0 flex flex-col">
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <nuxt-link-locale :to="`/products/${item.product.handle}`" class="text-sm font-medium text-tx-primary hover:text-brand transition-colors duration-200 line-clamp-2" @click="emit('navigate')">
            {{ loc(item.product.title) }}
          </nuxt-link-locale>
          <p class="mt-1 text-xs text-tx-muted">{{ variantLabel }}</p>
        </div>
        <span class="font-mono text-sm font-semibold text-tx-primary shrink-0">{{ formatMoney(item.lineTotal) }}</span>
      </div>
      <div class="mt-auto pt-3 flex items-center justify-between">
        <qty-stepper :model-value="item.qty" :max="Math.max(1, item.variant.stock)" @update:model-value="cart.setQty(item.variantId, $event)" />
        <button type="button" class="text-xs text-tx-muted hover:text-danger transition-colors duration-200 inline-flex items-center gap-1" @click="cart.remove(item.variantId)">
          <Icon name="lucide:trash-2" class="w-3.5 h-3.5" />
          {{ t('shop.cart.remove') }}
        </button>
      </div>
    </div>
  </li>
</template>

<script lang="ts" setup>
import type { CartItem } from '@/types/shop'

const props = defineProps<{ item: CartItem }>()
const emit = defineEmits<{ navigate: [] }>()
const { t } = useI18n()
const { loc } = useLocalized()
const { formatMoney } = useShopFormat()
const cart = useCartStore()

const variantLabel = computed(() =>
  props.item.product.options
    .map(o => loc(o.values.find(v => v.value === props.item.variant.options[o.key])?.label))
    .filter(Boolean)
    .join(' / '),
)
</script>
