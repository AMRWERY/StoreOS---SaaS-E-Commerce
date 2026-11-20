<template>
  <div class="px-8 py-14">
    <div class="mx-auto max-w-5xl">
      <div class="text-center">
        <h2 v-if="str('heading')" class="text-2xl font-bold text-neutral-900">
          {{ str("heading") }}
        </h2>
        <p v-if="str('subheading')" class="mt-2 text-sm text-neutral-500">
          {{ str("subheading") }}
        </p>
      </div>

      <!-- Vertical rail -->
      <ol v-if="variant === 'vertical'" class="mx-auto mt-10 max-w-xl">
        <li v-for="(item, i) in items" :key="i" class="relative flex gap-4 pb-8 last:pb-0">
          <span
            v-if="i < items.length - 1"
            class="absolute start-5 top-10 bottom-0 w-px bg-neutral-200"
            aria-hidden="true"
          />
          <span class="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
            {{ i + 1 }}
          </span>
          <div class="pt-1.5">
            <h3 class="flex items-center gap-2 text-sm font-bold text-neutral-900">
              <Icon v-if="showIcons" :name="item.icon || 'ph:star-bold'" class="text-lg text-indigo-600" />
              {{ item.title }}
            </h3>
            <p class="mt-1 text-sm leading-relaxed text-neutral-500">{{ item.text }}</p>
          </div>
        </li>
      </ol>

      <!-- Boxed cards with oversized number -->
      <ol v-else-if="variant === 'cards'" class="mt-10 grid gap-6" :class="cardGrid">
        <li
          v-for="(item, i) in items"
          :key="i"
          class="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6"
        >
          <span class="absolute end-4 top-2 text-6xl font-bold text-neutral-100" aria-hidden="true">{{ i + 1 }}</span>
          <div
            v-if="showIcons"
            class="relative inline-flex size-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"
          >
            <Icon :name="item.icon || 'ph:star-bold'" class="text-xl" />
          </div>
          <h3 class="relative mt-4 text-sm font-bold text-neutral-900">{{ item.title }}</h3>
          <p class="relative mt-1.5 text-sm leading-relaxed text-neutral-500">{{ item.text }}</p>
        </li>
      </ol>

      <!-- Horizontal timeline -->
      <ol v-else class="relative mt-10 grid gap-8 sm:grid-flow-col sm:auto-cols-fr">
        <li v-for="(item, i) in items" :key="i" class="relative text-center">
          <span
            v-if="i < items.length - 1"
            class="absolute start-1/2 top-5 hidden h-px w-full bg-neutral-200 sm:block"
            aria-hidden="true"
          />
          <span class="relative z-10 mx-auto flex size-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white ring-8 ring-white">
            {{ i + 1 }}
          </span>
          <Icon v-if="showIcons" :name="item.icon || 'ph:star-bold'" class="mt-4 text-2xl text-indigo-600" />
          <h3 class="mt-2 text-sm font-bold text-neutral-900">{{ item.title }}</h3>
          <p class="mx-auto mt-1.5 max-w-xs text-sm leading-relaxed text-neutral-500">{{ item.text }}</p>
        </li>
      </ol>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";

const props = defineProps<{ section: PageSection }>();
const { str, bool, list } = useSectionData(() => props.section);

const items = computed(() => list("items"));
const variant = computed(() => str("variant", "horizontal"));
const showIcons = computed(() => bool("showIcons", true));
const cardGrid = computed(() =>
  items.value.length >= 4 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-3",
);
</script>
