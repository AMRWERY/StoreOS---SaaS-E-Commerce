<template>
  <div class="overflow-hidden px-8 py-12">
    <div class="mb-6 flex items-center justify-between">
      <h3 v-if="bool('show_title', true)" class="text-lg font-bold text-neutral-900">
        {{ str('heading', str('title', 'Featured Products')) }}
      </h3>
      <div class="flex gap-2">
        <button type="button" class="rounded-full border border-neutral-300 p-1.5">
          <Icon name="ph:arrow-left-bold" class="text-xs" />
        </button>
        <button type="button" class="rounded-full border border-neutral-300 p-1.5">
          <Icon name="ph:arrow-right-bold" class="text-xs" />
        </button>
      </div>
    </div>
    <div class="flex gap-5 overflow-hidden">
      <div v-for="(img, i) in PRODUCT_IMGS" :key="i"
        class="w-48 shrink-0 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm">
        <div class="flex aspect-square items-center justify-center rounded-xl bg-neutral-50">
          <div class="h-24 w-full bg-contain bg-center bg-no-repeat" :style="{ backgroundImage: `url('${img}')` }" />
        </div>
        <div class="mt-2">
          <p class="text-[10px] text-neutral-400">{{ PRODUCT_CATS[i] }}</p>
          <p class="mt-0.5 text-xs font-bold text-neutral-900">Product {{ i + 1 }}</p>
          <div class="mt-2 flex items-center justify-between gap-1">
            <span class="text-xs font-bold text-neutral-900">$80</span>
            <button type="button"
              class="rounded-lg border border-neutral-200 bg-neutral-50 px-2 py-1 text-[10px] font-semibold text-neutral-700">
              Add
            </button>
          </div>
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

const PRODUCT_IMGS = ['/img/category-01.avif', '/img/category-02.avif', '/img/category-03.avif']
const PRODUCT_CATS = ['Electronics', 'Sports', 'Home & Living']
</script>