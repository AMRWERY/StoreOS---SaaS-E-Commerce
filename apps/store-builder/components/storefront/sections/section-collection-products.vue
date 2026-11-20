<template>
  <div class="px-4 py-8 sm:px-8">
    <div class="mx-auto max-w-5xl">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <button
            v-if="hasFilters"
            type="button"
            class="flex items-center gap-2 rounded-xl border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-900 lg:hidden"
            @click="filtersOpen = !filtersOpen"
          >
            <Icon name="ph:funnel-bold" />
            {{ str("filtersTitle") }}
          </button>
          <p class="text-sm text-neutral-500">{{ filtered.length }} / {{ DEMO_PRODUCTS.length }}</p>
        </div>
        <select
          v-if="bool('showSort')"
          v-model="sort"
          class="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900"
        >
          <option v-for="o in sortOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
        </select>
      </div>

      <div class="flex flex-col gap-6" :class="variant === 'sidebar' ? 'lg:flex-row' : ''">
        <aside
          v-if="hasFilters"
          class="w-full text-start lg:block"
          :class="[filtersOpen ? 'block' : 'hidden', filtersClass]"
        >
          <h3 class="text-sm font-bold text-neutral-900" :class="variant === 'top' ? 'lg:hidden' : ''">
            {{ str("filtersTitle") }}
          </h3>
          <div :class="variant === 'top' ? 'flex flex-wrap gap-2' : 'space-y-2'">
            <label
              v-for="c in DEMO_CATEGORIES"
              :key="c.id"
              class="flex items-center gap-2 text-sm text-neutral-900"
              :class="variant === 'top' ? 'rounded-full border border-neutral-200 px-3 py-1.5' : ''"
            >
              <input v-model="selectedCats" type="checkbox" :value="c.title" class="size-4 rounded accent-indigo-600" />
              {{ c.title }}
            </label>
          </div>
          <div :class="variant === 'top' ? 'w-48' : ''">
            <div class="flex justify-between text-xs text-neutral-500">
              <span>{{ formatPrice(0) }}</span>
              <span class="font-semibold text-neutral-900">{{ formatPrice(maxPrice) }}</span>
            </div>
            <input v-model.number="maxPrice" type="range" min="0" :max="PRICE_MAX" step="5" class="mt-2 w-full accent-indigo-600" />
          </div>
          <label class="flex items-center gap-2 text-sm text-neutral-900">
            <input v-model="inStockOnly" type="checkbox" class="size-4 rounded accent-indigo-600" />
            In stock
          </label>
          <label class="flex items-center gap-2 text-sm text-neutral-900">
            <input v-model="onSaleOnly" type="checkbox" class="size-4 rounded accent-indigo-600" />
            On sale
          </label>
        </aside>

        <div class="min-w-0 flex-1">
          <div v-if="paged.length" class="grid" :class="[gridClass, variant === 'minimal' ? 'gap-x-5 gap-y-8' : 'gap-4']">
            <article
              v-for="p in paged"
              :key="p.id"
              class="flex flex-col overflow-hidden bg-white"
              :class="variant === 'minimal' ? '' : 'rounded-2xl border border-neutral-200'"
            >
              <div class="relative aspect-square bg-neutral-50" :class="variant === 'minimal' ? 'overflow-hidden rounded-xl' : ''">
                <img :src="p.image" :alt="p.title" class="size-full object-cover" />
                <span
                  v-if="p.badge"
                  class="absolute start-2 top-2 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-indigo-600"
                >
                  {{ p.badge }}
                </span>
              </div>
              <div class="flex flex-1 flex-col text-start" :class="variant === 'minimal' ? 'pt-3' : 'p-4'">
                <h3 class="text-sm font-semibold text-neutral-900">{{ p.title }}</h3>
                <div v-if="bool('showRating')" class="mt-1 flex items-center gap-1 text-xs text-neutral-500">
                  <Icon name="ph:star-fill" class="text-amber-400" />
                  {{ p.rating }} ({{ p.reviews }})
                </div>
                <div class="mt-2 flex items-baseline gap-2">
                  <span class="text-sm font-bold text-neutral-900">{{ formatPrice(p.price) }}</span>
                  <span v-if="p.compareAt" class="text-xs text-neutral-400 line-through">
                    {{ formatPrice(p.compareAt) }}
                  </span>
                </div>
                <button
                  type="button"
                  class="mt-3 text-xs font-semibold disabled:opacity-50"
                  :class="
                    variant === 'minimal'
                      ? 'self-start text-indigo-600 underline'
                      : 'w-full rounded-xl bg-indigo-600 px-3 py-2 text-white'
                  "
                  :disabled="!p.inStock"
                  @click="cart.add(p.id)"
                >
                  {{ str("addLabel") }}
                </button>
              </div>
            </article>
          </div>

          <div
            v-else
            class="flex flex-col items-center rounded-2xl border border-dashed border-neutral-200 py-14 text-center"
          >
            <Icon name="ph:magnifying-glass-bold" class="text-3xl text-neutral-300" />
            <p class="mt-2 text-sm text-neutral-500">{{ str("emptyText") }}</p>
          </div>

          <div v-if="bool('showPagination') && pageCount > 1" class="mt-6 flex items-center justify-center gap-1">
            <button
              v-for="n in pageCount"
              :key="n"
              type="button"
              class="size-9 rounded-xl border text-sm font-medium"
              :class="n === page ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-neutral-200 text-neutral-900'"
              @click="page = n"
            >
              {{ n }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";
import { DEMO_PRODUCTS, DEMO_CATEGORIES, formatPrice } from "@/data/demo-catalog";

const props = defineProps<{ section: PageSection }>();
const { str, num, bool } = useSectionData(() => props.section);
const cart = useDemoCart();

const variant = computed(() => str("variant", "sidebar"));
/** The minimal design drops the filters entirely; the toggle controls the rest. */
const hasFilters = computed(() => bool("showSidebar") && variant.value !== "minimal");
const filtersClass = computed(() =>
  variant.value === "top"
    ? "space-y-3 rounded-2xl border border-neutral-200 p-4 lg:flex lg:flex-wrap lg:items-center lg:gap-x-6 lg:gap-y-3 lg:space-y-0"
    : "shrink-0 space-y-5 rounded-2xl border border-neutral-200 p-4 lg:w-56",
);

const PRICE_MAX = Math.ceil(Math.max(...DEMO_PRODUCTS.map((p) => p.price)) / 5) * 5;
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
  { value: "newest", label: "Newest" },
];

