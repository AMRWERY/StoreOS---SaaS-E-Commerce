<template>
  <!-- Split: image beside text -->
  <div v-if="variant === 'split'" class="grid min-h-[280px] grid-cols-1 md:grid-cols-2">
    <div
      class="relative min-h-[14rem] bg-neutral-200"
      :class="imageEnd ? 'md:order-last' : ''"
    >
      <img :src="image" :alt="heading" class="absolute inset-0 size-full object-cover" loading="lazy" />
    </div>
    <div class="flex flex-col justify-center px-6 py-10 text-start sm:px-10 sm:py-12">
      <h2 class="text-2xl font-bold text-neutral-900">{{ heading }}</h2>
      <p
        v-for="(para, i) in paragraphs"
        :key="i"
        class="mt-4 text-[15px] leading-relaxed text-neutral-600"
      >
        {{ para }}
      </p>
      <a
        v-if="ctaText"
        :href="ctaUrl"
        class="mt-6 w-fit rounded-md bg-neutral-900 px-6 py-2.5 text-sm font-bold text-white"
        >{{ ctaText }}</a
      >
    </div>
  </div>

  <!-- Overlay: text panel over a full-bleed image -->
  <div
    v-else-if="variant === 'overlay'"
    class="relative flex min-h-[340px] items-center bg-neutral-200 px-4 py-10 sm:px-10"
    :class="imageEnd ? 'justify-end' : 'justify-start'"
  >
    <img :src="image" :alt="heading" class="absolute inset-0 size-full object-cover" loading="lazy" />
    <div class="absolute inset-0 bg-black/30" />
    <div class="relative w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 text-start shadow-sm sm:p-8">
      <h2 class="text-2xl font-bold text-neutral-900">{{ heading }}</h2>
      <p
        v-for="(para, i) in paragraphs"
        :key="i"
        class="mt-3 text-[15px] leading-relaxed text-neutral-600"
      >
        {{ para }}
      </p>
      <a
        v-if="ctaText"
        :href="ctaUrl"
        class="mt-5 inline-block rounded-md bg-neutral-900 px-6 py-2.5 text-sm font-bold text-white"
        >{{ ctaText }}</a
      >
    </div>
  </div>

  <!-- Stacked: image on top, centered text below -->
  <div v-else class="px-4 py-10 sm:px-8 sm:py-12">
    <div class="mx-auto max-w-3xl text-center">
      <div class="aspect-[16/9] overflow-hidden rounded-2xl bg-neutral-200">
        <img :src="image" :alt="heading" class="size-full object-cover" loading="lazy" />
      </div>
      <h2 class="mt-6 text-2xl font-bold text-neutral-900">{{ heading }}</h2>
      <p
        v-for="(para, i) in paragraphs"
        :key="i"
        class="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-neutral-600"
      >
        {{ para }}
      </p>
      <a
        v-if="ctaText"
        :href="ctaUrl"
        class="mt-6 inline-block rounded-md bg-neutral-900 px-6 py-2.5 text-sm font-bold text-white"
        >{{ ctaText }}</a
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str } = useSectionData(() => props.section);

const variant = computed(() => str("variant", "split"));
const heading = computed(() => str("heading", str("headline", "Our story")));
const image = computed(() => str("image_url") || "/img/category-01.png");
const ctaText = computed(() => str("cta_text"));
const ctaUrl = computed(() => str("cta_url", "#"));

// Form writes `layout` (image-start | image-end); older data used `image_side` (left | right).
const imageEnd = computed(
  () => str("layout") === "image-end" || (!str("layout") && str("image_side", "left") === "right"),
);

const paragraphs = computed(() => {
  const body = str("body", "Tell your brand story, highlight what makes you special, and connect with your customers on a deeper level.");
  return body
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);
});
</script>
