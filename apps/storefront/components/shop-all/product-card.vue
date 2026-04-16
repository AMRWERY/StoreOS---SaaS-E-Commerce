<template>
  <nuxt-link-locale :to="`/shop-all/${product.slug}`" class="group cursor-pointer h-full transition-all block">
    <div
      class="h-full flex rounded-[12px] bg-[#0D0D18] border border-[#1C1C30] p-3 shadow-xl transition-all group-hover:border-[#6366F1]/40 overflow-hidden"
      :class="viewMode === 'list' ? 'flex-row items-center gap-8 px-6' : 'flex-col'">

      <!-- Image Wrapper -->
      <div
        :class="[viewMode === 'list' ? 'w-48 h-32 flex-shrink-0' : 'w-full mb-4', 'relative rounded-[8px] overflow-hidden bg-black/40']">
        <!-- Aspect Ratio Sizer (Grid Mode only) -->
        <div v-if="viewMode === 'grid'" class="w-full pt-[100%]"></div>

        <img :src="product.img"
          class="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 grayscale-[30%] group-hover:grayscale-0"
          :class="{ 'absolute inset-0': viewMode === 'grid' }" />

        <!-- Badge -->
        <div v-if="product.tag" :class="[product.tagColor]"
          class="absolute top-4 start-4 px-3 py-0.5 rounded-full text-[9px] font-black text-white tracking-widest shadow-lg z-10">
          {{ product.tag }}
        </div>
      </div>

      <!-- Information -->
      <div class="flex-1 flex flex-col" :class="viewMode === 'grid' ? 'px-1' : 'space-y-2'">
        <p class="text-[10px] font-black text-[#50506A] tracking-[0.15em]">{{ product.cat }}</p>

        <h3 :class="[
          viewMode === 'list' ? 'text-[18px]' : 'text-[15px]',
          'font-medium text-[#8888AA] group-hover:text-[#F0F0FF] transition-colors truncate'
        ]">
          {{ product.name }}
        </h3>

        <div class="mt-auto flex items-baseline gap-3 pt-3">
          <p :class="[viewMode === 'list' ? 'text-[20px]' : 'text-[16px]', 'text-[#F0F0FF] font-bold']">
            <span class="text-[11px] text-[#50506A] me-1">$</span>
            {{ product.price.toLocaleString() }}
          </p>
          <p v-if="product.oldPrice" class="text-[#50506A] line-through"
            :class="viewMode === 'list' ? 'text-[14px]' : 'text-[12px]'">
            {{ product.oldPrice.toLocaleString() }}
          </p>
        </div>
      </div>
    </div>
  </nuxt-link-locale>
</template>

<script lang="ts" setup>
import type { StorefrontProduct } from '@/types/products';

defineProps<{
  product: StorefrontProduct;
  viewMode: 'grid' | 'list';
}>();
</script>