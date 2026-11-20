<template>
  <div class="px-8 py-14">
    <div class="mx-auto max-w-4xl">
      <div v-if="str('heading') || str('subheading')" class="mb-8 text-center">
        <h2 v-if="str('heading')" class="text-2xl font-bold text-neutral-900">
          {{ str("heading") }}
        </h2>
        <p v-if="str('subheading')" class="mt-2 text-sm text-neutral-500">
          {{ str("subheading") }}
        </p>
      </div>

      <ul :class="listClass">
        <li v-for="(item, i) in list('items')" :key="i" :class="itemClass">
          <span
            class="flex shrink-0 items-center justify-center"
            :class="[circle ? 'size-8 rounded-full' : 'size-6', top ? 'mx-auto' : '']"
            :style="iconStyle"
          >
            <Icon :name="item.icon || 'ph:check-bold'" class="text-lg" />
          </span>
          <div>
            <h3 class="text-sm font-bold text-neutral-900" :class="top ? 'mt-3' : ''">{{ item.title }}</h3>
            <p v-if="item.text" class="mt-0.5 text-sm leading-relaxed text-neutral-500">{{ item.text }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, list } = useSectionData(() => props.section);

const variant = computed(() => str("variant", "checklist"));
const top = computed(() => variant.value === "icon-top");
const circle = computed(() => str("iconStyle", "circle") === "circle");
const color = computed(() => str("iconColor", "#4f46e5"));
// Circle uses a translucent tint of the chosen color behind the glyph.
const iconStyle = computed(() => ({
  color: color.value,
  ...(circle.value ? { backgroundColor: `color-mix(in srgb, ${color.value} 12%, transparent)` } : {}),
}));

const itemClass = computed(() => {
  if (variant.value === "cards") return "flex items-start gap-3 rounded-2xl border border-neutral-200 bg-white p-4";
  if (top.value) return "rounded-2xl p-4 text-center";
  return "flex items-start gap-3";
});

const listClass = computed(() => {
  const inline = str("layout", "two") === "inline";
  if (inline) return "flex flex-wrap justify-center gap-4";
  const gap = variant.value === "checklist" ? "gap-x-10 gap-y-5" : "gap-4";
  return (
    ({
      one: `mx-auto grid max-w-xl grid-cols-1 ${gap}`,
      two: `grid grid-cols-1 ${gap} sm:grid-cols-2`,
    })[str("layout", "two")] ?? `grid grid-cols-1 ${gap} sm:grid-cols-2`
  );
});
</script>
