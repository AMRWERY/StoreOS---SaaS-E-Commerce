<template>
  <div class="px-4 py-10 sm:px-8">
    <div class="mx-auto" :class="variant === 'compact' ? 'max-w-2xl' : 'max-w-5xl'">
      <h1 class="text-start text-2xl font-bold text-neutral-900">{{ str("heading") }}</h1>

      <div
        v-if="!cart.items.value.length"
        class="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-neutral-200 py-16 text-center"
      >
        <Icon name="ph:shopping-cart-simple-bold" class="text-4xl text-neutral-300" />
        <h2 class="mt-3 text-lg font-bold text-neutral-900">{{ str("emptyTitle") }}</h2>
        <p class="mt-1 text-sm text-neutral-500">{{ str("emptyText") }}</p>
        <button type="button" class="mt-5 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white">
          {{ str("emptyCta") }}
        </button>
      </div>

      <div v-else class="mt-8 gap-8" :class="variant === 'compact' ? 'space-y-6' : 'grid lg:grid-cols-3'">
        <div :class="variant === 'compact' ? '' : 'lg:col-span-2'">
          <div
            v-if="variant === 'table'"
            class="hidden rounded-t-2xl border border-b-0 border-neutral-200 bg-neutral-50 px-4 py-2.5 text-xs font-semibold uppercase text-neutral-500 sm:grid"
            :class="ui.cols"
          >
            <span>Product</span>
            <span>Qty</span>
            <span class="text-end">Total</span>
            <span />
          </div>

          <ul :class="ui.list">
            <li v-for="(line, i) in cart.items.value" :key="`${line.productId}-${i}`" :class="[ui.row, ui.cols]">
              <div class="flex min-w-0 items-center gap-3 text-start">
                <img
                  :src="line.product.image"
                  :alt="line.product.title"
                  class="shrink-0 rounded-xl bg-neutral-50 object-cover"
                  :class="ui.img"
                />
                <div class="min-w-0">
                  <h3 class="truncate text-sm font-semibold text-neutral-900">{{ line.product.title }}</h3>
                  <p v-if="line.size || line.color" class="mt-0.5 flex items-center gap-2 text-xs text-neutral-500">
                    <span v-if="line.size">{{ line.size }}</span>
                    <span v-if="line.color" class="inline-block size-3 rounded-full border border-neutral-200" :style="{ backgroundColor: line.color }" />
                  </p>
                  <p v-if="variant === 'compact'" class="mt-0.5 text-xs text-neutral-400">{{ formatPrice(line.product.price) }}</p>
                </div>
              </div>

              <div class="flex w-fit items-center rounded-xl border border-neutral-200">
                <button type="button" class="px-2.5 py-1.5 text-neutral-900" aria-label="-" @click="cart.setQty(i, line.qty - 1)">
                  <Icon name="ph:minus-bold" />
                </button>
                <span class="w-7 text-center text-sm font-semibold text-neutral-900">{{ line.qty }}</span>
                <button type="button" class="px-2.5 py-1.5 text-neutral-900" aria-label="+" @click="cart.setQty(i, line.qty + 1)">
                  <Icon name="ph:plus-bold" />
                </button>
              </div>

              <span class="text-end text-sm font-bold text-neutral-900">{{ formatPrice(line.product.price * line.qty) }}</span>

              <button type="button" class="justify-self-end text-neutral-400" aria-label="Remove" @click="cart.remove(i)">
                <Icon name="ph:trash-bold" />
              </button>
            </li>
          </ul>
        </div>

        <aside class="h-fit space-y-4 rounded-2xl border border-neutral-200 p-5 text-start">
          <h2 class="text-base font-bold text-neutral-900">{{ str("summaryTitle") }}</h2>

          <div v-if="bool('showShippingProgress')" class="space-y-1.5">
            <p class="text-xs text-neutral-500">
              <template v-if="remaining > 0">{{ formatPrice(remaining) }} to free shipping</template>
              <template v-else>Free shipping unlocked</template>
            </p>
            <div class="h-2 overflow-hidden rounded-full bg-neutral-100">
              <div class="h-full rounded-full bg-indigo-600" :style="{ width: progress + '%' }" />
            </div>
          </div>

          <div v-if="bool('showCoupon')">
            <div class="flex gap-2">
              <input
                v-model="code"
                type="text"
                placeholder="WELCOME10"
                class="min-w-0 flex-1 rounded-xl border border-neutral-200 px-3 py-2 text-sm text-neutral-900"
                @keyup.enter="apply"
              />
              <button type="button" class="rounded-xl border border-neutral-900 px-4 py-2 text-sm font-semibold text-neutral-900" @click="apply">
                OK
              </button>
            </div>
            <p v-if="couponState === 'bad'" class="mt-1 text-xs text-red-500">!</p>
            <p v-else class="mt-1 text-xs text-neutral-400">{{ str("couponHint") }}</p>
          </div>

          <dl class="space-y-2 border-t border-neutral-200 pt-4 text-sm">
            <div class="flex justify-between text-neutral-500">
              <dt>Subtotal</dt>
              <dd class="font-medium text-neutral-900">{{ formatPrice(cart.subtotal.value) }}</dd>
            </div>
            <div v-if="cart.discount.value > 0" class="flex justify-between text-emerald-600">
              <dt>{{ cart.coupon.value.toUpperCase() }}</dt>
              <dd class="font-medium">-{{ formatPrice(cart.discount.value) }}</dd>
            </div>
            <div class="flex justify-between text-neutral-500">
              <dt>Shipping</dt>
              <dd class="font-medium text-neutral-900">{{ shipping === 0 ? "Free" : formatPrice(shipping) }}</dd>
            </div>
            <div class="flex justify-between border-t border-neutral-200 pt-3 text-base font-bold text-neutral-900">
              <dt>Total</dt>
              <dd>{{ formatPrice(cart.total.value + shipping) }}</dd>
            </div>
          </dl>

          <div :class="variant === 'compact' ? 'flex flex-col gap-2 sm:flex-row' : 'space-y-3'">
            <button type="button" class="w-full rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white">
              {{ str("checkoutLabel") }}
            </button>
            <button type="button" class="w-full rounded-xl border border-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-900">
              {{ str("continueLabel") }}
            </button>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PageSection } from "@/types/sections";
