<template>
  <div>
    <!-- Tiles -->
    <div v-if="variant === 'tiles'" class="grid min-h-[200px] sm:grid-cols-2">
      <div
        v-for="(t, i) in tiles"
        :key="i"
        class="relative flex items-center justify-center overflow-hidden p-10 text-center"
        :class="i === 0 ? 'bg-neutral-900' : 'bg-neutral-100'"
      >
        <img v-if="t.hasImage" :src="t.image" alt="" class="absolute inset-0 size-full object-cover" />
        <div v-if="t.hasImage" class="absolute inset-0 bg-black/45" />
        <div class="relative z-10">
          <h3
            class="text-xl font-bold"
            :class="i === 0 || t.hasImage ? 'text-white' : 'text-neutral-900'"
          >
            {{ t.title }}
          </h3>
          <a
            v-if="t.label"
            :href="t.url"
            class="mt-4 inline-block rounded-md px-6 py-2 text-sm font-semibold transition"
            :class="
              i === 0 || t.hasImage
                ? 'border border-white text-white hover:bg-white/10'
                : 'bg-neutral-900 text-white hover:bg-neutral-800'
            "
          >
            {{ t.label }}
          </a>
        </div>
      </div>
    </div>

    <!-- Images -->
    <div v-else-if="variant === 'images'" class="grid gap-px bg-neutral-200 sm:grid-cols-2">
      <a
        v-for="(t, i) in tiles"
        :key="i"
        :href="t.url"
        class="group relative flex min-h-[260px] items-end overflow-hidden bg-neutral-800 p-6"
      >
        <img
          :src="t.image"
          alt=""
          class="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div class="relative z-10 flex w-full items-center justify-between gap-3">
          <h3 class="text-xl font-bold text-white">{{ t.title }}</h3>
          <span
            v-if="t.label"
            class="shrink-0 rounded-md bg-white px-4 py-2 text-xs font-bold text-neutral-900"
          >
            {{ t.label }}
          </span>
        </div>
      </a>
    </div>

    <!-- Asymmetric -->
    <div
      v-else
      class="grid gap-4 px-4 py-6 md:grid-cols-3 md:px-8"
    >
      <div
        v-for="(t, i) in tiles"
        :key="i"
        class="relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-2xl bg-neutral-900 p-7"
        :class="i === 0 ? 'md:col-span-2' : ''"
      >
        <img v-if="t.hasImage || i === 0" :src="t.image" alt="" class="absolute inset-0 size-full object-cover" />
        <div class="absolute inset-0 bg-black/45" />
        <div class="relative z-10">
          <h3 class="text-xl font-bold text-white md:text-2xl">{{ t.title }}</h3>
          <a
            v-if="t.label"
            :href="t.url"
            class="mt-4 inline-block rounded-md bg-white px-5 py-2 text-xs font-bold text-neutral-900 transition hover:bg-neutral-100"
          >
            {{ t.label }}
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

const first = (fallback: string, ...keys: string[]) => {
  for (const k of keys) {
    const v = str(k);
    if (v) return v;
  }
  return fallback;
};

const variant = computed(() => str("variant", "tiles"));

const tiles = computed(() => {
  const img1 = str("image_url");
  const img2 = str("image2_url");
  return [
    {
      title: first("New collection", "headline", "heading1"),
      label: first("Shop now", "cta_label", "button1"),
      url: str("cta_url") || "#",
      image: img1 || "/img/collection-01.png",
      hasImage: !!img1,
    },
    {
      title: first("Sale items", "headline2", "heading2"),
      label: first("View sale", "cta2_label", "button2"),
      url: str("cta2_url") || "#",
      image: img2 || "/img/collection-02.png",
      hasImage: !!img2,
    },
  ];
});
</script>
