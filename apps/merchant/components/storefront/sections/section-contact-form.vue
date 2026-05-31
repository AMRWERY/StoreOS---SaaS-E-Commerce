<template>
  <div class="px-8 py-14">
    <h2 class="text-xl font-bold text-neutral-900">
      {{ str('heading', str('headline', 'Contact us')) }}
    </h2>
    <p v-if="str('subheadline')" class="mt-2 text-sm text-neutral-500">{{ str('subheadline') }}</p>
    <form class="mt-6 grid max-w-xl grid-cols-2 gap-4" @submit.prevent>
      <input type="text" placeholder="Name" readonly
        class="rounded-md border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900" />
      <input type="email" placeholder="Email" readonly
        class="rounded-md border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900" />
      <input v-if="bool('show_phone', true)" type="tel" placeholder="Phone" readonly
        class="rounded-md border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900" />
      <textarea placeholder="Message" rows="4" readonly
        class="col-span-2 rounded-md border border-neutral-300 bg-white px-4 py-2.5 text-sm" />
      <button type="submit" class="w-fit rounded-md bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white">
        {{ str('submit_label', str('submitLabel', 'Send message')) }}
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from '@/types/sections'

const props = defineProps<{ section: PageSection }>()
const str = (key: string, fallback = '') => String(props.section.settings[key] ?? fallback)
const bool = (key: string, fallback = false) => Boolean(props.section.settings[key] ?? fallback)
</script>