<template>
  <div class="relative flex min-h-[380px] items-center bg-cover bg-center" :style="{
    backgroundImage: `linear-gradient(90deg, rgba(15,15,20,0.75) 0%, rgba(15,15,20,0.35) 45%, transparent 100%), url('${str('image_url') || 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1400&q=80'}')`,
  }">
    <div class="max-w-xl ps-16">
      <h2 class="text-3xl font-bold text-white">
        {{ str('headline', 'Hero Slideshow') }}
      </h2>
      <p class="mt-4 text-white/80">
        {{ str('subheadline', 'Add multiple slides in the settings panel.') }}
      </p>
    </div>
    <div class="absolute bottom-5 start-0 end-0 flex justify-center gap-2">
      <span v-for="i in 3" :key="i" class="h-2 w-2 rounded-full" :class="i === 1 ? 'bg-white' : 'bg-white/35'" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from '@/types/sections'

const props = defineProps<{ section: PageSection }>()

const str = (key: string, fallback = '') => String(props.section.settings[key] ?? fallback)
</script>