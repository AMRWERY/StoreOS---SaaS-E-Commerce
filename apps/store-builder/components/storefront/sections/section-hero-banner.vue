<template>
  <div>
    <!-- Cover: text over full-bleed image -->
    <div
      v-if="variant === 'cover'"
      class="relative flex items-center overflow-hidden bg-neutral-800 px-6 py-16 md:px-16 md:py-20"
      :class="heightClass"
    >
      <img :src="image" alt="" class="absolute inset-0 size-full object-cover" />
      <div class="absolute inset-0 bg-black" :style="{ opacity: overlayAlpha }" />
      <div class="relative z-10 flex w-full" :class="justifyClass">
        <div class="max-w-xl" :class="textAlignClass">
          <h2
            class="text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-[2.75rem]"
          >
            {{ headline }}
          </h2>
          <p
            v-if="subheadline"
            class="mt-4 max-w-lg text-[15px] leading-relaxed text-white/85"
            :class="alignment === 'center' ? 'mx-auto' : alignment === 'right' ? 'ms-auto' : ''"
          >
            {{ subheadline }}
          </p>
          <div class="mt-8 flex flex-wrap gap-3" :class="justifyClass">
            <a
              v-if="buttonText"
              :href="ctaUrl"
              class="rounded-md bg-white px-8 py-3 text-xs font-bold tracking-[0.2em] text-neutral-900 shadow-lg transition hover:bg-neutral-100"
            >
              {{ buttonText }}
            </a>
            <a
              v-if="secondText"
              :href="ctaUrl"
              class="rounded-md border border-white px-8 py-3 text-xs font-bold tracking-[0.2em] text-white transition hover:bg-white/10"
            >
              {{ secondText }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Card: floating panel on image -->
    <div
      v-else-if="variant === 'card'"
      class="relative flex items-center overflow-hidden bg-neutral-800 px-6 py-12 md:px-16"
      :class="heightClass"
    >
      <img :src="image" alt="" class="absolute inset-0 size-full object-cover" />
      <div class="absolute inset-0 bg-black" :style="{ opacity: overlayAlpha * 0.5 }" />
      <div class="relative z-10 flex w-full" :class="justifyClass">
        <div
          class="w-full max-w-md rounded-xl bg-white p-8 shadow-xl md:p-10"
          :class="textAlignClass"
        >
          <h2 class="text-2xl font-bold leading-tight text-neutral-900 md:text-3xl">
            {{ headline }}
          </h2>
          <p v-if="subheadline" class="mt-3 text-sm leading-relaxed text-neutral-500">
            {{ subheadline }}
          </p>
          <div class="mt-6 flex flex-wrap gap-3" :class="justifyClass">
            <a
              v-if="buttonText"
              :href="ctaUrl"
              class="rounded-md bg-indigo-600 px-6 py-2.5 text-xs font-bold tracking-wider text-white transition hover:bg-indigo-700"
            >
              {{ buttonText }}
            </a>
            <a
              v-if="secondText"
              :href="ctaUrl"
              class="rounded-md border border-neutral-200 px-6 py-2.5 text-xs font-bold tracking-wider text-neutral-900 transition hover:bg-neutral-50"
            >
              {{ secondText }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Stacked: image on top, text below -->
    <div v-else class="bg-white">
      <div class="relative overflow-hidden bg-neutral-800" :class="stackedImageHeight">
        <img :src="image" alt="" class="absolute inset-0 size-full object-cover" />
        <div class="absolute inset-0 bg-black" :style="{ opacity: overlayAlpha * 0.4 }" />
      </div>
      <div class="px-6 py-10 md:px-16" :class="textAlignClass">
        <h2 class="text-2xl font-bold tracking-tight text-neutral-900 md:text-4xl">
          {{ headline }}
        </h2>
        <p
          v-if="subheadline"
          class="mt-3 max-w-xl text-[15px] leading-relaxed text-neutral-500"
          :class="alignment === 'center' ? 'mx-auto' : alignment === 'right' ? 'ms-auto' : ''"
        >
          {{ subheadline }}
        </p>
        <div class="mt-6 flex flex-wrap gap-3" :class="justifyClass">
          <a
            v-if="buttonText"
            :href="ctaUrl"
            class="rounded-md bg-neutral-900 px-8 py-3 text-xs font-bold tracking-[0.2em] text-white transition hover:bg-neutral-800"
          >
            {{ buttonText }}
          </a>
          <a
            v-if="secondText"
            :href="ctaUrl"
            class="rounded-md border border-neutral-200 px-8 py-3 text-xs font-bold tracking-[0.2em] text-neutral-900 transition hover:bg-neutral-50"
          >
            {{ secondText }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, num } = useSectionData(() => props.section);

const first = (fallback: string, ...keys: string[]) => {
  for (const k of keys) {
    const v = str(k);
    if (v) return v;
  }
  return fallback;
};

const variant = computed(() => str("variant", "cover"));
const headline = computed(() => first("Welcome to our store", "headline"));
const subheadline = computed(() => first("", "subheadline"));
const buttonText = computed(() => first("Shop now", "buttonText", "cta_text"));
const secondText = computed(() => str("second_cta_text"));
const ctaUrl = computed(() => str("cta_url") || "#");
const image = computed(() => str("image_url") || "/img/hero-banner.png");
const alignment = computed(() => str("alignment", "left"));
const overlayAlpha = computed(() =>
  Math.min(0.9, Math.max(0, num("overlay_opacity", 55) / 100)),
);

const heightClass = computed(
  () =>
    ({ sm: "min-h-[260px]", lg: "min-h-[460px]" })[str("height", "md")] ??
    "min-h-[340px]",
);
const stackedImageHeight = computed(
  () =>
    ({ sm: "h-40", lg: "h-80 md:h-96" })[str("height", "md")] ?? "h-56 md:h-64",
);
const justifyClass = computed(
  () =>
    ({ center: "justify-center", right: "justify-end" })[alignment.value] ??
    "justify-start",
);
const textAlignClass = computed(
  () =>
    ({ center: "text-center", right: "text-end" })[alignment.value] ??
    "text-start",
);
</script>
