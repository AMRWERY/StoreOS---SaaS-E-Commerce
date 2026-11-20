<template>
  <div
    class="relative overflow-hidden bg-neutral-900"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
  >
    <!-- Fade -->
    <div v-if="variant === 'fade'" class="relative min-h-[380px] md:min-h-[440px]">
      <div
        v-for="(s, i) in slides"
        :key="i"
        class="absolute inset-0 transition-opacity duration-300"
        :class="i === current ? 'opacity-100' : 'pointer-events-none opacity-0'"
        :aria-hidden="i !== current"
      >
        <img :src="s.image" alt="" class="absolute inset-0 size-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent rtl:bg-gradient-to-l" />
        <div class="relative z-10 flex h-full items-center px-6 py-14 md:px-16">
          <div class="max-w-xl">
            <p
              v-if="eyebrow"
              class="mb-3 text-xs font-bold tracking-[0.25em] text-white/70"
            >
              {{ eyebrow }}
            </p>
            <h2 class="text-3xl font-bold leading-tight text-white md:text-4xl">
              {{ s.headline }}
            </h2>
            <p v-if="s.subheadline" class="mt-4 text-white/80">
              {{ s.subheadline }}
            </p>
            <a
              v-if="s.cta_text"
              :href="s.cta_url"
              class="mt-8 inline-block rounded-md bg-white px-8 py-3 text-xs font-bold tracking-[0.2em] text-neutral-900 shadow-lg transition hover:bg-neutral-100"
            >
              {{ s.cta_text }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Split -->
    <div v-else-if="variant === 'split'" class="grid min-h-[380px] bg-neutral-900 md:grid-cols-2">
      <div class="relative flex flex-col justify-center px-6 py-12 md:px-12">
        <p v-if="eyebrow" class="mb-3 text-xs font-bold tracking-[0.25em] text-neutral-400">
          {{ eyebrow }}
        </p>
        <h2 class="text-3xl font-bold leading-tight text-white md:text-4xl">
          {{ active.headline }}
        </h2>
        <p v-if="active.subheadline" class="mt-4 text-neutral-400">
          {{ active.subheadline }}
        </p>
        <a
          v-if="active.cta_text"
          :href="active.cta_url"
          class="mt-8 inline-block w-fit rounded-md bg-white px-8 py-3 text-xs font-bold tracking-[0.2em] text-neutral-900 transition hover:bg-neutral-100"
        >
          {{ active.cta_text }}
        </a>
      </div>
      <div class="relative min-h-[240px] bg-neutral-800">
        <img
          v-for="(s, i) in slides"
          :key="i"
          :src="s.image"
          alt=""
          class="absolute inset-0 size-full object-cover transition-opacity duration-300"
          :class="i === current ? 'opacity-100' : 'opacity-0'"
        />
      </div>
    </div>

    <!-- Centered -->
    <div v-else class="relative min-h-[380px] md:min-h-[440px]">
      <img
        v-for="(s, i) in slides"
        :key="i"
        :src="s.image"
        alt=""
        class="absolute inset-0 size-full object-cover transition-opacity duration-300"
        :class="i === current ? 'opacity-100' : 'opacity-0'"
      />
      <div class="absolute inset-0 bg-black/55" />
      <div class="relative z-10 flex min-h-[380px] flex-col items-center justify-center px-14 py-14 text-center md:min-h-[440px]">
        <p v-if="eyebrow" class="mb-3 text-xs font-bold tracking-[0.25em] text-white/70">
          {{ eyebrow }}
        </p>
        <h2 class="max-w-2xl text-3xl font-bold leading-tight text-white md:text-5xl">
          {{ active.headline }}
        </h2>
        <p v-if="active.subheadline" class="mt-4 max-w-xl text-white/80">
          {{ active.subheadline }}
        </p>
        <a
          v-if="active.cta_text"
          :href="active.cta_url"
          class="mt-8 rounded-md bg-white px-8 py-3 text-xs font-bold tracking-[0.2em] text-neutral-900 shadow-lg transition hover:bg-neutral-100"
        >
          {{ active.cta_text }}
        </a>
      </div>
    </div>

    <!-- Arrows (centered variant, or any variant with several slides) -->
    <template v-if="slides.length > 1">
      <button
        v-if="variant === 'centered'"
        type="button"
        aria-label="Previous slide"
        class="absolute start-3 top-1/2 z-20 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/35"
        @click="go(current - 1)"
      >
        <Icon name="ph:caret-left-bold" class="rtl:rotate-180" />
      </button>
      <button
        v-if="variant === 'centered'"
        type="button"
        aria-label="Next slide"
        class="absolute end-3 top-1/2 z-20 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/35"
        @click="go(current + 1)"
      >
        <Icon name="ph:caret-right-bold" class="rtl:rotate-180" />
      </button>

      <div
        class="absolute bottom-5 z-20 flex gap-2"
        :class="variant === 'split' ? 'start-6 md:start-12' : 'start-0 end-0 justify-center'"
      >
        <button
          v-for="(_, i) in slides"
          :key="i"
          type="button"
          :aria-label="`Go to slide ${i + 1}`"
          class="h-2 rounded-full transition-all"
          :class="i === current ? 'w-6 bg-white' : 'w-2 bg-white/40'"
          @click="go(i)"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

interface Slide {
  image: string;
  headline: string;
  subheadline: string;
  cta_text: string;
  cta_url: string;
}

const props = defineProps<{ section: PageSection }>();
const { str, num, bool, list } = useSectionData(() => props.section);

const FALLBACK_IMAGES = [
  "/img/category-01.png",
  "/img/category-02.png",
  "/img/category-03.png",
];

const variant = computed(() => str("variant", "fade"));
const eyebrow = computed(() => str("eyebrow", "New collection"));

const slides = computed<Slide[]>(() => {
  const rows = list<Record<string, any>>("slides");
  if (rows.length) {
    return rows.map((r, i) => ({
      image: String(r.image_url || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]),
      headline: String(r.headline ?? ""),
      subheadline: String(r.subheadline ?? ""),
      cta_text: String(r.cta_text ?? ""),
      cta_url: String(r.cta_url || "#"),
    }));
  }
  const headline = str("headline", "Hero Slideshow");
  const sub = str("subheadline", "Add multiple slides in the settings panel.");
  return [
    {
      image: str("image_url") || FALLBACK_IMAGES[0]!,
      headline,
      subheadline: sub,
      cta_text: str("cta_text", "Shop now"),
      cta_url: str("cta_url") || "#",
    },
    {
      image: FALLBACK_IMAGES[1]!,
      headline: "Made to last",
      subheadline: "Thoughtfully crafted pieces for every day.",
      cta_text: "Explore",
      cta_url: "#",
    },
    {
      image: FALLBACK_IMAGES[2]!,
      headline: "Season highlights",
      subheadline: "Our most-loved picks, all in one place.",
      cta_text: "View all",
      cta_url: "#",
    },
  ];
});

const current = ref(0);
const paused = ref(false);
const active = computed(() => slides.value[current.value] ?? slides.value[0]!);

const go = (i: number) => {
  const n = slides.value.length;
  current.value = ((i % n) + n) % n;
};

let timer: ReturnType<typeof setInterval> | null = null;
const stop = () => {
  if (timer) clearInterval(timer);
  timer = null;
};
const start = () => {
  stop();
  if (!import.meta.client) return;
  if (!bool("autoplay", true) || slides.value.length < 2) return;
  const ms = Math.max(2, num("interval_sec", 5)) * 1000;
  timer = setInterval(() => {
    if (!paused.value) go(current.value + 1);
  }, ms);
};

onMounted(start);
watch(
  () => [bool("autoplay", true), num("interval_sec", 5), slides.value.length],
  () => {
    if (current.value >= slides.value.length) current.value = 0;
    start();
  },
);
onBeforeUnmount(stop);
</script>