const selectedCats = ref<string[]>([]);
const maxPrice = ref(PRICE_MAX);
const inStockOnly = ref(false);
const onSaleOnly = ref(false);
const sort = ref("featured");
const page = ref(1);
const filtersOpen = ref(false);

const filtered = computed(() => {
  const items = DEMO_PRODUCTS.filter(
    (p) =>
      (!selectedCats.value.length || selectedCats.value.includes(p.category)) &&
      p.price <= maxPrice.value &&
      (!inStockOnly.value || p.inStock) &&
      (!onSaleOnly.value || !!p.compareAt),
  );
  switch (sort.value) {
    case "price_asc":
      return items.sort((a, b) => a.price - b.price);
    case "price_desc":
      return items.sort((a, b) => b.price - a.price);
    case "rating":
      return items.sort((a, b) => b.rating - a.rating);
    case "newest":
      return items.sort((a, b) => Number(b.id.slice(1)) - Number(a.id.slice(1)));
    default:
      return items;
  }
});

const pageSize = computed(() => Math.max(1, num("pageSize", 6)));
const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize.value)));
const paged = computed(() =>
  bool("showPagination")
    ? filtered.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value)
    : filtered.value,
);

watch([selectedCats, maxPrice, inStockOnly, onSaleOnly, sort, pageSize], () => (page.value = 1));

const gridClass = computed(
  () =>
    ({
      2: "grid-cols-2",
      3: "grid-cols-2 md:grid-cols-3",
      4: "grid-cols-2 md:grid-cols-3 xl:grid-cols-4",
    })[num("columns", 3)] ?? "grid-cols-2 md:grid-cols-3",
);
</script>
