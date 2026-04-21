<template>
  <div class="py-12 px-6 lg:px-12">
    <div class="max-w-[1400px] mx-auto gap-6" :class="viewMode === 'grid'
      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      : 'flex flex-col'">
      <div v-for="p in products" :key="p.id" class="h-full min-h-0">
        <new-arrivals-product-card :product="p" :view-mode="viewMode" @fast-deploy="$emit('fast-deploy', $event)" />
      </div>
    </div>

    <div class="mt-24 flex flex-col items-center gap-8">
      <VButton variant="none" type="button"
        className="bg-[#141422] border border-[#262640] hover:border-[#6366F1]/50 text-[#F0F0FF] px-12 py-4 rounded-[12px] font-bold text-[12px] tracking-[0.3em] transition-all shadow-xl active:scale-95"
        @click="$emit('load-more')">
        {{ $t('storefront.newArrivals.loadMore') }}
      </VButton>
      <div class="flex items-center gap-2">
        <span class="w-1 h-1 rounded-full bg-[#262640]" />
        <span class="w-1 h-1 rounded-full bg-[#6366F1]" />
        <span class="w-1 h-1 rounded-full bg-[#262640]" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { NewArrivalProduct } from '@/types/new-arrivals'

defineProps<{
  products: NewArrivalProduct[]
  viewMode: 'grid' | 'list'
}>()

defineEmits<{
  'load-more': []
  'fast-deploy': [product: NewArrivalProduct]
}>()
</script>