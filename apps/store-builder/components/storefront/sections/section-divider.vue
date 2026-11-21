<template>
  <div class="px-4 py-6 sm:px-8" role="separator" aria-orientation="horizontal">
    <div class="mx-auto w-full" :class="widthClass">
      <!-- ornament: line - icon - line -->
      <div
        v-if="lineStyle === 'ornament'"
        class="flex items-center gap-4 text-neutral-300"
        :style="colorStyle"
      >
        <span class="h-0 flex-1 border-t" :style="lineStyleObj('solid')" />
        <Icon name="ph:diamond-fill" class="shrink-0 text-xs" />
        <span class="h-0 flex-1 border-t" :style="lineStyleObj('solid')" />
      </div>

      <!-- gradient fade -->
      <div
        v-else-if="lineStyle === 'gradient'"
        class="text-neutral-300"
        :style="{
          ...colorStyle,
          height: `${thickness}px`,
          backgroundImage:
            'linear-gradient(to right, transparent, currentColor, transparent)',
        }"
      />

      <!-- solid / dashed / dotted -->
      <hr
        v-else
        class="h-0 border-0 border-t text-neutral-200"
        :style="lineStyleObj(lineStyle)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, num } = useSectionData(() => props.section);

const lineStyle = computed(() => str("style", str("variant", "solid")));
const thickness = computed(() => Math.max(1, num("thickness", 1)));
// Empty = follow the theme (neutral utility); a chosen colour is applied inline.
const customColor = computed(() => str("color", ""));
const colorStyle = computed(() =>
  customColor.value ? { color: customColor.value } : {},
);

const widthClass = computed(() => {
  switch (str("width", "full")) {
    case "narrow":
      return "max-w-sm";
    case "medium":
      return "max-w-2xl";
    default:
      return "";
  }
});

const lineStyleObj = (kind: string) => {
  return {
    borderTopWidth: `${thickness.value}px`,
    borderTopStyle: kind === "dashed" || kind === "dotted" ? kind : "solid",
    ...(customColor.value ? { borderColor: customColor.value } : {}),
  } as Record<string, string>;
}
</script>
