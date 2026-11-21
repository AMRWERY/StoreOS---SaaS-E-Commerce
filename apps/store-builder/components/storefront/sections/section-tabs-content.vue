<template>
  <div class="px-8 py-14">
    <div class="mx-auto" :class="vertical ? 'max-w-4xl' : 'max-w-3xl'">
      <h2 v-if="str('heading')" class="text-center text-2xl font-bold text-neutral-900">
        {{ str("heading") }}
      </h2>

      <div class="mt-8" :class="vertical ? 'flex flex-col gap-6 md:flex-row' : ''">
        <div
          role="tablist"
          class="flex gap-1"
          :class="listClass"
        >
          <button
            v-for="(tab, i) in tabs"
            :key="i"
            type="button"
            role="tab"
            :aria-selected="i === activeIndex"
            class="text-sm font-semibold transition-colors"
            :class="tabClass(i === activeIndex)"
            @click="active = i"
          >
            {{ tab.title }}
          </button>
        </div>

        <div
          v-if="tabs.length"
          class="space-y-4 text-sm leading-relaxed text-neutral-600"
          :class="vertical ? 'flex-1 rounded-2xl border border-neutral-200 bg-white p-6' : 'mt-6'"
          role="tabpanel"
        >
          <p v-for="(p, i) in paragraphs" :key="i">{{ p }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, num, list } = useSectionData(() => props.section);

const tabs = computed(() => list("items"));
const variant = computed(() => str("variant", "underline"));
const pills = computed(() => variant.value === "pills");
const vertical = computed(() => variant.value === "vertical");

const listClass = computed(() => {
  if (vertical.value) return "flex-row flex-wrap md:w-52 md:shrink-0 md:flex-col md:flex-nowrap";
  return pills.value ? "flex-wrap justify-center" : "flex-wrap border-b border-neutral-200";
});

// null = follow the "default tab" setting until the visitor clicks a tab.
const picked = ref<number | null>(null);
const active = computed({
  get: () => picked.value ?? Math.round(num("defaultTab", 1)) - 1,
  set: (v: number) => (picked.value = v),
});
const activeIndex = computed(() => Math.min(Math.max(active.value, 0), Math.max(tabs.value.length - 1, 0)));

const paragraphs = computed(() =>
  String(tabs.value[activeIndex.value]?.content ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean),
);

const tabClass = (isActive: boolean): string => {
  if (pills.value) {
    return `rounded-full px-4 py-2 ${isActive ? "bg-indigo-600 text-white" : "text-neutral-600 hover:bg-neutral-100"}`;
  }
  if (vertical.value) {
    return `rounded-xl px-4 py-2.5 text-start ${isActive ? "bg-indigo-50 text-indigo-600" : "text-neutral-600 hover:bg-neutral-50"}`;
  }
  return `-mb-px border-b-2 px-4 py-2.5 ${isActive ? "border-indigo-600 text-indigo-600" : "border-transparent text-neutral-500 hover:text-neutral-900"}`;
}
</script>
