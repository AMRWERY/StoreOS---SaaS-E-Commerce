<template>
  <div class="px-4 py-8 sm:px-8">
    <div class="mx-auto max-w-5xl">
      <nav v-if="bool('showBreadcrumb')" class="mb-4 flex items-center gap-2 text-xs text-neutral-500">
        <span>{{ str("homeLabel") }}</span>
        <Icon name="ph:caret-right-bold" class="rtl:rotate-180" />
        <span class="font-medium text-neutral-900">{{ str("title") }}</span>
      </nav>

      <div :class="frameClass">
        <template v-if="mode === 'banner'">
          <img :src="bannerSrc" alt="" class="absolute inset-0 size-full object-cover" />
          <div class="absolute inset-0 bg-black" :style="{ opacity: num('overlay', 40) / 100 }" />
        </template>

        <div class="relative w-full" :class="[textClass, align === 'center' ? 'text-center' : 'text-start']">
          <h1 class="font-bold" :class="mode === 'minimal' ? 'text-4xl tracking-tight' : 'text-3xl'">
            {{ str("title") }}
          </h1>
          <p
            v-if="str('description')"
            class="mt-2 max-w-2xl text-sm"
            :class="[mode === 'banner' ? 'text-white/80' : 'text-neutral-500', align === 'center' ? 'mx-auto' : '']"
          >
            {{ str("description") }}
          </p>
          <p
            v-if="bool('showCount') && str('countText')"
            class="mt-3 text-xs font-medium"
            :class="mode === 'banner' ? 'text-white/70' : 'text-neutral-400'"
          >
            {{ str("countText") }}
          </p>
        </div>

        <div v-if="mode === 'split'" class="relative min-h-48 md:order-last">
          <img :src="bannerSrc" alt="" class="absolute inset-0 size-full object-cover" />
          <div class="absolute inset-0 bg-black" :style="{ opacity: num('overlay', 40) / 200 }" />
        </div>
      </div>

      <div
        v-if="bool('showPills') && list('pills').length"
        class="mt-4 flex flex-wrap gap-2"
        :class="align === 'center' ? 'justify-center' : ''"
      >
        <button
          v-for="(pill, i) in list('pills')"
          :key="i"
          type="button"
          class="rounded-full border px-4 py-1.5 text-xs font-medium"
          :class="activePill === i ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-neutral-200 text-neutral-900'"
          @click="activePill = activePill === i ? -1 : i"
        >
          {{ pill.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, num, bool, list } = useSectionData(() => props.section);

const activePill = ref(-1);
const align = computed(() => str("align", "start"));
const bannerSrc = computed(() => str("bannerImage") || "/img/hero-banner.png");

/** Without a banner, banner/split fall back to a plain text card. */
const mode = computed(() => {
  const v = str("variant", "banner");
  if (v === "minimal" || !bool("showBanner")) return v === "minimal" ? "minimal" : "plain";
  return v;
});
const frameClass = computed(
  () =>
    ({
      banner: "relative flex min-h-48 items-end overflow-hidden rounded-2xl text-white",
      split: "grid overflow-hidden rounded-2xl border border-neutral-200 md:grid-cols-2",
      plain: "relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 text-neutral-900",
      minimal: "relative border-b border-neutral-200 pb-6 text-neutral-900",
    })[mode.value] ?? "",
);
const textClass = computed(
  () =>
    ({
      banner: "p-6 sm:p-8",
      split: "flex flex-col justify-center p-6 text-neutral-900 sm:p-10",
      plain: "p-6 sm:p-8",
      minimal: "",
    })[mode.value] ?? "",
);
</script>
