<template>
  <div class="px-8 py-14">
    <div class="mx-auto max-w-5xl">
      <h2 v-if="str('heading')" class="mb-8 text-2xl font-bold text-neutral-900" :class="alignClass">
        {{ str("heading") }}
      </h2>

      <div :class="containerClass">
        <div
          v-for="(col, i) in columns"
          :key="i"
          :class="itemClass(i)"
        >
          <img
            v-if="col.image"
            :src="col.image"
            :alt="col.heading || ''"
            class="rounded-xl object-cover"
            :class="rows ? 'aspect-video w-full md:w-1/2 md:shrink-0' : 'mb-4 aspect-video w-full'"
          />
          <div :class="rows ? 'flex-1' : ''">
            <h3 v-if="col.heading" class="text-base font-bold text-neutral-900">{{ col.heading }}</h3>
            <p v-if="col.text" class="mt-2 text-sm leading-relaxed text-neutral-500">{{ col.text }}</p>
            <a
              v-if="col.linkLabel"
              :href="col.linkUrl || '#'"
              class="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              {{ col.linkLabel }}
              <Icon name="ph:arrow-right-bold" class="rtl:rotate-180" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, bool, list } = useSectionData(() => props.section);

const variant = computed(() => str("variant", "plain"));
const rows = computed(() => variant.value === "feature-rows");
const columns = computed(() => list("items").slice(0, 4));
const divider = computed(() => bool("divider", false));
const alignClass = computed(() => (str("align", "left") === "center" ? "text-center" : "text-start"));

const containerClass = computed(() => {
  if (rows.value) return "flex flex-col gap-8";
  const grid =
    ({
      1: "grid-cols-1 max-w-2xl mx-auto",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    })[columns.value.length] ?? "grid-cols-1 sm:grid-cols-3";
  return `grid gap-8 ${grid}`;
});

function itemClass(i: number): string {
  if (rows.value) {
    // Alternate image side on wide screens; text always reads start-aligned.
    return `flex flex-col gap-6 text-start md:items-center ${i % 2 ? "md:flex-row-reverse" : "md:flex-row"}`;
  }
  if (variant.value === "cards") {
    return `rounded-2xl border border-neutral-200 bg-white p-6 ${alignClass.value}`;
  }
  return `${alignClass.value} ${divider.value && i > 0 ? "sm:border-s sm:border-neutral-200 sm:ps-8" : ""}`;
}
</script>
