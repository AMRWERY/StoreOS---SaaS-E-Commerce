<template>
  <div>
    <!-- Split: dark panel + edge image -->
    <div v-if="variant === 'split'" class="grid min-h-[320px] md:grid-cols-2">
      <div
        class="flex flex-col justify-center bg-neutral-900 px-6 py-12 md:px-10"
        :class="imageLeft ? 'md:order-last' : ''"
      >
        <h2 class="text-2xl font-bold text-white md:text-3xl">{{ headline }}</h2>
        <p v-if="subheadline" class="mt-3 text-sm text-neutral-400">
          {{ subheadline }}
        </p>
        <a
          v-if="ctaText"
          :href="ctaUrl"
          class="mt-6 w-fit rounded-md bg-white px-6 py-2.5 text-xs font-bold text-neutral-900 transition hover:bg-neutral-100"
        >
          {{ ctaText }}
        </a>
      </div>
      <div class="relative min-h-[220px] bg-neutral-700">
        <img :src="image" alt="" class="absolute inset-0 size-full object-cover" />
      </div>
    </div>

    <!-- Inset: light bg, rounded image -->
    <div v-else-if="variant === 'inset'" class="bg-neutral-50 px-6 py-12 md:px-12 md:py-16">
      <div
        class="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2 md:gap-14"
      >
        <div :class="imageLeft ? 'md:order-last' : ''">
          <h2 class="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
            {{ headline }}
          </h2>
          <p v-if="subheadline" class="mt-4 text-[15px] leading-relaxed text-neutral-500">
            {{ subheadline }}
          </p>
          <a
            v-if="ctaText"
            :href="ctaUrl"
            class="mt-7 inline-block rounded-md bg-indigo-600 px-7 py-3 text-xs font-bold tracking-wider text-white transition hover:bg-indigo-700"
          >
            {{ ctaText }}
          </a>
        </div>
        <div class="aspect-[4/3] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100">
          <img :src="image" alt="" class="size-full object-cover" />
        </div>
      </div>
    </div>

    <!-- Overlap: full image + card -->
    <div v-else class="relative flex min-h-[380px] items-center overflow-hidden bg-neutral-800 px-6 py-12 md:px-12">
      <img :src="image" alt="" class="absolute inset-0 size-full object-cover" />
      <div class="relative z-10 flex w-full" :class="imageLeft ? 'justify-end' : 'justify-start'">
        <div class="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
          <h2 class="text-2xl font-bold text-neutral-900">{{ headline }}</h2>
          <p v-if="subheadline" class="mt-3 text-sm leading-relaxed text-neutral-500">
            {{ subheadline }}
          </p>
          <a
            v-if="ctaText"
            :href="ctaUrl"
            class="mt-6 inline-block rounded-md bg-neutral-900 px-6 py-2.5 text-xs font-bold text-white transition hover:bg-neutral-800"
          >
            {{ ctaText }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str } = useSectionData(() => props.section);

const variant = computed(() => str("variant", "split"));
const headline = computed(() => str("headline", "Designed for calm spaces"));
const subheadline = computed(() => str("subheadline", ""));
const ctaText = computed(() => str("cta_text") || str("buttonText", "Learn more"));
const ctaUrl = computed(() => str("cta_url") || "#");
const imageLeft = computed(() => str("image_side", "right") === "left");
const image = computed(() => str("image_url") || "/img/category-01.png");
</script>
