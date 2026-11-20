<template>
  <div class="px-8 py-14">
    <div class="mx-auto max-w-6xl">
      <div class="flex flex-col items-center gap-3 text-center">
        <h2 v-if="str('heading')" class="text-2xl font-bold text-neutral-900">
          {{ str("heading") }}
        </h2>
        <div class="flex items-center gap-3">
          <span v-if="str('handle')" class="text-sm font-medium text-neutral-500">
            {{ str("handle") }}
          </span>
          <a
            v-if="str('follow_label')"
            :href="str('follow_url') || '#'"
            class="rounded-xl bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white"
          >
            {{ str("follow_label") }}
          </a>
        </div>
      </div>

      <div
        class="mt-8"
        :class="wrapClass"
        :style="{ gap: `${num('gap', 8)}px` }"
      >
        <a
          v-for="(photo, i) in photos"
          :key="i"
          :href="photo.link || '#'"
          class="group relative block overflow-hidden bg-neutral-100"
          :class="tileClass(i)"
        >
          <img :src="photo.image" alt="" class="size-full object-cover" />
          <span
            class="absolute inset-0 flex items-center justify-center bg-neutral-900/40 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Icon name="ph:heart-fill" class="text-2xl text-white" />
          </span>
        </a>
      </div>

      <div v-if="platforms.length" class="mt-8 flex flex-wrap items-center justify-center gap-2">
        <a
          v-for="p in platforms"
          :key="p.key"
          :href="p.url"
          :aria-label="p.key"
          class="inline-flex size-10 items-center justify-center rounded-xl border border-neutral-200 text-neutral-700"
        >
          <Icon :name="p.icon" class="text-lg" />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, num, list } = useSectionData(() => props.section);

const FALLBACK = [1, 2, 3, 4, 5, 6].map((n) => ({
  image: `/img/collection-0${n}.png`,
  link: "",
}));

const variant = computed(() => str("variant", "grid"));

const photos = computed<Record<string, any>[]>(() => {
  const custom = list("images").filter((p) => p.image);
  return custom.length ? custom : FALLBACK;
});

const gridClass = computed(
  () =>
    ({
      3: "grid-cols-3",
      4: "grid-cols-2 sm:grid-cols-4",
      5: "grid-cols-3 sm:grid-cols-5",
      6: "grid-cols-3 sm:grid-cols-6",
    })[num("columns", 6)] ?? "grid-cols-3 sm:grid-cols-6",
);

const wrapClass = computed(() => {
  if (variant.value === "circles") return "flex snap-x gap-4 overflow-x-auto pb-2 sm:justify-center";
  if (variant.value === "mosaic") return `grid grid-flow-dense ${gridClass.value}`;
  return `grid ${gridClass.value}`;
});

const tileClass = (i: number) => {
  if (variant.value === "circles") return "size-24 shrink-0 snap-start rounded-full ring-2 ring-indigo-600 ring-offset-2 sm:size-28";
  if (variant.value === "mosaic") return i === 0 ? "col-span-2 row-span-2 rounded-2xl" : "aspect-square rounded-lg";
  return "aspect-square rounded-xl";
};

const PLATFORM_ICONS: Record<string, string> = {
  instagram: "ph:instagram-logo-bold",
  tiktok: "ph:tiktok-logo-bold",
  facebook: "ph:facebook-logo-bold",
  x: "ph:x-logo-bold",
  youtube: "ph:youtube-logo-bold",
};

const platforms = computed(() =>
  Object.entries(PLATFORM_ICONS)
    .map(([key, icon]) => ({ key, icon, url: str(key).trim() }))
    .filter((p) => p.url.startsWith("https://") || p.url.startsWith("http://")),
);
</script>
