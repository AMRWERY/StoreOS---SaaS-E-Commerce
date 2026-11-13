<template>
  <div class="grid gap-3 lg:grid-cols-[88px_1fr] lg:grid-flow-col-dense">
    <product-visual :tone="slides[active]!.tone" :icon="product.icon" :image="product.image" :label="loc(product.title)" ratio="aspect-square lg:aspect-[4/5]" icon-size="w-24 h-24" class="rounded-3xl border border-border-subtle lg:col-start-2">
      <span class="absolute bottom-4 end-4 rounded-full bg-bg-base/80 px-3 py-1 text-[10px] font-mono text-tx-secondary">{{ active + 1 }} / {{ slides.length }}</span>
    </product-visual>
    <div class="flex lg:flex-col gap-3 lg:col-start-1" role="tablist" :aria-label="t('shop.product.gallery')">
      <button v-for="(s, i) in slides" :key="i" type="button" role="tab" :aria-selected="i === active" :aria-label="t('shop.product.viewImage', { n: i + 1 })"
        :class="['w-20 lg:w-full shrink-0 rounded-2xl border-2 transition-colors duration-200 overflow-hidden', i === active ? 'border-brand' : 'border-transparent hover:border-border-default']"
        @click="active = i">
        <product-visual :tone="s.tone" :icon="product.icon" :image="product.image" ratio="aspect-square" icon-size="w-6 h-6" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from '@/types/shop'

const props = defineProps<{ product: Product }>()
const { t } = useI18n()
const { loc } = useLocalized()
const active = ref(0)
const slides = computed(() => [0, 1, 2, 3].map(i => ({ tone: props.product.tone + i })))
</script>
