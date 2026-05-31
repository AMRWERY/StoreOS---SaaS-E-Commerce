<template>
  <div class="px-8 py-12">
    <h2 v-if="str('title')" class="mb-4 text-xl font-bold text-neutral-900 text-center">{{ str('title') }}</h2>
    <div
      class="mx-auto flex aspect-video max-w-3xl items-center justify-center rounded-xl bg-neutral-900 overflow-hidden">
      <template v-if="str('url')">
        <iframe :src="embedUrl" class="h-full w-full" frameborder="0" allowfullscreen />
      </template>
      <template v-else>
        <Icon name="ph:play-circle-fill" class="text-6xl text-white/30" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from '@/types/sections'

const props = defineProps<{ section: PageSection }>()
const str = (key: string, fallback = '') => String(props.section.settings[key] ?? fallback)

const embedUrl = computed(() => {
  const url = str('url')
  if (!url) return ''
  // Convert YouTube watch URLs to embed
  return url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')
})
</script>