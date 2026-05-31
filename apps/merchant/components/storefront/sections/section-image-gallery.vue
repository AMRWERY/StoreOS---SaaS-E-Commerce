<template>
  <div class="px-8 py-12">
    <h2 v-if="str('heading')" class="mb-6 text-xl font-bold text-neutral-900">
      {{ str('heading') }}
    </h2>
    <div class="grid grid-cols-3 gap-3">
      <div v-for="(img, i) in GALLERY_IMGS" :key="i"
        class="aspect-square overflow-hidden rounded-lg bg-cover bg-center bg-neutral-200"
        :style="{ backgroundImage: `url('${img}')` }" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from '@/types/sections'

const props = defineProps<{ section: PageSection }>()

const str = (key: string, fallback = '') => String(props.section.settings[key] ?? fallback)

const GALLERY_IMGS = [
  '/img/collection-01.avif', '/img/collection-02.avif', '/img/collection-03.avif',
  '/img/collection-04.avif', '/img/collection-05.avif', '/img/collection-06.avif',
]
</script>