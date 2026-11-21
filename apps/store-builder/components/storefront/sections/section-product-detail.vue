<template>
  <div class="px-4 py-10 sm:px-8">
    <div v-if="product" class="mx-auto grid gap-8" :class="ui.wrap">
      <div :class="ui.gallery">
        <div class="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50" :class="[ui.image, variant === 'split' ? 'flex-1' : '']">
          <img :src="activeImage" :alt="product.title" class="size-full object-cover" />
        </div>
        <div v-if="product.images.length > 1" class="flex gap-2" :class="ui.thumbs">
          <button
            v-for="(img, i) in product.images"
            :key="img + i"
            type="button"
            class="size-16 overflow-hidden rounded-xl border-2 bg-neutral-50"
            :class="i === activeIndex ? 'border-indigo-600' : 'border-neutral-200'"
            @click="activeIndex = i"
          >
            <img :src="img" :alt="product.title" class="size-full object-cover" />
          </button>
        </div>
      </div>

      <div class="text-start" :class="ui.info">
        <span
          v-if="bool('showBadge') && product.badge"
          class="inline-block rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600"
        >
          {{ product.badge }}
        </span>
        <h1 class="mt-2 text-2xl font-bold text-neutral-900">{{ product.title }}</h1>

        <div v-if="bool('showRating')" class="mt-2 flex items-center gap-2 text-sm text-neutral-500">
          <span class="flex text-amber-400">
            <Icon
              v-for="n in 5"
              :key="n"
              :name="n <= Math.round(product.rating) ? 'ph:star-fill' : 'ph:star-bold'"
            />
          </span>
          <span>{{ product.rating }} ({{ product.reviews }})</span>
        </div>

        <div class="mt-4 flex flex-wrap items-baseline gap-3">
          <span class="text-3xl font-bold text-neutral-900">{{ formatPrice(product.price) }}</span>
          <template v-if="bool('showCompareAt') && product.compareAt">
            <span class="text-base text-neutral-400 line-through">{{ formatPrice(product.compareAt) }}</span>
            <span class="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600">
              -{{ savings }}%
            </span>
          </template>
        </div>

        <p class="mt-4 text-sm leading-relaxed text-neutral-500">{{ product.description }}</p>

        <div v-if="bool('showColors') && product.colors.length" class="mt-5 flex items-center gap-2">
          <button
            v-for="c in product.colors"
            :key="c"
            type="button"
            class="size-8 rounded-full border-2 p-0.5"
            :class="color === c ? 'border-indigo-600' : 'border-neutral-200'"
            :aria-label="c"
            @click="color = c"
          >
            <span class="block size-full rounded-full border border-neutral-200" :style="{ backgroundColor: c }" />
          </button>
        </div>

        <div v-if="bool('showSizes') && product.sizes.length" class="mt-4 flex flex-wrap gap-2">
          <button
            v-for="s in product.sizes"
            :key="s"
            type="button"
            class="min-w-10 rounded-xl border px-3 py-2 text-sm font-medium"
            :class="size === s ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-neutral-200 text-neutral-900'"
            @click="size = s"
          >
            {{ s }}
          </button>
        </div>

        <div class="mt-6 flex flex-wrap items-center gap-3">
          <div v-if="bool('showQty')" class="flex items-center rounded-xl border border-neutral-200">
            <button type="button" class="px-3 py-2.5 text-neutral-900" aria-label="-" @click="qty = Math.max(1, qty - 1)">
              <Icon name="ph:minus-bold" />
            </button>
            <span class="w-8 text-center text-sm font-semibold text-neutral-900">{{ qty }}</span>
            <button type="button" class="px-3 py-2.5 text-neutral-900" aria-label="+" @click="qty++">
              <Icon name="ph:plus-bold" />
            </button>
          </div>
          <button
            type="button"
            class="flex-1 rounded-xl px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
            :style="{ backgroundColor: str('buttonColor', '#4f46e5') }"
            :disabled="!product.inStock"
            @click="addToCart"
          >
            {{ added ? "✓" : str("addLabel") }}
          </button>
          <button
            v-if="bool('showWishlist')"
            type="button"
            class="rounded-xl border border-neutral-200 p-3 text-neutral-900"
            aria-label="Wishlist"
            @click="wished = !wished"
          >
            <Icon :name="wished ? 'ph:heart-fill' : 'ph:heart-bold'" :class="wished ? 'text-red-500' : ''" />
          </button>
        </div>
        <button
          v-if="bool('showBuyNow')"
          type="button"
          class="mt-3 w-full rounded-xl border border-neutral-900 px-6 py-3 text-sm font-semibold text-neutral-900 disabled:opacity-50"
          :disabled="!product.inStock"
          @click="addToCart"
        >
          {{ str("buyNowLabel") }}
        </button>

        <p
          v-if="bool('showStock')"
          class="mt-3 text-xs font-medium"
          :class="product.inStock ? 'text-emerald-600' : 'text-red-500'"
        >
          {{ product.inStock ? str("stockText") : str("outOfStockText") }}
        </p>

        <ul v-if="bool('showPerks') && list('perks').length" class="mt-5 space-y-2 border-t border-neutral-200 pt-5">
          <li v-for="(perk, i) in list('perks')" :key="i" class="flex items-center gap-2 text-sm text-neutral-500">
            <Icon name="ph:check-circle-bold" class="text-indigo-600" />
            {{ perk.text }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";
import { DEMO_PRODUCTS, formatPrice } from "@/data/demo-catalog";

const props = defineProps<{ section: PageSection }>();
const { str, bool, list } = useSectionData(() => props.section);
const cart = useDemoCart();

const variant = computed(() => str("variant", "classic"));
const UI = {
  classic: {
    wrap: "max-w-5xl md:grid-cols-2",
    gallery: "",
    image: "aspect-square",
    thumbs: "mt-3",
    info: "",
  },
  stacked: {
    wrap: "max-w-2xl grid-cols-1",
    gallery: "",
    image: "aspect-[4/3]",
    thumbs: "mt-3 justify-center",
    info: "",
  },
  split: {
    wrap: "max-w-6xl md:grid-cols-[1.2fr_1fr]",
    gallery: "flex gap-3 md:sticky md:top-6 md:self-start",
    image: "aspect-square",
    thumbs: "order-first flex-col",
    info: "rounded-2xl border border-neutral-200 p-6",
  },
} as const;
const ui = computed(() => UI[variant.value as keyof typeof UI] ?? UI.classic);

const product = computed(
  () => DEMO_PRODUCTS.find((p) => p.id === str("productId", "p1")) ?? DEMO_PRODUCTS[0],
);

const activeIndex = ref(0);
const color = ref("");
const size = ref("");
const qty = ref(1);
const wished = ref(false);
const added = ref(false);

watch(
  product,
  (p) => {
    activeIndex.value = 0;
    color.value = p?.colors[0] ?? "";
    size.value = p?.sizes[0] ?? "";
    qty.value = 1;
  },
  { immediate: true },
);

const activeImage = computed(() => product.value?.images[activeIndex.value] ?? product.value?.image);
const savings = computed(() => {
  const p = product.value;
  return p?.compareAt ? Math.round((1 - p.price / p.compareAt) * 100) : 0;
});

const addToCart = () => {
  if (!product.value) return;
  cart.add(product.value.id, qty.value, {
    color: color.value || undefined,
    size: size.value || undefined,
  });
  added.value = true;
  setTimeout(() => (added.value = false), 1200);
}
</script>
