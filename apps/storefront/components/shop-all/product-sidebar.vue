<template>
  <aside class="w-full lg:w-[240px] shrink-0 space-y-12">
    <div>
      <h1 class="text-4xl font-bold tracking-tight mb-2">{{ title }}</h1>
      <p class="text-[#50506A] text-[12px] font-semibold">/ {{ totalItems }} {{ $t('storefront.shop.items') }}</p>
    </div>

    <!-- Category -->
    <div class="space-y-4">
      <h4 class="text-[11px] font-black tracking-[0.2em] text-[#8888AA]">{{ $t('storefront.shop.category') }}</h4>
      <div class="space-y-3">
        <label v-for="cat in categories" :key="cat" class="flex items-center gap-3 cursor-pointer group">
          <div
            class="w-4 h-4 border border-[#262640] rounded-[4px] flex items-center justify-center transition-all group-hover:border-[#6366F1]"
            :class="{ 'bg-[#6366F1] border-[#6366F1]': modelValue.category === cat }">
            <Icon v-if="modelValue.category === cat" name="solar:check-read-bold" class="w-3 h-3 text-white" />
          </div>
          <span class="text-[12px] font-medium text-[#8888AA] group-hover:text-[#F0F0FF]"
            :class="{ 'text-[#F0F0FF]': modelValue.category === cat }">{{ cat }}</span>
          <input type="radio" class="hidden" v-model="modelValue.category" :value="cat" />
        </label>
      </div>
    </div>

    <!-- Price Range -->
    <div class="space-y-6">
      <h4 class="text-[11px] font-black tracking-[0.2em] text-[#8888AA]">{{ $t('storefront.shop.priceRange') }}</h4>
      <div class="relative h-1 w-full bg-[#1C1C30] rounded-full">
        <div class="absolute h-full bg-[#6366F1] start-0 end-[20%]"></div>
        <div class="absolute -top-1.5 start-0 w-4 h-4 bg-white rounded-full border-2 border-[#6366F1] cursor-pointer">
        </div>
        <div
          class="absolute -top-1.5 start-[80%] w-4 h-4 bg-white rounded-full border-2 border-[#6366F1] cursor-pointer shadow-[0_0_10px_rgba(99,102,241,0.5)]">
        </div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="bg-[#0D0D18] border border-[#1C1C30] rounded-[8px] p-2 px-3">
          <p class="text-[8px] font-black text-[#50506A] mb-1">{{ $t('storefront.shop.min') }} ($)</p>
          <p class="text-[12px] font-semibold text-[#8888AA]">{{ modelValue.priceMin }}</p>
        </div>
        <div class="bg-[#0D0D18] border border-[#1C1C30] rounded-[8px] p-2 px-3">
          <p class="text-[8px] font-black text-[#50506A] mb-1">{{ $t('storefront.shop.max') }} ($)</p>
          <p class="text-[12px] font-semibold text-[#F0F0FF]">{{ modelValue.priceMax }}+</p>
        </div>
      </div>
    </div>

    <!-- Colors -->
    <div class="space-y-4">
      <h4 class="text-[11px] font-black tracking-[0.2em] text-[#8888AA]">{{ $t('storefront.shop.colors') }}</h4>
      <div class="flex flex-wrap gap-3">
        <div v-for="color in colors" :key="color.name"
          class="w-7 h-7 rounded-full cursor-pointer p-0.5 border border-transparent transition-all hover:border-[#6366F1]"
          :class="{ 'border-[#6366F1] ring-2 ring-[#6366F1]/20': color.name === modelValue.selectedColor }">
          <div :class="[color.bg, 'w-full h-full rounded-full border border-black/20']"
            @click="modelValue.selectedColor = color.name"></div>
        </div>
      </div>
    </div>

    <!-- Sizes -->
    <div class="space-y-4">
      <h4 class="text-[11px] font-black tracking-[0.2em] text-[#8888AA]">{{ $t('storefront.shop.sizes') }}</h4>
      <div class="flex flex-wrap gap-2">
        <button v-for="size in sizes" :key="size" @click="modelValue.selectedSize = size"
          class="w-10 h-8 rounded-[6px] border text-[11px] font-black transition-all"
          :class="modelValue.selectedSize === size ? 'bg-[#6366F1] border-[#6366F1] text-white' : 'bg-[#0D0D18] border-[#1C1C30] text-[#50506A] hover:border-[#8888AA]'">
          {{ size }}
        </button>
      </div>
    </div>

    <VButton variant="none" @click="$emit('clear')"
      className="w-full border border-[#1C1C30] border-dashed py-3 rounded-[10px] text-[10px] font-black tracking-widest text-[#50506A] hover:text-[#EF4444] hover:border-[#EF4444]/30 transition-all flex items-center justify-center gap-2">
      <Icon name="solar:refresh-linear" class="w-3 h-3" />
      {{ $t('storefront.shop.clearAllFilters') }}
    </VButton>
  </aside>
</template>

<script lang="ts" setup>
import type { FilterState } from '@/types/products';

const props = defineProps<{
  title: string;
  totalItems: number;
  categories: string[];
  colors: { name: string; bg: string }[];
  sizes: string[];
  modelValue: FilterState;
}>();

defineEmits(['update:modelValue', 'clear']);
</script>
