<template>
  <div class="grid min-h-[400px] grid-cols-2">
    <div class="bg-cover bg-center bg-neutral-200"
      :style="{ backgroundImage: `url('${str('image_url') || 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80'}')` }" />
    <div class="flex flex-col justify-center px-10 py-12">
      <span class="text-xs font-bold tracking-widest text-neutral-500">Featured</span>
      <h2 class="mt-2 text-2xl font-bold text-neutral-900">
        {{ str('productName', 'Product Name') }}
      </h2>
      <p class="mt-2 text-xl font-semibold text-neutral-900">
        {{ str('price', '$149.00') }}
      </p>
      <p class="mt-4 text-sm leading-relaxed text-neutral-600">
        {{ str('description', 'Describe the product here. Highlight key features and benefits.') }}
      </p>
      <button type="button" class="mt-6 w-fit rounded-md bg-neutral-900 px-8 py-3 text-sm font-bold text-white">
        Add to cart
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from '@/types/sections'

const props = defineProps<{ section: PageSection }>()

const str = (key: string, fallback = '') => String(props.section.settings[key] ?? fallback)
</script>