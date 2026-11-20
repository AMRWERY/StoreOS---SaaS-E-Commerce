<template>
  <div :class="variant === 'floating-card' ? '' : 'px-4 py-8 sm:px-8'">
    <!-- Split: colored text panel + image -->
    <div
      v-if="variant === 'split'"
      class="mx-auto grid max-w-5xl overflow-hidden rounded-2xl"
      :class="image ? 'md:grid-cols-2' : ''"
      :style="colorStyle"
    >
      <div class="flex flex-col gap-3" :class="[sizeClass, textAlign]">
        <h2 v-if="str('heading')" class="text-2xl font-bold sm:text-3xl">{{ str("heading") }}</h2>
        <p v-if="str('text')" class="text-sm leading-relaxed opacity-90">{{ str("text") }}</p>
        <div v-if="buttons.length" class="mt-3 flex flex-wrap gap-3" :class="center && !image ? 'justify-center' : ''">
          <a v-for="b in buttons" :key="b.label" :href="b.url" :class="b.class">{{ b.label }}</a>
        </div>
      </div>
      <img v-if="image" :src="image" alt="" class="h-56 w-full object-cover md:h-full" />
    </div>

    <!-- Floating card: full-bleed backdrop with a white card -->
    <div
      v-else-if="variant === 'floating-card'"
      class="relative bg-cover bg-center px-4 py-14 sm:px-8"
      :style="backdropStyle"
    >
      <div v-if="image" class="absolute inset-0 bg-black" :style="{ opacity: overlayOpacity }" />
      <div class="relative mx-auto max-w-2xl rounded-2xl border border-neutral-200 bg-white p-8 text-neutral-900 sm:p-10" :class="textAlign">
        <h2 v-if="str('heading')" class="text-2xl font-bold sm:text-3xl">{{ str("heading") }}</h2>
        <p v-if="str('text')" class="mt-3 text-sm leading-relaxed text-neutral-500">{{ str("text") }}</p>
        <div v-if="buttons.length" class="mt-6 flex flex-wrap gap-3" :class="center ? 'justify-center' : ''">
          <a v-for="b in buttons" :key="b.label" :href="b.url" :class="b.class">{{ b.label }}</a>
        </div>
      </div>
    </div>

    <!-- Centered: boxed band -->
    <div
      v-else
      class="relative mx-auto max-w-5xl overflow-hidden rounded-2xl bg-cover bg-center"
      :class="sizeClass"
      :style="backdropStyle"
    >
      <div v-if="image" class="absolute inset-0 bg-black" :style="{ opacity: overlayOpacity }" />
      <div class="relative flex flex-col gap-3" :class="center ? 'items-center text-center' : 'items-start text-start'">
        <h2 v-if="str('heading')" class="max-w-2xl text-2xl font-bold sm:text-3xl">{{ str("heading") }}</h2>
        <p v-if="str('text')" class="max-w-xl text-sm leading-relaxed opacity-90">{{ str("text") }}</p>
        <div v-if="buttons.length" class="mt-3 flex flex-wrap gap-3" :class="center ? 'justify-center' : ''">
          <a v-for="b in buttons" :key="b.label" :href="b.url" :class="b.class">{{ b.label }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, num } = useSectionData(() => props.section);

const variant = computed(() => str("variant", "centered"));
const image = computed(() => str("backgroundImage"));
const center = computed(() => str("align", "center") === "center");
const textAlign = computed(() => (center.value ? "text-center" : "text-start"));
const overlayOpacity = computed(() => Math.min(Math.max(num("overlay", 50), 0), 100) / 100);
const sizeClass = computed(
  () =>
    ({
      sm: "px-6 py-8",
      md: "px-8 py-14",
      lg: "px-8 py-20 sm:py-28",
    })[str("size", "md")] ?? "px-8 py-14",
);

const colorStyle = computed(() => ({
  backgroundColor: str("backgroundColor", "#4f46e5"),
  color: str("textColor", "#ffffff"),
}));
const backdropStyle = computed(() => ({
  ...colorStyle.value,
  ...(image.value ? { backgroundImage: `url("${image.value}")` } : {}),
}));

const BTN = "inline-flex items-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors";
const buttons = computed(() => {
  const onCard = variant.value === "floating-card";
  const out: { label: string; url: string; class: string }[] = [];
  if (str("primaryLabel")) {
    out.push({
      label: str("primaryLabel"),
      url: str("primaryUrl", "#"),
      class: `${BTN} ${onCard ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-white text-neutral-900 hover:bg-neutral-100"}`,
    });
  }
  if (str("secondaryLabel")) {
    out.push({
      label: str("secondaryLabel"),
      url: str("secondaryUrl", "#"),
      class: `${BTN} border ${onCard ? "border-neutral-200 text-neutral-900 hover:bg-neutral-50" : "border-current hover:opacity-80"}`,
    });
  }
  return out;
});
</script>
