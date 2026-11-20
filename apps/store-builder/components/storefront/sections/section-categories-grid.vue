<template>
  <div class="px-4 py-10 sm:px-8 sm:py-12">
    <h3
      v-if="bool('show_title', true) && heading"
      class="mb-6 text-start text-lg font-bold text-neutral-900"
    >
      {{ heading }}
    </h3>

    <div :class="wrapClass">
      <template v-for="(c, i) in cats" :key="c.id">
        <!-- Overlay (also used by mosaic) -->
        <a
          v-if="tileStyle === 'overlay'"
          :href="catHref(c)"
          class="group relative block overflow-hidden rounded-xl bg-neutral-200"
          :class="itemClass(i)"
        >
          <img
            :src="c.image"
            :alt="c.title"
            class="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <span class="absolute inset-0 bg-black/30" />
          <span class="absolute inset-0 flex flex-col items-start justify-end gap-1 p-3">
            <span
              class="rounded-md bg-white/90 px-2.5 py-1 text-xs font-semibold text-neutral-900"
              >{{ c.title }}</span
            >
            <span
              v-if="bool('show_count', true)"
              class="rounded-md bg-black/50 px-2 py-0.5 text-[10px] text-white"
              >{{ c.count }} products</span
            >
          </span>
        </a>

        <!-- Below -->
        <a v-else-if="tileStyle === 'below'" :href="catHref(c)" class="block space-y-2" :class="itemClass(i)">
          <span class="block aspect-square overflow-hidden rounded-xl bg-neutral-200">
            <img :src="c.image" :alt="c.title" class="size-full object-cover" loading="lazy" />
          </span>
          <span class="block text-center text-sm font-semibold text-neutral-900">{{ c.title }}</span>
          <span v-if="bool('show_count', true)" class="block text-center text-xs text-neutral-500"
            >{{ c.count }} products</span
          >
        </a>

        <!-- Pill -->
        <a
          v-else-if="tileStyle === 'pill'"
          :href="catHref(c)"
          class="flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm"
          :class="itemClass(i)"
        >
          <span class="size-3 rounded-full" :style="{ backgroundColor: COLORS[i % COLORS.length] }" />
          {{ c.title }}
          <span v-if="bool('show_count', true)" class="text-xs font-normal text-neutral-400">{{ c.count }}</span>
        </a>

        <!-- Split -->
        <a
          v-else
          :href="catHref(c)"
          class="flex h-36 overflow-hidden rounded-xl border border-neutral-200"
          :class="itemClass(i)"
        >
          <span
            class="flex w-1/2 flex-col items-start justify-center gap-1 p-4 text-start"
            :style="{ backgroundColor: COLORS[i % COLORS.length] + '22' }"
          >
            <span class="text-sm font-bold text-neutral-900">{{ c.title }}</span>
            <span v-if="bool('show_count', true)" class="text-xs text-neutral-500"
              >{{ c.count }} products</span
            >
          </span>
          <span class="w-1/2 bg-neutral-200">
            <img :src="c.image" :alt="c.title" class="size-full object-cover" loading="lazy" />
          </span>
        </a>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";
import type { DemoCategory } from "@/data/demo-catalog";
import { DEMO_CATEGORIES } from "@/data/demo-catalog";

const props = defineProps<{ section: PageSection }>();
const { str, num, bool } = useSectionData(() => props.section);

const COLORS = ["#6366f1", "#f59e0b", "#10b981", "#f43f5e"];

const variant = computed(() => str("variant", "grid"));
const cardStyle = computed(() => str("card_style", "overlay"));
const heading = computed(() => str("heading", str("title", "Shop by category")));
// Mosaic is image-led, so it always renders overlay tiles.
const tileStyle = computed(() => (variant.value === "mosaic" ? "overlay" : cardStyle.value));

const cats = computed<DemoCategory[]>(() => {
  if (variant.value === "mosaic") return DEMO_CATEGORIES.slice(0, 4);
  return DEMO_CATEGORIES;
});

const COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
};

const wrapClass = computed(() => {
  const n = Math.min(4, Math.max(1, Math.round(num("columns", 4))));
  if (variant.value === "mosaic") return "grid grid-cols-2 gap-3 md:grid-cols-4 [grid-auto-rows:minmax(9rem,1fr)]";
  if (variant.value === "row")
    return "flex gap-4 overflow-x-auto pb-2 [scrollbar-width:thin]";
  if (tileStyle.value === "pill") return "flex flex-wrap gap-3";
  if (tileStyle.value === "split") return "grid grid-cols-1 gap-4 sm:grid-cols-2";
  return `grid gap-3 sm:gap-4 ${COLS[n]}`;
});

function itemClass(i: number) {
  if (variant.value === "mosaic") return i === 0 ? "col-span-2 row-span-2" : "";
  if (variant.value === "row") {
    if (tileStyle.value === "split") return "w-72 shrink-0";
    if (tileStyle.value === "pill") return "shrink-0";
    return "w-40 shrink-0 sm:w-48";
  }
  if (tileStyle.value === "overlay") return "aspect-square";
  return "";
}

function catHref(c: DemoCategory) {
  return `/collections/${c.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}
</script>
