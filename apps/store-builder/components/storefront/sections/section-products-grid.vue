<template>
  <div class="border-t border-neutral-200 px-4 py-10 sm:px-8 sm:py-12">
    <h3
      v-if="bool('show_title', true) && heading"
      class="text-lg font-bold text-neutral-900"
      :class="titleAlign"
    >
      {{ heading }}
    </h3>

    <div
      v-if="!cards.length"
      class="mt-8 rounded-xl border border-dashed border-neutral-200 py-10 text-center text-sm text-neutral-400"
    >
      No products to show yet
    </div>

    <div v-else class="mt-6 sm:mt-8" :class="wrapClass">
      <article
        v-for="(c, i) in cards"
        :key="`${c.p.id}-${i}`"
        class="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white"
        :class="c.style === 'hero' ? 'col-span-2 row-span-2' : 'shadow-sm'"
      >
        <!-- Hero (featured-first variant, first product) -->
        <template v-if="c.style === 'hero'">
          <div class="relative h-full min-h-[16rem] bg-neutral-50">
            <img
              :src="c.p.image"
              :alt="c.p.title"
              class="absolute inset-0 size-full object-cover"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-black/30" />
            <div class="absolute inset-x-0 bottom-0 p-4 text-start sm:p-6">
              <span
                v-if="badgeFor(c.p)"
                class="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-neutral-900"
                >{{ badgeFor(c.p) }}</span
              >
              <h4 class="mt-2 text-lg font-bold text-white sm:text-xl">
                {{ c.p.title }}
              </h4>
              <div class="mt-1 flex items-baseline gap-2 text-white">
                <span class="text-base font-bold">{{ formatPrice(c.p.price) }}</span>
                <span v-if="c.p.compareAt" class="text-xs line-through opacity-70">{{
                  formatPrice(c.p.compareAt)
                }}</span>
              </div>
              <button
                type="button"
                class="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-bold text-neutral-900"
                @click="add(c.p)"
              >
                <Icon
                  :name="addedId === c.p.id ? 'ph:check-bold' : 'ph:shopping-cart-bold'"
                  class="text-[12px]"
                />
                {{ addedId === c.p.id ? "Added" : "Add to cart" }}
              </button>
            </div>
          </div>
        </template>

        <!-- List variant row -->
        <template v-else-if="c.style === 'list'">
          <div class="flex items-center gap-4 p-3 text-start sm:gap-5 sm:p-4">
            <a
              :href="productHref(c.p)"
              class="size-20 shrink-0 overflow-hidden rounded-xl bg-neutral-50 sm:size-28"
            >
              <img
                :src="c.p.image"
                :alt="c.p.title"
                class="size-full object-contain"
                loading="lazy"
              />
            </a>
            <div class="min-w-0 flex-1">
              <p class="text-xs text-neutral-400">{{ c.p.category }}</p>
              <a
                :href="productHref(c.p)"
                class="block truncate text-sm font-bold text-neutral-900 sm:text-base"
                >{{ c.p.title }}</a
              >
              <p
                class="mt-1 hidden text-xs leading-relaxed text-neutral-500 sm:line-clamp-2 sm:block"
              >
                {{ c.p.description }}
              </p>
              <div class="mt-1 flex items-center gap-1 text-xs text-neutral-500">
                <Icon name="ph:star-fill" class="text-amber-400" />
                <span>{{ c.p.rating }}</span>
                <span class="text-neutral-400">({{ c.p.reviews }})</span>
              </div>
            </div>
            <div class="flex shrink-0 flex-col items-end gap-2">
              <div class="text-end">
                <p class="text-sm font-bold text-neutral-900">
                  {{ formatPrice(c.p.price) }}
                </p>
                <p v-if="c.p.compareAt" class="text-xs text-neutral-400 line-through">
                  {{ formatPrice(c.p.compareAt) }}
                </p>
              </div>
              <button
                type="button"
                class="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white"
                @click="add(c.p)"
              >
                {{ addedId === c.p.id ? "Added" : "Add" }}
              </button>
            </div>
          </div>
        </template>

        <!-- Compact (card_style: horizontal) -->
        <template v-else-if="c.style === 'horizontal'">
          <a :href="productHref(c.p)" class="flex items-center gap-4 p-3 text-start">
            <span class="size-20 shrink-0 overflow-hidden rounded-xl bg-neutral-50">
              <img
                :src="c.p.image"
                :alt="c.p.title"
                class="size-full object-contain"
                loading="lazy"
              />
            </span>
            <span class="min-w-0 flex-1">
              <span class="block truncate text-sm font-semibold text-neutral-900">{{
                c.p.title
              }}</span>
              <span class="mt-0.5 block text-xs text-neutral-400">{{ c.p.category }}</span>
              <span class="mt-2 block text-sm font-bold text-neutral-900">{{
                formatPrice(c.p.price)
              }}</span>
            </span>
          </a>
        </template>

        <!-- Editorial -->
        <template v-else-if="c.style === 'editorial'">
          <a
            :href="productHref(c.p)"
            class="block aspect-video w-full overflow-hidden bg-neutral-100"
          >
            <img
              :src="c.p.image"
              :alt="c.p.title"
              class="size-full object-cover"
              loading="lazy"
            />
          </a>
          <div class="p-4 text-start">
            <p class="text-base font-bold text-neutral-900">{{ c.p.title }}</p>
            <p class="mt-1.5 line-clamp-2 text-xs leading-relaxed text-neutral-500">
              {{ c.p.description }}
            </p>
            <div class="mt-3 flex items-center justify-between gap-2">
              <span class="text-sm font-bold text-neutral-900">{{
                formatPrice(c.p.price)
              }}</span>
              <button
                type="button"
                class="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white"
                @click="add(c.p)"
              >
                {{ addedId === c.p.id ? "Added" : "Add to cart" }}
              </button>
            </div>
          </div>
        </template>

        <!-- Sale -->
        <template v-else-if="c.style === 'sale'">
          <div class="p-4 text-start">
            <span
              v-if="badgeFor(c.p)"
              class="absolute start-3 top-3 z-[1] rounded-full bg-green-500 px-2.5 py-1 text-[11px] font-bold text-white"
              >{{ badgeFor(c.p) }}</span
            >
            <a
              :href="productHref(c.p)"
              class="block aspect-square overflow-hidden rounded-xl bg-neutral-50"
            >
              <img
                :src="c.p.image"
                :alt="c.p.title"
                class="size-full object-contain p-2"
                loading="lazy"
              />
            </a>
            <div class="mt-3 space-y-1 px-1">
              <p class="text-sm font-medium text-neutral-900">{{ c.p.title }}</p>
              <div class="flex items-center gap-2">
                <span class="text-sm font-bold text-neutral-900">{{
                  formatPrice(c.p.price)
                }}</span>
                <span v-if="c.p.compareAt" class="text-xs text-neutral-400 line-through">{{
                  formatPrice(c.p.compareAt)
                }}</span>
              </div>
            </div>
          </div>
        </template>

        <!-- Shop (default) -->
        <template v-else>
          <div class="p-4 text-start">
            <a
              :href="productHref(c.p)"
              class="block aspect-square overflow-hidden rounded-xl bg-neutral-50"
            >
              <img
                :src="c.p.image"
                :alt="c.p.title"
                class="size-full object-contain p-2"
                loading="lazy"
              />
            </a>
            <div class="mt-3">
              <p class="text-xs text-neutral-400">{{ c.p.category }}</p>
              <p class="mt-0.5 text-sm font-bold text-neutral-900">{{ c.p.title }}</p>
              <div class="mt-1 flex items-center gap-1 text-xs text-neutral-500">
                <Icon name="ph:star-fill" class="text-amber-400" />{{ c.p.rating }}
              </div>
              <div class="mt-3 flex items-center justify-between gap-2">
                <span class="text-sm font-bold text-neutral-900">{{
                  formatPrice(c.p.price)
                }}</span>
                <button
                  type="button"
                  class="flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-semibold text-neutral-700"
                  @click="add(c.p)"
                >
                  <Icon
                    :name="addedId === c.p.id ? 'ph:check-bold' : 'ph:shopping-cart-bold'"
                    class="text-[11px]"
                  />
                  {{ addedId === c.p.id ? "Added" : "Add" }}
                </button>
              </div>
            </div>
          </div>
        </template>
      </article>
    </div>

    <div v-if="bool('show_view_all', true)" class="mt-8 text-center">
      <a
        :href="str('view_all_url', '/collections/all')"
        class="inline-block rounded-md border border-neutral-300 px-6 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
      >
        {{ str("view_all_text", "View All Products") }}
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";
import type { DemoProduct } from "@/data/demo-catalog";
import { DEMO_PRODUCTS, formatPrice } from "@/data/demo-catalog";

