<template>
  <div class="px-8 py-14">
    <div class="mx-auto max-w-5xl">
      <div :class="align === 'center' ? 'text-center' : 'text-start'">
        <h2 v-if="str('heading')" class="text-2xl font-bold text-neutral-900">
          {{ str("heading") }}
        </h2>
        <p v-if="str('subheading')" class="mt-2 text-sm text-neutral-500">
          {{ str("subheading") }}
        </p>
      </div>

      <div class="mt-10 grid gap-6" :class="gridClass">
        <div
          v-for="(item, i) in list('items')"
          :key="i"
          class="rounded-2xl border border-neutral-200 bg-white p-6"
          :class="align === 'center' ? 'text-center' : 'text-start'"
        >
          <div
            class="inline-flex size-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"
          >
            <Icon :name="item.icon || 'ph:star-bold'" class="text-xl" />
          </div>
          <h3 class="mt-4 text-sm font-bold text-neutral-900">
            {{ item.title }}
          </h3>
          <p class="mt-1.5 text-sm leading-relaxed text-neutral-500">
            {{ item.text }}
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

const align = computed(() => str("align", "center"));
const gridClass = computed(
  () =>
    ({
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-3",
      4: "grid-cols-2 sm:grid-cols-4",
    })[num("columns", 3)] ?? "grid-cols-1 sm:grid-cols-3",
);
</script>
