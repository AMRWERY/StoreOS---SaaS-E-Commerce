<template>
  <div class="px-8 py-10">
    <div
      class="mx-auto max-w-5xl"
      :class="[
        'flex',
        bool('stack_mobile', true) ? 'flex-col sm:flex-row' : 'flex-row flex-wrap',
        justifyClass,
        variant === 'bar' ? 'w-fit overflow-hidden rounded-2xl border border-neutral-200 bg-white' : '',
        variant === 'bar' && str('align', 'center') === 'center' ? 'sm:mx-auto' : '',
        variant === 'bar' && str('align', 'center') === 'right' ? 'sm:ms-auto' : '',
      ]"
      :style="variant === 'bar' ? undefined : { gap: `${num('gap', 12)}px` }"
    >
      <a
        v-for="(btn, i) in list('buttons')"
        :key="i"
        :href="btn.url || '#'"
        class="inline-flex items-center justify-center gap-2 font-semibold transition-colors"
        :class="[sizeClass, variant === 'bar' ? barClass(i) : [shapeClass, styleClass(btn.style)]]"
      >
        <Icon v-if="btn.icon" :name="btn.icon" />
        {{ btn.label }}
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, num, bool, list } = useSectionData(() => props.section);

const variant = computed(() => str("variant", "rounded"));

const justifyClass = computed(
  () =>
    ({
      left: "sm:justify-start",
      center: "sm:justify-center",
      right: "sm:justify-end",
    })[str("align", "center")] ?? "sm:justify-center",
);

const SIZES: Record<string, string> = {
  sm: "px-3.5 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};
const sizeClass = computed(() => SIZES[str("size", "md")] ?? SIZES.md);

const shapeClass = computed(() => (variant.value === "pills" ? "rounded-full" : "rounded-xl"));

const STYLES: Record<string, string> = {
  primary: "bg-indigo-600 text-white",
  secondary: "bg-neutral-100 text-neutral-900",
  outline: "border border-neutral-300 bg-white text-neutral-900",
  link: "text-indigo-600 underline underline-offset-4",
};
const styleClass = (style: string) => STYLES[style] ?? STYLES.primary;

// Joined bar: segments divided by borders; the first button keeps its filled style.
const barClass = (i: number) =>
  `${i === 0 ? "bg-indigo-600 text-white" : "text-neutral-900"} ${i > 0 ? "border-t border-neutral-200 sm:border-s sm:border-t-0" : ""}`;
</script>
