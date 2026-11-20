<template>
  <div class="border-t border-neutral-200 px-4 py-10 sm:px-8">
    <p
      v-if="heading"
      class="mb-8 text-center text-xs font-bold tracking-widest text-neutral-400"
    >
      {{ heading }}
    </p>

    <!-- marquee -->
    <div v-if="marquee" class="logo-marquee mx-auto max-w-6xl overflow-hidden">
      <ul class="logo-track flex w-max items-center gap-12" :class="filterClass">
        <li
          v-for="(logo, i) in looped"
          :key="i"
          :aria-hidden="i >= logos.length ? 'true' : undefined"
          class="shrink-0"
        >
          <div :class="tileClass">
            <img
              v-if="logo.url"
              :src="logo.url"
              :alt="logo.name"
              loading="lazy"
              class="h-8 w-auto max-w-32 object-contain"
            />
            <span v-else :class="placeholderClass">{{ logo.name }}</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- grid -->
    <ul
      v-else-if="variant === 'grid'"
      class="mx-auto grid max-w-4xl grid-cols-2 items-center justify-items-center gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-4"
      :class="filterClass"
    >
      <li v-for="(logo, i) in logos" :key="i">
        <div :class="tileClass">
          <img
            v-if="logo.url"
            :src="logo.url"
            :alt="logo.name"
            loading="lazy"
            class="h-8 w-auto max-w-32 object-contain"
          />
          <span v-else :class="placeholderClass">{{ logo.name }}</span>
        </div>
      </li>
    </ul>

    <!-- row / boxed -->
    <ul
      v-else
      class="mx-auto flex max-w-5xl flex-wrap items-center justify-center"
      :class="[variant === 'boxed' ? 'gap-3' : 'gap-x-10 gap-y-6', filterClass]"
    >
      <li v-for="(logo, i) in logos" :key="i">
        <div :class="tileClass">
          <img
            v-if="logo.url"
            :src="logo.url"
            :alt="logo.name"
            loading="lazy"
            class="h-8 w-auto max-w-32 object-contain"
          />
          <span v-else :class="placeholderClass">{{ logo.name }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

interface LogoItem {
  url: string;
  name: string;
}

const props = defineProps<{ section: PageSection }>();
const { str, num, bool, list } = useSectionData(() => props.section);

const heading = computed(() => str("heading", str("title", "As seen in")));
const variant = computed(() => str("variant", "row"));
const marquee = computed(() => bool("marquee", false));
const filterClass = computed(() =>
  bool("grayscale", true) ? "opacity-60 grayscale" : "",
);

const tileClass = computed(() =>
  variant.value === "boxed"
    ? "flex h-14 min-w-28 items-center justify-center rounded-lg border border-neutral-200 bg-white px-4"
    : "flex h-10 items-center justify-center",
);
const placeholderClass =
  "rounded bg-neutral-100 px-4 py-2 text-xs font-bold tracking-wide text-neutral-500";

const logos = computed<LogoItem[]>(() => {
  const rows = [...list<any>("logos"), ...list<any>("items")];
  if (rows.length) {
    return rows.map((r, i) =>
      typeof r === "string"
        ? { url: r, name: `Logo ${i + 1}` }
        : {
            url: String(r.url ?? r.image ?? r.src ?? ""),
            name: String(r.name ?? r.title ?? r.alt ?? `Logo ${i + 1}`),
          },
    );
  }
  // No rows yet: neutral placeholder tiles, `logo_count` of them.
  const count = Math.min(Math.max(num("logo_count", 6), 1), 12);
  return Array.from({ length: count }, (_, i) => ({
    url: "",
    name: `Brand ${i + 1}`,
  }));
});

// Duplicated once so the marquee loops seamlessly.
const looped = computed(() => [...logos.value, ...logos.value]);
</script>

<style scoped>
.logo-track {
  animation: logo-scroll 30s linear infinite;
}
.logo-marquee:hover .logo-track {
  animation-play-state: paused;
}
:dir(rtl) .logo-track {
  animation-name: logo-scroll-rtl;
}
@keyframes logo-scroll {
  to {
    transform: translateX(-50%);
  }
}
@keyframes logo-scroll-rtl {
  to {
    transform: translateX(50%);
  }
}
@media (prefers-reduced-motion: reduce) {
  .logo-track {
    animation: none;
  }
}
</style>
