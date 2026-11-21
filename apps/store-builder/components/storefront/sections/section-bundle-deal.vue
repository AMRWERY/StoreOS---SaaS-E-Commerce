<template>
  <div :class="variant === 'banner' ? 'bg-indigo-50 px-8 py-12' : 'px-8 py-14'">
    <div
      class="mx-auto"
      :class="[
        variant === 'banner' ? 'max-w-5xl' : 'max-w-4xl rounded-2xl border border-neutral-200 bg-white p-6',
      ]"
    >
      <h2 v-if="str('heading')" class="text-xl font-bold text-neutral-900">
        {{ str("heading") }}
      </h2>

      <!-- cards -->
      <div v-if="variant === 'cards'" class="mt-6 flex flex-col items-center gap-4 md:flex-row">
        <template v-for="(p, i) in products" :key="p.id">
          <Icon v-if="i > 0" name="ph:plus-bold" class="text-xl text-neutral-400" />
          <label
            class="relative block w-full cursor-pointer rounded-xl border p-3 md:w-44"
            :class="selected.has(p.id) ? 'border-indigo-600' : 'border-neutral-200 opacity-60'"
          >
            <input
              type="checkbox"
              class="absolute end-3 top-3 size-4 accent-indigo-600"
              :checked="selected.has(p.id)"
              @change="toggle(p.id)"
            />
            <img :src="p.image" :alt="p.title" class="aspect-square w-full rounded-lg object-cover" />
            <p class="mt-2 line-clamp-1 text-sm font-semibold text-neutral-900">{{ p.title }}</p>
            <p class="text-sm text-neutral-500">{{ formatPrice(p.price) }}</p>
          </label>
        </template>
        <div class="w-full rounded-xl bg-neutral-50 p-4 md:ms-auto md:w-56">
          <p class="text-xs text-neutral-500">{{ str("total_label") }}</p>
          <p class="text-2xl font-bold text-neutral-900">{{ formatPrice(total) }}</p>
          <p v-if="savings > 0" class="text-xs font-semibold text-green-600">{{ str("save_label") }} {{ formatPrice(savings) }}</p>
          <button type="button" :disabled="!selected.size" :class="btnClass" class="mt-3 w-full" @click="addBundle">
            {{ addLabel }}
          </button>
        </div>
      </div>

      <!-- list -->
      <div v-else-if="variant === 'list'" class="mt-4">
        <label
          v-for="p in products"
          :key="p.id"
          class="flex cursor-pointer items-center gap-4 border-b border-neutral-200 py-3"
          :class="!selected.has(p.id) && 'opacity-50'"
        >
          <input type="checkbox" class="size-4 accent-indigo-600" :checked="selected.has(p.id)" @change="toggle(p.id)" />
          <img :src="p.image" :alt="p.title" class="size-14 rounded-lg object-cover" />
          <span class="flex-1 text-sm font-semibold text-neutral-900">{{ p.title }}</span>
          <span class="text-sm text-neutral-600">{{ formatPrice(p.price) }}</span>
        </label>
        <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p class="text-sm text-neutral-500">
            {{ str("total_label") }}:
            <span class="text-lg font-bold text-neutral-900">{{ formatPrice(total) }}</span>
            <span v-if="savings > 0" class="ms-2 text-xs font-semibold text-green-600">{{ str("save_label") }} {{ formatPrice(savings) }}</span>
          </p>
          <button type="button" :disabled="!selected.size" :class="btnClass" @click="addBundle">{{ addLabel }}</button>
        </div>
      </div>

      <!-- banner -->
      <div v-else class="mt-5 flex flex-col items-center gap-5 md:flex-row">
        <div class="flex flex-1 flex-wrap items-center gap-3">
          <button
            v-for="p in products"
            :key="p.id"
            type="button"
            class="flex items-center gap-2 rounded-full border bg-white py-1.5 pe-4 ps-1.5 text-sm"
            :class="selected.has(p.id) ? 'border-indigo-600 text-neutral-900' : 'border-neutral-200 text-neutral-400'"
            @click="toggle(p.id)"
          >
            <img :src="p.image" :alt="p.title" class="size-9 rounded-full object-cover" />
            <span class="font-medium">{{ p.title }}</span>
            <Icon :name="selected.has(p.id) ? 'ph:check-circle-fill' : 'ph:circle-bold'" class="text-indigo-600" />
          </button>
        </div>
        <div class="text-center md:text-end">
          <p class="text-xs text-neutral-500">{{ str("total_label") }}</p>
          <p class="text-2xl font-bold text-neutral-900">{{ formatPrice(total) }}</p>
          <p v-if="savings > 0" class="text-xs font-semibold text-green-600">{{ str("save_label") }} {{ formatPrice(savings) }}</p>
        </div>
        <button type="button" :disabled="!selected.size" :class="btnClass" @click="addBundle">{{ addLabel }}</button>
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

const variant = computed(() => str("variant", "cards"));
const products = computed(() => DEMO_PRODUCTS.slice(0, num("product_count", 3) === 2 ? 2 : 3));
const selected = ref<Set<string>>(new Set(DEMO_PRODUCTS.slice(0, 3).map((p) => p.id)));
const added = ref(false);

const btnClass =
  "rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50";
const addLabel = computed(() => (added.value ? str("added_label") : str("button_label")));

const chosen = computed(() => products.value.filter((p) => selected.value.has(p.id)));
const subtotal = computed(() => chosen.value.reduce((n, p) => n + p.price, 0));
const discountRate = computed(() =>
  chosen.value.length > 1 ? Math.min(90, Math.max(0, num("discount_percent", 10))) / 100 : 0,
);
const savings = computed(() => subtotal.value * discountRate.value);
const total = computed(() => subtotal.value - savings.value);

const toggle = (id: string) => {
  const next = new Set(selected.value);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  selected.value = next;
}

const addBundle = () => {
  chosen.value.forEach((p) => cart.add(p.id));
  added.value = true;
  setTimeout(() => (added.value = false), 2000);
}
</script>
