<template>
  <div class="px-4 py-10 sm:px-8">
    <div class="mx-auto max-w-5xl">
      <div :class="isMinimal ? 'mx-auto max-w-2xl text-center' : ''">
        <h1
          v-if="str('heading')"
          class="font-bold text-neutral-900"
          :class="isMinimal ? 'text-4xl tracking-tight' : 'text-start text-2xl'"
        >
          {{ str("heading") }}
        </h1>

        <div class="relative mt-4">
          <Icon name="ph:magnifying-glass-bold" class="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            v-model="query"
            type="search"
            :placeholder="str('placeholder')"
            class="w-full border border-neutral-200 bg-white pe-4 ps-11 text-neutral-900"
            :class="isMinimal ? 'rounded-full py-4 text-base' : 'rounded-xl py-3 text-sm'"
          />
        </div>

        <div
          v-if="bool('showSuggestions') && list('suggestions').length"
          class="mt-3 flex flex-wrap items-center gap-2"
          :class="isMinimal ? 'justify-center' : ''"
        >
          <span v-if="str('suggestionsLabel')" class="text-xs text-neutral-500">{{ str("suggestionsLabel") }}</span>
          <button
            v-for="(s, i) in list('suggestions')"
            :key="i"
            type="button"
            class="rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-900"
            @click="query = String(s.label ?? '')"
          >
            {{ s.label }}
          </button>
        </div>
      </div>

      <p class="mt-6 text-sm text-neutral-500" :class="isMinimal ? 'text-center' : 'text-start'">
        {{ results.length }} / {{ DEMO_PRODUCTS.length }}
        <template v-if="query.trim()"> - "{{ query.trim() }}"</template>
      </p>

      <div v-if="results.length" class="mt-4" :class="ui.wrap">
        <article v-for="p in results" :key="p.id" :class="ui.card">
          <div v-if="variant !== 'minimal'" class="bg-neutral-50" :class="ui.img">
            <img :src="p.image" :alt="p.title" class="size-full object-cover" />
          </div>
          <div class="flex text-start" :class="ui.body">
            <div class="min-w-0 flex-1">
              <p class="text-[11px] text-neutral-400">{{ p.category }}</p>
              <h3 class="text-sm font-semibold text-neutral-900">{{ p.title }}</h3>
              <div v-if="bool('showRating')" class="mt-1 flex items-center gap-1 text-xs text-neutral-500">
                <Icon name="ph:star-fill" class="text-amber-400" />
                {{ p.rating }}
              </div>
              <div class="mt-2 flex items-baseline gap-2">
                <span class="text-sm font-bold text-neutral-900">{{ formatPrice(p.price) }}</span>
                <span v-if="p.compareAt" class="text-xs text-neutral-400 line-through">
                  {{ formatPrice(p.compareAt) }}
                </span>
              </div>
            </div>
            <button
              type="button"
              class="text-xs font-semibold disabled:opacity-50"
              :class="
                isMinimal
                  ? 'self-center text-indigo-600 underline'
                  : 'mt-3 rounded-xl bg-indigo-600 px-3 py-2 text-white'
              "
              :disabled="!p.inStock"
              @click="cart.add(p.id)"
            >
              +
            </button>
          </div>
        </article>
      </div>

      <div
        v-else
        class="mt-4 flex flex-col items-center rounded-2xl border border-dashed border-neutral-200 py-14 text-center"
      >
        <Icon name="ph:magnifying-glass-bold" class="text-3xl text-neutral-300" />
        <h2 class="mt-2 text-base font-bold text-neutral-900">{{ str("emptyTitle") }}</h2>
        <p class="mt-1 text-sm text-neutral-500">{{ str("emptyText") }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";
import { DEMO_PRODUCTS, formatPrice } from "@/data/demo-catalog";

const props = defineProps<{ section: PageSection }>();
const { str, num, bool, list } = useSectionData(() => props.section);
const cart = useDemoCart();

const variant = computed(() => str("variant", "grid"));
const isMinimal = computed(() => variant.value === "minimal");

const query = ref(str("initialQuery"));
watch(
  () => str("initialQuery"),
  (v) => (query.value = v),
);

const results = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return DEMO_PRODUCTS;
  return DEMO_PRODUCTS.filter(
    (p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
  );
});

const gridClass = computed(
  () =>
    ({
      2: "grid-cols-2",
      3: "grid-cols-2 md:grid-cols-3",
      4: "grid-cols-2 md:grid-cols-4",
    })[num("columns", 4)] ?? "grid-cols-2 md:grid-cols-4",
);
const ui = computed(() => {
  if (variant.value === "list") {
    return {
      wrap: "space-y-3",
      card: "flex overflow-hidden rounded-2xl border border-neutral-200 bg-white",
      img: "size-28 shrink-0 sm:size-32",
      body: "flex-1 items-center justify-between gap-4 p-4",
    };
  }
  if (variant.value === "minimal") {
    return {
      wrap: "mx-auto max-w-2xl divide-y divide-neutral-200",
      card: "py-4",
      img: "",
      body: "items-center justify-between gap-4",
    };
  }
  return {
    wrap: `grid gap-4 ${gridClass.value}`,
    card: "flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white",
    img: "aspect-square",
    body: "flex-1 flex-col p-4",
  };
});
</script>