const props = defineProps<{ section: PageSection }>();
const { str, num, bool } = useSectionData(() => props.section);
const cart = useDemoCart();

const variant = computed(() => str("variant", "grid"));
const cardStyle = computed(() => str("card_style", "shop"));
const heading = computed(() => str("heading", str("title", "Our Products")));

const titleAlign = computed(() => {
  const a = str("title_align", "left");
  return a === "center" ? "text-center" : a === "right" || a === "end" ? "text-end" : "text-start";
});

const resolveProduct = (id: string): DemoProduct | undefined => {
  if (!id) return undefined;
  const direct = DEMO_PRODUCTS.find((p) => p.id === id || p.handle === id);
  if (direct) return direct;
  const m = /^prod_(\d+)$/.exec(id);
  return m ? DEMO_PRODUCTS[Number(m[1]) - 1] : undefined;
}

const products = computed<DemoProduct[]>(() => {
  const limit = Math.min(24, Math.max(1, Math.round(num("limit", 8))));
  const featured = resolveProduct(str("featured_product_id"));
  const ordered = featured
    ? [featured, ...DEMO_PRODUCTS.filter((p) => p.id !== featured.id)]
    : [...DEMO_PRODUCTS];
  return Array.from({ length: limit }, (_, i) => ordered[i % ordered.length]);
});

const styleFor = (i: number) => {
  if (variant.value === "list") return "list";
  if (variant.value === "featured" && i === 0) return "hero";
  return cardStyle.value;
}

const cards = computed(() => products.value.map((p, i) => ({ p, style: styleFor(i) })));

const COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
  5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
};

const wrapClass = computed(() => {
  if (variant.value === "list") return "space-y-3";
  if (variant.value === "featured") return "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4";
  if (cardStyle.value === "horizontal") return "space-y-3";
  const n = Math.min(5, Math.max(1, Math.round(num("columns", 3))));
  return `grid gap-3 sm:gap-5 ${COLS[n]}`;
});

const badgeFor = (p: DemoProduct) => {
  if (p.compareAt) return `-${Math.round((1 - p.price / p.compareAt) * 100)}%`;
  return p.badge || "";
}

const productHref = (p: DemoProduct) => {
  return `/products/${p.handle}`;
}

const addedId = ref("");
let addedTimer: ReturnType<typeof setTimeout> | undefined;
const add = (p: DemoProduct) => {
  cart.add(p.id);
  addedId.value = p.id;
  if (addedTimer) clearTimeout(addedTimer);
  addedTimer = setTimeout(() => (addedId.value = ""), 1500);
}
onBeforeUnmount(() => {
  if (addedTimer) clearTimeout(addedTimer);
});
</script>