import { formatPrice } from "@/data/demo-catalog";

const props = defineProps<{ section: PageSection }>();
const { str, num, bool } = useSectionData(() => props.section);
const cart = useDemoCart();

const variant = computed(() => str("variant", "table"));
const UI = {
  table: {
    list: "divide-y divide-neutral-200 rounded-2xl border border-neutral-200 sm:rounded-t-none",
    row: "grid items-center gap-3 p-4",
    cols: "grid-cols-[1fr_auto] sm:grid-cols-[1fr_7rem_5rem_2rem]",
    img: "size-16",
  },
  cards: {
    list: "space-y-3",
    row: "grid items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm",
    cols: "grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_5rem_2rem]",
    img: "size-24",
  },
  compact: {
    list: "divide-y divide-neutral-200",
    row: "grid items-center gap-3 py-3",
    cols: "grid-cols-[1fr_auto_4.5rem_1.5rem]",
    img: "size-12",
  },
} as const;
const ui = computed(() => UI[variant.value as keyof typeof UI] ?? UI.table);

const code = ref(cart.coupon.value);
const couponState = ref<"idle" | "ok" | "bad">("idle");

const threshold = computed(() => num("freeShippingThreshold", 100));
const remaining = computed(() => Math.max(0, threshold.value - cart.total.value));
const progress = computed(() =>
  threshold.value > 0 ? Math.min(100, (cart.total.value / threshold.value) * 100) : 100,
);
const shipping = computed(() =>
  cart.items.value.length === 0 || cart.total.value >= threshold.value ? 0 : num("shippingFee", 8),
);

function apply() {
  if (!code.value.trim()) {
    cart.applyCoupon("");
    couponState.value = "idle";
    return;
  }
  couponState.value = cart.applyCoupon(code.value) ? "ok" : "bad";
}
</script>
