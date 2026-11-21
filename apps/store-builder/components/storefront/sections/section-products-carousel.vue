<template>
  <div class="overflow-hidden px-4 py-10 sm:px-8 sm:py-12">
    <div class="mb-6 flex items-center justify-between gap-4">
      <h3
        v-if="bool('show_title', true) && heading"
        class="text-start text-lg font-bold text-neutral-900"
      >
        {{ heading }}
      </h3>
      <span v-else />
      <div class="flex gap-2">
        <button
          type="button"
          aria-label="Previous"
          class="rounded-full border border-neutral-300 p-1.5 text-neutral-700 disabled:opacity-40"
          :disabled="!loop && atStart"
          @click="scrollByDir(-1)"
        >
          <Icon name="ph:arrow-left-bold" class="text-xs icon-nudge-start" />
        </button>
        <button
          type="button"
          aria-label="Next"
          class="rounded-full border border-neutral-300 p-1.5 text-neutral-700 disabled:opacity-40"
          :disabled="!loop && atEnd"
          @click="scrollByDir(1)"
        >
          <Icon name="ph:arrow-right-bold" class="text-xs icon-nudge-end" />
        </button>
      </div>
    </div>

    <div
      ref="track"
      class="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 [&::-webkit-scrollbar]:hidden"
      :style="{ paddingInlineEnd: variant === 'spotlight' ? '0' : `${peek}%` }"
      @scroll.passive="updateEdges"
    >
      <article
        v-for="(p, i) in products"
        :key="`${p.id}-${i}`"
        class="relative shrink-0 snap-start overflow-hidden rounded-2xl border border-neutral-200 bg-white text-start"
        :class="slideClass"
        :style="slideStyle"
      >
        <!-- Spotlight: wide slide, image + details -->
        <template v-if="variant === 'spotlight'">
          <div class="flex flex-col sm:flex-row">
            <a
              :href="productHref(p)"
              class="block aspect-[4/3] bg-neutral-50 sm:aspect-auto sm:w-1/2"
            >
              <img :src="p.image" :alt="p.title" class="size-full object-cover" loading="lazy" />
            </a>
            <div class="flex flex-1 flex-col justify-center p-5 sm:p-8">
              <span
                v-if="badgeFor(p)"
                class="w-fit rounded-full bg-indigo-600 px-2.5 py-1 text-[11px] font-bold text-white"
                >{{ badgeFor(p) }}</span
              >
              <p class="mt-2 text-xs text-neutral-400">{{ p.category }}</p>
              <a :href="productHref(p)" class="mt-1 text-lg font-bold text-neutral-900">{{
                p.title
              }}</a>
              <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-500">
                {{ p.description }}
              </p>
              <div class="mt-3 flex items-baseline gap-2">
                <span class="text-lg font-bold text-neutral-900">{{ formatPrice(p.price) }}</span>
                <span v-if="p.compareAt" class="text-sm text-neutral-400 line-through">{{
                  formatPrice(p.compareAt)
                }}</span>
              </div>
              <button
                type="button"
                class="mt-4 w-fit rounded-md bg-neutral-900 px-6 py-2.5 text-sm font-bold text-white"
                @click="add(p)"
              >
                {{ addedId === p.id ? "Added" : "Add to cart" }}
              </button>
            </div>
          </div>
        </template>

        <!-- Minimal: image tile with name overlay -->
        <template v-else-if="variant === 'minimal'">
          <a :href="productHref(p)" class="relative block aspect-[3/4] bg-neutral-100">
            <img :src="p.image" :alt="p.title" class="size-full object-cover" loading="lazy" />
            <span class="absolute inset-0 bg-black/25" />
            <span class="absolute inset-x-0 bottom-0 p-3">
              <span class="block text-sm font-semibold text-white">{{ p.title }}</span>
              <span class="block text-xs text-white/80">{{ formatPrice(p.price) }}</span>
            </span>
          </a>
        </template>

        <!-- Scroll variant, card styles -->
        <template v-else-if="cardStyle === 'horizontal'">
          <div class="flex items-center gap-3 p-3">
            <a :href="productHref(p)" class="size-16 shrink-0 overflow-hidden rounded-xl bg-neutral-50">
              <img :src="p.image" :alt="p.title" class="size-full object-contain" loading="lazy" />
            </a>
            <div class="min-w-0 flex-1">
              <p class="truncate text-xs font-bold text-neutral-900">{{ p.title }}</p>
              <p class="text-[10px] text-neutral-400">{{ p.category }}</p>
              <div class="mt-1.5 flex items-center justify-between gap-1">
                <span class="text-xs font-bold text-neutral-900">{{ formatPrice(p.price) }}</span>
                <button
                  type="button"
                  class="rounded-lg border border-neutral-200 bg-neutral-50 px-2 py-1 text-[10px] font-semibold text-neutral-700"
                  @click="add(p)"
                >
                  {{ addedId === p.id ? "Added" : "Add" }}
                </button>
              </div>
            </div>
          </div>
        </template>

        <template v-else-if="cardStyle === 'editorial'">
          <a :href="productHref(p)" class="block aspect-video bg-neutral-100">
            <img :src="p.image" :alt="p.title" class="size-full object-cover" loading="lazy" />
          </a>
          <div class="p-3">
            <p class="text-xs font-bold text-neutral-900">{{ p.title }}</p>
            <p class="mt-1 line-clamp-2 text-[10px] leading-relaxed text-neutral-500">
              {{ p.description }}
            </p>
            <button
              type="button"
              class="mt-2 rounded-lg bg-indigo-600 px-3 py-1.5 text-[10px] font-bold text-white"
              @click="add(p)"
            >
              {{ addedId === p.id ? "Added" : "Add to cart" }}
            </button>
          </div>
        </template>

        <template v-else>
          <div class="p-3">
            <span
              v-if="cardStyle === 'sale' && badgeFor(p)"
              class="absolute start-2 top-2 z-[1] rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-bold text-white"
              >{{ badgeFor(p) }}</span
            >
            <a
              :href="productHref(p)"
              class="block aspect-square overflow-hidden rounded-xl bg-neutral-50"
            >
              <img :src="p.image" :alt="p.title" class="size-full object-contain p-1" loading="lazy" />
            </a>
            <div class="mt-2">
              <p v-if="cardStyle !== 'sale'" class="text-[10px] text-neutral-400">
                {{ p.category }}
              </p>
              <p class="mt-0.5 text-xs font-bold text-neutral-900">{{ p.title }}</p>
              <div class="mt-2 flex items-center justify-between gap-1">
                <span class="flex items-baseline gap-1">
                  <span class="text-xs font-bold text-neutral-900">{{ formatPrice(p.price) }}</span>
                  <span
                    v-if="cardStyle === 'sale' && p.compareAt"
                    class="text-[10px] text-neutral-400 line-through"
                    >{{ formatPrice(p.compareAt) }}</span
                  >
                </span>
                <button
                  type="button"
                  class="rounded-lg border border-neutral-200 bg-neutral-50 px-2 py-1 text-[10px] font-semibold text-neutral-700"
                  @click="add(p)"
                >
                  {{ addedId === p.id ? "Added" : "Add" }}
                </button>
              </div>
            </div>
          </div>
        </template>
      </article>
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

