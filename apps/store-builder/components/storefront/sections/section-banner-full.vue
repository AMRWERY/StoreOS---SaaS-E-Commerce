<template>
  <div>
    <!-- Overlay -->
    <div
      v-if="variant === 'overlay'"
      class="relative flex min-h-[220px] items-center justify-center overflow-hidden bg-neutral-900 px-6 py-12 text-center md:px-8"
    >
      <img :src="image" alt="" class="absolute inset-0 size-full object-cover" />
      <div class="absolute inset-0" :style="tintStyle" />
      <div class="relative z-10 max-w-2xl">
        <h2 class="text-2xl font-bold text-white md:text-3xl">{{ title }}</h2>
        <p v-if="subtitle" class="mt-3 text-neutral-300">{{ subtitle }}</p>
        <a
          v-if="ctaText"
          :href="ctaUrl"
          class="mt-6 inline-block rounded-md bg-white px-8 py-2.5 text-sm font-bold text-neutral-900 transition hover:bg-neutral-100"
        >
          {{ ctaText }}
        </a>
      </div>
    </div>

    <!-- Strip -->
    <div
      v-else-if="variant === 'strip'"
      class="relative overflow-hidden bg-neutral-900 px-6 py-4 md:px-8"
    >
      <div class="absolute inset-0" :style="tintStyle" />
      <div
        class="relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-start"
      >
        <div class="min-w-0">
          <p class="text-sm font-bold text-white md:text-base">{{ title }}</p>
          <p v-if="subtitle" class="text-xs text-neutral-400 md:text-sm">{{ subtitle }}</p>
        </div>
        <a
          v-if="ctaText"
          :href="ctaUrl"
          class="shrink-0 rounded-md bg-white px-5 py-2 text-xs font-bold text-neutral-900 transition hover:bg-neutral-100"
        >
          {{ ctaText }}
        </a>
      </div>
    </div>

    <!-- Card -->
    <div class="relative flex min-h-[260px] items-center overflow-hidden bg-neutral-800 px-6 py-10 md:px-12" v-else>
      <img :src="image" alt="" class="absolute inset-0 size-full object-cover" />
      <div class="absolute inset-0" :style="tintStyle" />
      <div class="relative z-10 w-full max-w-md rounded-xl bg-white p-7 shadow-xl">
        <h2 class="text-xl font-bold text-neutral-900 md:text-2xl">{{ title }}</h2>
        <p v-if="subtitle" class="mt-2 text-sm text-neutral-500">{{ subtitle }}</p>
        <a
          v-if="ctaText"
          :href="ctaUrl"
          class="mt-5 inline-block rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
        >
          {{ ctaText }}
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, num, settings } = useSectionData(() => props.section);

const first = (fallback: string, ...keys: string[]) => {
  for (const k of keys) {
    const v = str(k);
    if (v) return v;
  }
  return fallback;
};

const variant = computed(() => str("variant", "overlay"));
const title = computed(() => first("Special Offer", "title", "heading"));
const subtitle = computed(() =>
  first("", "subtitle", "subheading"),
);
const ctaText = computed(() =>
  String(settings.value.cta_text ?? settings.value.buttonText ?? "Shop now"),
);
const ctaUrl = computed(() => str("cta_url") || "#");
const image = computed(() => str("image_url") || "/img/marketing-hero.png");
const tintStyle = computed(() => ({
  backgroundColor: str("overlay", "#000000"),
  opacity: Math.min(0.9, Math.max(0, num("overlay_opacity", 45) / 100)),
}));
</script>
