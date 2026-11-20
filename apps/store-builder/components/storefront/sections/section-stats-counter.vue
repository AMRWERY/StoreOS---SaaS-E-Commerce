<template>
  <div :class="[wrapperClass, dark ? 'bg-neutral-900' : 'bg-white']">
    <div :class="variant === 'divided-band' ? 'mx-auto max-w-6xl' : 'mx-auto max-w-5xl'">
      <div v-if="str('heading') || str('subheading')" class="mb-10 text-center">
        <h2 v-if="str('heading')" class="text-2xl font-bold" :class="dark ? 'text-white' : 'text-neutral-900'">
          {{ str("heading") }}
        </h2>
        <p v-if="str('subheading')" class="mt-2 text-sm" :class="dark ? 'text-neutral-400' : 'text-neutral-500'">
          {{ str("subheading") }}
        </p>
      </div>
      <div class="grid" :class="[gridClass, variant === 'divided-band' ? 'gap-y-8' : 'gap-6']">
        <div v-for="(item, i) in list('items')" :key="i" :class="[itemClass, dividerClass(i)]">
          <div class="text-4xl font-bold tabular-nums" :class="dark ? 'text-white' : 'text-indigo-600'">
            {{ item.prefix }}{{ display(item.value) }}{{ item.suffix }}
          </div>
          <p class="mt-1.5 text-sm" :class="dark ? 'text-neutral-400' : 'text-neutral-500'">
            {{ item.label }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, num, list } = useSectionData(() => props.section);

const variant = computed(() => str("variant", "plain"));
const dark = computed(() => str("style", "light") === "dark");
const columns = computed(() => num("columns", 4));
const gridClass = computed(
  () =>
    ({
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-3",
      4: "grid-cols-2 sm:grid-cols-4",
    })[columns.value] ?? "grid-cols-2 sm:grid-cols-4",
);

const wrapperClass = computed(() => (variant.value === "divided-band" ? "px-8 py-12 border-y border-neutral-200" : "px-8 py-14"));
const itemClass = computed(() => {
  if (variant.value === "cards") {
    return `rounded-2xl border p-6 text-center ${dark.value ? "border-neutral-700 bg-neutral-800" : "border-neutral-200 bg-neutral-50"}`;
  }
  return "text-center";
});

// Divided band: vertical separators between items (reset at each row start on small screens).
function dividerClass(i: number): string {
  if (variant.value !== "divided-band" || i === 0) return "";
  const color = dark.value ? "sm:border-neutral-700" : "sm:border-neutral-200";
  return `sm:border-s ${color}`;
}

// Count-up: progress runs 0 -> 1 once on mount (SSR renders final values).
const progress = ref(1);
let raf = 0;

function display(value: unknown): string {
  const n = Number(value);
  if (!Number.isFinite(n)) return String(value ?? "");
  return Math.round(n * progress.value).toLocaleString("en-US");
}

onMounted(() => {
  const duration = 1500;
  const start = performance.now();
  progress.value = 0;
  const tick = (now: number) => {
    const t = Math.min((now - start) / duration, 1);
    progress.value = 1 - Math.pow(1 - t, 3);
    if (t < 1) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
});

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf);
});
</script>
