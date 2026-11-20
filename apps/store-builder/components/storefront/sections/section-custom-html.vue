<template>
  <div class="px-4 py-6 sm:px-8">
    <div
      v-if="!html.trim()"
      class="flex flex-col items-center justify-center gap-2 py-6 text-center"
    >
      <Icon name="ph:code-bold" class="text-3xl text-neutral-300" />
      <p class="text-sm font-medium text-neutral-500">Custom HTML Block</p>
      <p class="text-xs text-neutral-400">
        Add your HTML in the settings panel.
      </p>
    </div>
    <!-- Merchant markup never runs in the storefront origin: empty sandbox = no scripts, unique origin. -->
    <iframe
      v-else
      sandbox=""
      title="Custom HTML"
      loading="lazy"
      :srcdoc="srcdoc"
      class="w-full border-0"
      :style="{ height: `${height}px` }"
    />
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, num } = useSectionData(() => props.section);

const html = computed(() => str("html", ""));
const height = computed(() => Math.min(Math.max(num("height", 240), 40), 2400));

const srcdoc = computed(
  () =>
    `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0}body{font-family:system-ui,sans-serif;font-size:14px;line-height:1.5}img,video,iframe{max-width:100%}</style></head><body>${html.value}</body></html>`,
);
</script>
