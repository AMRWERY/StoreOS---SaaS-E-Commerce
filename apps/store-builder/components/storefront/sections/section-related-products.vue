<template>
  <div class="px-4 py-10 sm:px-8">
    <div class="mx-auto max-w-5xl">
      <h2 v-if="str('heading')" class="text-start text-2xl font-bold text-neutral-900">
        {{ str("heading") }}
      </h2>

      <div class="mt-6" :class="ui.wrap">
        <article
          v-for="p in products"
          :key="p.id"
          class="overflow-hidden rounded-2xl border border-neutral-200 bg-white"
          :class="ui.card"
        >
          <div class="bg-neutral-50" :class="ui.img">
            <img :src="p.image" :alt="p.title" class="size-full object-cover" />
          </div>
          <div class="flex flex-1 flex-col p-4 text-start" :class="variant === 'list' ? 'justify-center' : ''">
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
            <button
              v-if="bool('showAddToCart')"
              type="button"
              class="mt-3 rounded-xl bg-indigo-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
              :class="variant === 'list' ? 'self-start px-5' : 'w-full'"
              :disabled="!p.inStock"
              @click="cart.add(p.id)"
            >
              {{ str("addLabel") }}
            </button>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";
import { DEMO_PRODUCTS, formatPrice } from "@/data/demo-catalog";

const props = defineProps<{ section: PageSection }>();
const { str, num, bool } = useSectionData(() => props.section);
const cart = useDemoCart();

const variant = computed(() => str("variant", "grid"));

const gridClass = computed(
  () =>
    ({
      2: "grid-cols-2",
      3: "grid-cols-2 md:grid-cols-3",
      4: "grid-cols-2 md:grid-cols-4",
    })[num("columns", 4)] ?? "grid-cols-2 md:grid-cols-4",
);
const ui = computed(() => {
  if (variant.value === "carousel") {
    return {
      wrap: "flex snap-x gap-4 overflow-x-auto pb-2",
      card: "flex w-56 shrink-0 snap-start flex-col",
      img: "aspect-[4/3]",
    };
  }
  if (variant.value === "list") {
    return { wrap: "space-y-3", card: "flex", img: "size-28 shrink-0 sm:size-32" };
  }
  return { wrap: `grid gap-4 ${gridClass.value}`, card: "flex flex-col", img: "aspect-square" };
});

const products = computed(() => {
  const limit = Math.max(1, num("limit", 4));
  const source = str("source", "category");
  let pool = [...DEMO_PRODUCTS];
  if (source === "category")
    pool = pool.sort((a, b) => Number(b.category === "Electronics") - Number(a.category === "Electronics"));
  else if (source === "best") pool = pool.sort((a, b) => b.reviews - a.reviews);
  else pool = pool.reverse();
  return pool.slice(0, limit);
});
</script>
