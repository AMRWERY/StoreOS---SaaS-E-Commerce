<template>
  <div class="border-t border-neutral-200 px-8 py-12">
    <h3 v-if="bool('show_title', true)" class="text-lg font-bold text-neutral-900"
      :class="str('title_align', 'left') === 'center' ? 'text-center' : ''">
      {{ str('heading', str('title', 'Our Products')) }}
    </h3>

    <!-- Sale style -->
    <div v-if="cardStyle === 'sale'" class="mt-8 grid grid-cols-3 gap-5">
      <div v-for="(img, i) in PRODUCT_IMGS" :key="i"
        class="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        <span class="absolute start-3 top-3 rounded-full bg-green-400 px-2.5 py-1 text-[11px] font-bold text-white">20%
          off</span>
        <div class="flex aspect-square items-center justify-center rounded-xl bg-neutral-50">
          <div class="h-32 w-full bg-contain bg-center bg-no-repeat" :style="{ backgroundImage: `url('${img}')` }" />
        </div>
        <div class="mt-3 space-y-1 px-1">
          <p class="text-sm font-medium text-neutral-900">Product {{ i + 1 }}</p>
          <div class="flex items-center gap-2">
            <span class="text-sm font-bold text-neutral-900">$29.00</span>
            <span class="text-xs text-neutral-400 line-through">$59.00</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Horizontal style -->
    <div v-else-if="cardStyle === 'horizontal'" class="mt-6 space-y-3">
      <div v-for="(img, i) in PRODUCT_IMGS" :key="i"
        class="flex items-center gap-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm">
        <div class="size-20 shrink-0 overflow-hidden rounded-xl bg-neutral-50">
          <div class="h-full w-full bg-contain bg-center bg-no-repeat" :style="{ backgroundImage: `url('${img}')` }" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-semibold text-neutral-900">Product {{ i + 1 }}</p>
          <p class="mt-0.5 text-xs text-neutral-400">{{ PRODUCT_CATS[i] }}</p>
          <p class="mt-2 text-sm font-bold text-neutral-900">$99.00</p>
        </div>
      </div>
    </div>

    <!-- Editorial style -->
    <div v-else-if="cardStyle === 'editorial'" class="mt-8 grid grid-cols-3 gap-5">
      <div v-for="(img, i) in PRODUCT_IMGS" :key="i"
        class="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <div class="aspect-video w-full overflow-hidden bg-neutral-100">
          <div class="h-full w-full bg-cover bg-center" :style="{ backgroundImage: `url('${img}')` }" />
        </div>
        <div class="p-4">
          <p class="text-base font-bold text-neutral-900">Product {{ i + 1 }}</p>
          <p class="mt-1.5 text-xs leading-relaxed text-neutral-500">A beautifully crafted product designed for modern
            living.</p>
          <button type="button" class="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white">View
            product</button>
        </div>
      </div>
    </div>

    <!-- Default style -->
    <div v-else class="mt-8 grid grid-cols-3 gap-5">
      <div v-for="(img, i) in PRODUCT_IMGS" :key="i"
        class="overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        <div class="flex aspect-square items-center justify-center rounded-xl bg-neutral-50">
          <div class="h-32 w-full bg-contain bg-center bg-no-repeat" :style="{ backgroundImage: `url('${img}')` }" />
        </div>
        <div class="mt-3">
          <p class="text-xs text-neutral-400">{{ PRODUCT_CATS[i] }}</p>
          <p class="mt-0.5 text-sm font-bold text-neutral-900">Product {{ i + 1 }}</p>
          <div class="mt-3 flex items-center justify-between gap-2">
            <span class="text-sm font-bold text-neutral-900">$80</span>
            <button type="button"
              class="flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-semibold text-neutral-700 shadow-sm">
              <Icon name="ph:shopping-cart-bold" class="text-[11px]" />Add
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="bool('show_view_all', true)" class="mt-8 text-center">
      <button type="button"
        class="rounded-md border border-neutral-300 px-6 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50">
        {{ str('view_all_text', 'View All Products') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from '@/types/sections'

const props = defineProps<{ section: PageSection }>()
const str = (key: string, fallback = '') => String(props.section.settings[key] ?? fallback)
const bool = (key: string, fallback = false) => Boolean(props.section.settings[key] ?? fallback)

const cardStyle = computed(() => str('card_style', 'default'))

const PRODUCT_IMGS = ['/img/category-01.avif', '/img/category-02.avif', '/img/category-03.avif']
const PRODUCT_CATS = ['Electronics', 'Sports', 'Home & Living']
</script>