const variant = computed(() => str("variant", "scroll"));
const cardStyle = computed(() => str("card_style", "shop"));
const heading = computed(() => str("heading", str("title", "Featured Products")));
const loop = computed(() => bool("loop", true));
const peek = computed(() => Math.min(40, Math.max(0, num("peek_pct", 12))));

const products = computed<DemoProduct[]>(() => {
  const cat = str("category_id").toLowerCase();
  let list = [...DEMO_PRODUCTS];
  if (cat) {
    const filtered = DEMO_PRODUCTS.filter((p) => {
      if (cat === "sale") return !!p.compareAt;
      const c = p.category.toLowerCase();
      if (["living", "bedroom", "kitchen"].includes(cat)) return c.includes("home");
      return c.includes(cat) || cat === p.category.toLowerCase();
    });
    if (filtered.length >= 2) list = filtered;
  }
  const limit = Math.min(24, Math.max(1, Math.round(num("limit", 8))));
  return list.slice(0, limit);
});

const slideClass = computed(() => {
  if (variant.value === "spotlight") return "";
  if (variant.value === "minimal") return "w-40 sm:w-48";
  if (cardStyle.value === "horizontal") return "w-64";
  return "w-44 sm:w-52";
});
const slideStyle = computed(() =>
  variant.value === "spotlight" ? { flexBasis: `${100 - peek.value}%` } : undefined,
);

const badgeFor = (p: DemoProduct) => {
  if (p.compareAt) return `-${Math.round((1 - p.price / p.compareAt) * 100)}%`;
  return p.badge || "";
}
const productHref = (p: DemoProduct) => {
  return `/products/${p.handle}`;
}

// Scrolling
const track = ref<HTMLElement | null>(null);
const atStart = ref(true);
const atEnd = ref(false);

const isRtl = (el: HTMLElement) => {
  return typeof window !== "undefined" && window.getComputedStyle(el).direction === "rtl";
}

const updateEdges = () => {
  const el = track.value;
  if (!el) return;
  const max = el.scrollWidth - el.clientWidth;
  const pos = Math.abs(el.scrollLeft);
  atStart.value = pos <= 2;
  atEnd.value = pos >= max - 2;
}

const scrollByDir = (dir: 1 | -1) => {
  const el = track.value;
  if (!el || typeof window === "undefined") return;
  const rtl = isRtl(el);
  const sign = rtl ? -1 : 1;
  const max = el.scrollWidth - el.clientWidth;
  const pos = Math.abs(el.scrollLeft);
  if (loop.value && dir === 1 && pos >= max - 2) {
    el.scrollTo({ left: 0, behavior: "smooth" });
    return;
  }
  if (loop.value && dir === -1 && pos <= 2) {
    el.scrollTo({ left: sign * max, behavior: "smooth" });
    return;
  }
  const first = el.firstElementChild as HTMLElement | null;
  const step = (first?.offsetWidth ?? el.clientWidth * 0.8) + 20;
  el.scrollBy({ left: sign * dir * step, behavior: "smooth" });
}

onMounted(() => {
  updateEdges();
  window.addEventListener("resize", updateEdges);
});
onBeforeUnmount(() => {
  if (typeof window !== "undefined") window.removeEventListener("resize", updateEdges);
  if (addedTimer) clearTimeout(addedTimer);
});

// Add to cart
const addedId = ref("");
let addedTimer: ReturnType<typeof setTimeout> | undefined;
const add = (p: DemoProduct) => {
  cart.add(p.id);
  addedId.value = p.id;
  if (addedTimer) clearTimeout(addedTimer);
  addedTimer = setTimeout(() => (addedId.value = ""), 1500);
}
</script>
