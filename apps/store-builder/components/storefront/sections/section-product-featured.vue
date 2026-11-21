<template>
  <!-- Split: image one side, details the other -->
  <div v-if="variant === 'split'" class="grid min-h-[400px] grid-cols-1 md:grid-cols-2">
    <div class="relative min-h-[16rem] bg-neutral-200">
      <img :src="image" :alt="name" class="absolute inset-0 size-full object-cover" loading="lazy" />
      <span
        v-if="badge"
        class="absolute start-4 top-4 rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold text-white"
        >{{ badge }}</span
      >
    </div>
    <div class="flex flex-col justify-center px-6 py-10 text-start sm:px-10 sm:py-12">
      <span class="text-xs font-bold tracking-widest text-neutral-500">{{ eyebrow }}</span>
      <h2 class="mt-2 text-2xl font-bold text-neutral-900">{{ name }}</h2>
      <div v-if="product && bool('show_rating', true)" class="mt-2 flex items-center gap-1 text-xs text-neutral-500">
        <Icon name="ph:star-fill" class="text-amber-400" />
        {{ product.rating }} ({{ product.reviews }})
      </div>
      <div v-if="bool('show_price', true)" class="mt-2 flex items-baseline gap-2">
        <span class="text-xl font-semibold text-neutral-900">{{ price }}</span>
        <span v-if="compareAt" class="text-sm text-neutral-400 line-through">{{ compareAt }}</span>
      </div>
      <p class="mt-4 text-sm leading-relaxed text-neutral-600">{{ description }}</p>
      <div v-if="product && product.colors.length" class="mt-4 flex gap-2">
        <span
          v-for="c in product.colors"
          :key="c"
          class="size-5 rounded-full border border-neutral-200"
          :style="{ backgroundColor: c }"
        />
      </div>
      <div class="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          class="w-fit rounded-md bg-neutral-900 px-8 py-3 text-sm font-bold text-white"
          @click="add"
        >
          {{ added ? "Added" : ctaText }}
        </button>
        <a
          v-if="product"
          :href="`/products/${product.handle}`"
          class="w-fit rounded-md border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700"
          >View details</a
        >
      </div>
    </div>
  </div>

  <!-- Centered: big image above, details centered -->
  <div v-else-if="variant === 'centered'" class="px-4 py-10 text-center sm:px-8 sm:py-14">
    <div class="mx-auto max-w-xl">
      <div class="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl bg-neutral-50">
        <img :src="image" :alt="name" class="size-full object-contain p-4" loading="lazy" />
        <span
          v-if="badge"
          class="absolute start-4 top-4 rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold text-white"
          >{{ badge }}</span
        >
      </div>
      <span class="mt-6 block text-xs font-bold tracking-widest text-neutral-500">{{ eyebrow }}</span>
      <h2 class="mt-2 text-2xl font-bold text-neutral-900">{{ name }}</h2>
      <div v-if="bool('show_price', true)" class="mt-2 flex items-baseline justify-center gap-2">
        <span class="text-xl font-semibold text-neutral-900">{{ price }}</span>
        <span v-if="compareAt" class="text-sm text-neutral-400 line-through">{{ compareAt }}</span>
      </div>
      <p class="mt-4 text-sm leading-relaxed text-neutral-600">{{ description }}</p>
      <button
        type="button"
        class="mt-6 rounded-md bg-neutral-900 px-8 py-3 text-sm font-bold text-white"
        @click="add"
      >
        {{ added ? "Added" : ctaText }}
      </button>
    </div>
  </div>

  <!-- Overlay: full-bleed image with a floating card -->
  <div v-else class="relative flex min-h-[420px] items-end bg-neutral-200 p-4 sm:items-center sm:p-10">
    <img :src="image" :alt="name" class="absolute inset-0 size-full object-cover" loading="lazy" />
    <div class="absolute inset-0 bg-black/20" />
    <div class="relative w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 text-start shadow-sm">
      <div class="flex items-center gap-2">
        <span class="text-xs font-bold tracking-widest text-neutral-500">{{ eyebrow }}</span>
        <span
          v-if="badge"
          class="rounded-full bg-indigo-600 px-2.5 py-0.5 text-[11px] font-bold text-white"
          >{{ badge }}</span
        >
      </div>
      <h2 class="mt-2 text-xl font-bold text-neutral-900">{{ name }}</h2>
      <div v-if="bool('show_price', true)" class="mt-1 flex items-baseline gap-2">
        <span class="text-lg font-semibold text-neutral-900">{{ price }}</span>
        <span v-if="compareAt" class="text-sm text-neutral-400 line-through">{{ compareAt }}</span>
      </div>
      <p class="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-600">{{ description }}</p>
      <button
        type="button"
        class="mt-5 w-full rounded-md bg-neutral-900 px-6 py-3 text-sm font-bold text-white"
        @click="add"
      >
        {{ added ? "Added" : ctaText }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";
import type { DemoProduct } from "@/data/demo-catalog";
import { DEMO_PRODUCTS, formatPrice } from "@/data/demo-catalog";

const props = defineProps<{ section: PageSection }>();
const { str, bool } = useSectionData(() => props.section);
const cart = useDemoCart();

const variant = computed(() => str("variant", "split"));

const resolveProduct = (id: string): DemoProduct | undefined => {
  if (!id) return undefined;
  const direct = DEMO_PRODUCTS.find((p) => p.id === id || p.handle === id);
  if (direct) return direct;
  const m = /^prod_(\d+)$/.exec(id);
  return m ? DEMO_PRODUCTS[Number(m[1]) - 1] : undefined;
}

// Picked product, else the first demo product. Manual fields (legacy keys) override.
const product = computed<DemoProduct | undefined>(
  () => resolveProduct(str("product_id")) ?? DEMO_PRODUCTS[0],
);

const name = computed(() => str("productName", str("title", product.value?.title ?? "Product Name")));
const price = computed(() =>
  str("price") || (product.value ? formatPrice(product.value.price) : "$149.00"),
);
const compareAt = computed(() =>
  !str("price") && product.value?.compareAt ? formatPrice(product.value.compareAt) : "",
);
const description = computed(() =>
  str("description", product.value?.description ?? "Describe the product here. Highlight key features and benefits."),
);
const image = computed(() => str("image_url") || product.value?.image || "/img/product-01.png");
const badge = computed(() => str("badge"));
const eyebrow = computed(() => str("eyebrow", "Featured"));
const ctaText = computed(() => str("cta_text", "Add to cart"));

const added = ref(false);
let timer: ReturnType<typeof setTimeout> | undefined;
const add = () => {
  if (product.value) cart.add(product.value.id);
  added.value = true;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => (added.value = false), 1500);
}
onBeforeUnmount(() => {
  if (timer) clearTimeout(timer);
});
</script>
