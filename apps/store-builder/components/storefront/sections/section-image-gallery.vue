<template>
  <div class="px-4 py-10 sm:px-8 sm:py-12">
    <h2
      v-if="heading"
      class="mb-6 text-start text-xl font-bold text-neutral-900"
    >
      {{ heading }}
    </h2>

    <div :class="wrapClass">
      <component
        :is="lightboxOn ? 'button' : 'div'"
        v-for="(img, i) in images"
        :key="i"
        :type="lightboxOn ? 'button' : undefined"
        class="group relative block overflow-hidden rounded-lg bg-neutral-200"
        :class="[tileClass(i), lightboxOn ? 'cursor-zoom-in' : '']"
        :aria-label="lightboxOn ? `Open image ${i + 1}` : undefined"
        @click="lightboxOn && openAt(i)"
      >
        <img
          :src="img.url"
          :alt="img.alt"
          class="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <span
          v-if="img.caption && variant !== 'masonry'"
          class="absolute inset-x-0 bottom-0 bg-black/50 px-3 py-1.5 text-start text-xs text-white"
          >{{ img.caption }}</span
        >
      </component>
    </div>

    <ClientOnly>
      <Teleport to="body">
        <div
          v-if="openIndex !== null"
          class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          @click.self="close"
        >
          <button
            type="button"
            aria-label="Close"
            class="absolute end-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            @click="close"
          >
            <Icon name="ph:x-bold" class="text-lg" />
          </button>
          <button
            v-if="images.length > 1"
            type="button"
            aria-label="Previous"
            class="absolute start-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
            @click="step(-1)"
          >
            <Icon name="ph:caret-left-bold" class="text-lg icon-nudge-start" />
          </button>
          <figure class="max-h-full max-w-5xl text-center">
            <img
              :src="images[openIndex]?.url"
              :alt="images[openIndex]?.alt"
              class="mx-auto max-h-[80vh] max-w-full rounded-lg object-contain"
            />
            <figcaption class="mt-3 text-sm text-white/80">
              <span v-if="images[openIndex]?.caption">{{ images[openIndex]?.caption }} · </span>
              {{ openIndex + 1 }} / {{ images.length }}
            </figcaption>
          </figure>
          <button
            v-if="images.length > 1"
            type="button"
            aria-label="Next"
            class="absolute end-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
            @click="step(1)"
          >
            <Icon name="ph:caret-right-bold" class="text-lg icon-nudge-end" />
          </button>
        </div>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, num, bool, list } = useSectionData(() => props.section);

interface GalleryImage {
  url: string;
  alt: string;
  caption: string;
}

const FALLBACK = [1, 2, 3, 4, 5, 6].map((n) => `/img/collection-0${n}.png`);

const variant = computed(() => str("variant", "grid"));
const heading = computed(() => str("heading", ""));
const lightboxOn = computed(() => bool("lightbox", true));

const images = computed<GalleryImage[]>(() => {
  const raw = list<any>("images");
  const mapped = raw
    .map((r, i): GalleryImage | null => {
      if (typeof r === "string") return r ? { url: r, alt: `Image ${i + 1}`, caption: "" } : null;
      const url = String(r?.url ?? r?.src ?? r?.image ?? "");
      return url ? { url, alt: String(r?.alt ?? `Image ${i + 1}`), caption: String(r?.caption ?? "") } : null;
    })
    .filter((x): x is GalleryImage => !!x);
  const cover = str("image_url");
  const out = mapped.length ? mapped : FALLBACK.map((url, i) => ({ url, alt: `Image ${i + 1}`, caption: "" }));
  return cover ? [{ url: cover, alt: "Cover image", caption: "" }, ...out] : out;
});

const COLS: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
};
const MASONRY_COLS: Record<number, string> = {
  2: "columns-2",
  3: "columns-2 md:columns-3",
  4: "columns-2 md:columns-4",
};
const cols = computed(() => Math.min(4, Math.max(2, Math.round(num("columns", 3)))));

const wrapClass = computed(() => {
  if (variant.value === "masonry") return `${MASONRY_COLS[cols.value]} gap-3`;
  return `grid gap-3 ${COLS[cols.value]}`;
});

const MASONRY_RATIOS = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[4/3]", "aspect-[3/4]", "aspect-square"];

function tileClass(i: number) {
  if (variant.value === "masonry") return `mb-3 break-inside-avoid ${MASONRY_RATIOS[i % MASONRY_RATIOS.length]}`;
  if (variant.value === "featured") return i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square";
  return "aspect-square";
}

// Lightbox
const openIndex = ref<number | null>(null);

function onKey(e: KeyboardEvent) {
  if (openIndex.value === null) return;
  if (e.key === "Escape") close();
  else if (e.key === "ArrowRight") step(1);
  else if (e.key === "ArrowLeft") step(-1);
}

function openAt(i: number) {
  openIndex.value = i;
  if (typeof window !== "undefined") window.addEventListener("keydown", onKey);
}
function close() {
  openIndex.value = null;
  if (typeof window !== "undefined") window.removeEventListener("keydown", onKey);
}
function step(d: 1 | -1) {
  if (openIndex.value === null) return;
  const n = images.value.length;
  openIndex.value = (openIndex.value + d + n) % n;
}

onBeforeUnmount(() => {
  if (typeof window !== "undefined") window.removeEventListener("keydown", onKey);
});
</script>
