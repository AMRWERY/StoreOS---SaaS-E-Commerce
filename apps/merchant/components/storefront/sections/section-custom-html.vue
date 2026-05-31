<template>
  <div class="flex flex-col items-center justify-center gap-2 px-8 py-10 text-center">
    <Icon name="ph:code-bold" class="text-3xl text-neutral-300" />
    <p class="text-sm font-medium text-neutral-500">Custom HTML Block</p>
    <p v-if="!str('html')" class="text-xs text-neutral-400">Add your HTML in the settings panel.</p>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-else v-html="str('html')" class="w-full" />
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from '@/types/sections'

const props = defineProps<{ section: PageSection }>()

const str = (key: string, fallback = '') => String(props.section.settings[key] ?? fallback)
</script>