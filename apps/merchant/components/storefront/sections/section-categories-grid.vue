<template>
  <div class="px-8 py-12">
    <h3 v-if="bool('show_title', true)" class="mb-6 text-lg font-bold text-neutral-900">
      {{ str('heading', str('title', 'Shop by category')) }}
    </h3>

    <!-- Below style -->
    <div v-if="cardStyle === 'below'" class="grid grid-cols-4 gap-4">
      <div v-for="(img, i) in CAT_IMGS" :key="i" class="space-y-2">
        <div class="aspect-square overflow-hidden rounded-xl bg-cover bg-center bg-neutral-200"
          :style="{ backgroundImage: `url('${img}')` }" />
        <p class="text-center text-sm font-semibold text-neutral-900">Category {{ i + 1 }}</p>
      </div>
    </div>

    <!-- Pill style -->
    <div v-else-if="cardStyle === 'pill'" class="flex flex-wrap gap-3">
      <button v-for="(_, i) in CAT_IMGS" :key="i" type="button"
        class="flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm">
        <span class="size-3 rounded-full" :style="{ backgroundColor: CAT_COLORS[i] }" />
        Category {{ i + 1 }}
      </button>
    </div>

    <!-- Split style -->
    <div v-else-if="cardStyle === 'split'" class="grid grid-cols-2 gap-4">
      <div v-for="(img, i) in CAT_IMGS.slice(0, 4)" :key="i"
        class="flex h-36 overflow-hidden rounded-xl border border-neutral-200">
        <div class="flex w-1/2 items-center justify-center p-4" :style="{ backgroundColor: CAT_COLORS[i] + '22' }">
          <p class="text-sm font-bold text-neutral-900">Category {{ i + 1 }}</p>
        </div>
        <div class="w-1/2 bg-cover bg-center bg-neutral-200" :style="{ backgroundImage: `url('${img}')` }" />
      </div>
    </div>

    <!-- Overlay style (default) -->
    <div v-else class="grid grid-cols-4 gap-4">
      <div v-for="(img, i) in CAT_IMGS" :key="i"
        class="relative aspect-square overflow-hidden rounded-xl bg-cover bg-center bg-neutral-200"
        :style="{ backgroundImage: `url('${img}')` }">
        <div class="absolute inset-0 bg-black/30" />
        <div class="absolute inset-0 flex items-end p-3">
          <span class="rounded-md bg-white/90 px-2.5 py-1 text-xs font-semibold text-neutral-900">
            Category {{ i + 1 }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from '@/types/sections'

const props = defineProps<{ section: PageSection }>()
const str = (key: string, fallback = '') => String(props.section.settings[key] ?? fallback)
const bool = (key: string, fallback = false) => Boolean(props.section.settings[key] ?? fallback)

const cardStyle = computed(() => str('card_style', 'overlay'))

const CAT_IMGS = ['/img/product-01.avif', '/img/product-02.avif', '/img/product-03.avif', '/img/product-04.avif']
const CAT_COLORS = ['#6366f1', '#f59e0b', '#10b981', '#f43f5e']
</script>