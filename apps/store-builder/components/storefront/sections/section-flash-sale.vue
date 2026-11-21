<template>
  <div class="px-8 py-14">
    <div
      class="mx-auto"
      :class="
        variant === 'banner'
          ? 'flex max-w-5xl flex-col gap-8 rounded-3xl p-8 lg:flex-row lg:items-center'
          : 'max-w-5xl'
      "
      :style="variant === 'banner' ? { backgroundColor: accent } : undefined"
    >
      <!-- header (shared) -->
      <div
        class="flex flex-col gap-4"
        :class="[
          variant === 'grid' ? 'items-center text-center' : 'items-start text-start',
          variant === 'banner' ? 'text-white lg:w-64 lg:shrink-0' : '',
        ]"
      >
        <h2 v-if="str('heading')" class="text-2xl font-bold" :class="variant === 'banner' ? 'text-white' : 'text-neutral-900'">
          <Icon name="ph:lightning-fill" class="align-[-0.15em]" :style="variant === 'banner' ? undefined : { color: accent }" />
          {{ str("heading") }}
        </h2>
        <p v-if="str('subheading')" class="text-sm" :class="variant === 'banner' ? 'text-white/80' : 'text-neutral-500'">
          {{ str("subheading") }}
        </p>
        <div v-if="remaining > 0" class="flex gap-2">
          <div
            v-for="unit in units"
            :key="unit.label"
            class="rounded-xl py-2 text-center"
            :class="[
              variant === 'list' ? 'w-12' : 'w-16',
              variant === 'banner' ? 'bg-white' : 'text-white',
            ]"
            :style="variant === 'banner' ? { color: accent } : { backgroundColor: accent }"
          >
            <p class="font-bold tabular-nums" :class="variant === 'list' ? 'text-base' : 'text-xl'">{{ unit.value }}</p>
            <p class="text-[10px] uppercase opacity-80">{{ unit.label }}</p>
          </div>
        </div>
        <p v-else class="text-sm font-semibold" :class="variant === 'banner' ? 'text-white' : 'text-neutral-500'">
          {{ str("ended_text") }}
        </p>
      </div>

      <!-- grid -->
      <div
        v-if="variant === 'grid'"
        class="mt-10 grid grid-cols-2 gap-5"
        :class="count === 2 ? 'sm:grid-cols-2' : count === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-4'"
      >
        <div v-for="p in products" :key="p.id" class="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <span class="absolute start-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold text-white" :style="{ backgroundColor: accent }">
            {{ badge }}
          </span>
          <img :src="p.image" :alt="p.title" class="aspect-square w-full object-cover" />
          <div class="p-4">
            <p class="line-clamp-1 text-sm font-semibold text-neutral-900">{{ p.title }}</p>
            <p class="mt-1 flex items-baseline gap-2">
              <span class="text-base font-bold" :style="{ color: accent }">{{ formatPrice(p.sale) }}</span>
              <span class="text-xs text-neutral-400 line-through">{{ formatPrice(p.price) }}</span>
            </p>
            <button type="button" :class="btnClass" class="mt-3 w-full" @click="add(p.id)">{{ btnLabel(p.id) }}</button>
          </div>
        </div>
      </div>

      <!-- banner -->
      <div v-else-if="variant === 'banner'" class="grid flex-1 grid-cols-2 gap-3" :class="count > 2 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'">
        <div v-for="p in products.slice(0, 3)" :key="p.id" class="relative overflow-hidden rounded-2xl bg-white">
          <span class="absolute start-2 top-2 rounded-full bg-neutral-900 px-2 py-0.5 text-[10px] font-bold text-white">{{ badge }}</span>
          <img :src="p.image" :alt="p.title" class="aspect-[4/3] w-full object-cover" />
          <div class="p-3">
            <p class="line-clamp-1 text-xs font-semibold text-neutral-900">{{ p.title }}</p>
            <p class="mt-0.5 flex items-baseline gap-1.5">
              <span class="text-sm font-bold" :style="{ color: accent }">{{ formatPrice(p.sale) }}</span>
              <span class="text-[11px] text-neutral-400 line-through">{{ formatPrice(p.price) }}</span>
            </p>
            <button type="button" :class="btnClass" class="mt-2 w-full !py-1.5 text-xs" @click="add(p.id)">{{ btnLabel(p.id) }}</button>
          </div>
        </div>
      </div>

      <!-- list -->
      <div v-else class="mt-8 space-y-3">
        <div v-for="p in products" :key="p.id" class="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-3">
          <img :src="p.image" :alt="p.title" class="size-16 shrink-0 rounded-xl object-cover" />
          <div class="min-w-0 flex-1">
            <span class="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" :style="{ backgroundColor: accent }">{{ badge }}</span>
            <p class="mt-1 truncate text-sm font-semibold text-neutral-900">{{ p.title }}</p>
            <p class="flex items-baseline gap-2">
              <span class="text-sm font-bold" :style="{ color: accent }">{{ formatPrice(p.sale) }}</span>
              <span class="text-xs text-neutral-400 line-through">{{ formatPrice(p.price) }}</span>
            </p>
          </div>
          <button type="button" :class="btnClass" class="shrink-0" @click="add(p.id)">{{ btnLabel(p.id) }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";
import { DEMO_PRODUCTS, formatPrice } from "@/data/demo-catalog";

const props = defineProps<{ section: PageSection }>();
const { str, num } = useSectionData(() => props.section);
const cart = useDemoCart();

const variant = computed(() => str("variant", "grid"));
const accent = computed(() => str("accent_color", "#e11d48"));
const percent = computed(() => Math.min(90, Math.max(1, num("percent_off", 30))));
const count = computed(() => num("product_count", 4));
const badge = computed(() => `-${percent.value}% ${str("badge_text")}`);
const btnClass = "rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700";
const products = computed(() =>
  DEMO_PRODUCTS.slice(0, count.value).map((p) => ({
    ...p,
    sale: Math.round(p.price * (1 - percent.value / 100) * 100) / 100,
  })),
);

const endAt = ref(Date.now() + num("hours_left", 24) * 3600_000);
const now = ref(Date.now());
let timer: ReturnType<typeof setInterval> | undefined;

watch(
  () => num("hours_left", 24),
  (h) => {
    endAt.value = Date.now() + h * 3600_000;
  },
);

onMounted(() => {
  endAt.value = Date.now() + num("hours_left", 24) * 3600_000;
  now.value = Date.now();
  timer = setInterval(() => (now.value = Date.now()), 1000);
});
onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});

const remaining = computed(() => Math.max(0, endAt.value - now.value));
const pad = (n: number) => String(n).padStart(2, "0");
const units = computed(() => {
  const s = Math.floor(remaining.value / 1000);
  return [
    { label: str("label_days"), value: pad(Math.floor(s / 86400)) },
    { label: str("label_hours"), value: pad(Math.floor((s % 86400) / 3600)) },
    { label: str("label_minutes"), value: pad(Math.floor((s % 3600) / 60)) },
    { label: str("label_seconds"), value: pad(s % 60) },
  ];
});

const addedId = ref("");
const btnLabel = (id: string) => (addedId.value === id ? str("added_label") : str("button_label"));
const add = (id: string) => {
  cart.add(id);
  addedId.value = id;
  setTimeout(() => {
    if (addedId.value === id) addedId.value = "";
  }, 1500);
}
</script>
