<template>
  <div class="grid min-h-[200px] grid-cols-2">
    <div class="flex items-center justify-center bg-neutral-900 p-10 text-center">
      <div>
        <h3 class="text-xl font-bold text-white">
          {{ str('heading1', 'New Collection') }}
        </h3>
        <button type="button"
          class="mt-4 rounded-md border border-white px-6 py-2 text-sm font-semibold text-white hover:bg-white/10">
          {{ str('button1', 'Shop Now') }}
        </button>
      </div>
    </div>
    <div class="flex items-center justify-center bg-neutral-100 p-10 text-center">
      <div>
        <h3 class="text-xl font-bold text-neutral-900">
          {{ str('heading2', 'Sale Items') }}
        </h3>
        <button type="button"
          class="mt-4 rounded-md bg-neutral-900 px-6 py-2 text-sm font-semibold text-white hover:bg-neutral-800">
          {{ str('button2', 'View Sale') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from '@/types/sections'

const props = defineProps<{ section: PageSection }>()

const str = (key: string, fallback = '') => String(props.section.settings[key] ?? fallback)
</script>