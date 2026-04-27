<template>
  <aside class="lg:col-span-3 space-y-6">
    <div class="bg-bg-primary border border-border-subtle rounded-[16px] p-10">
      <!-- Header -->
      <div class="flex items-center justify-between mb-10">
        <h2 class="text-xl font-bold">
          {{ t("storefront.checkout.orderSummary") }}
        </h2>
        <div
          class="flex items-center gap-2 bg-brand/10 px-2 py-1 rounded-[6px]"
        >
          <Icon name="ph:shopping-bag-fill" class="w-3 h-3 text-brand" />
          <span class="text-[9px] font-black text-brand tracking-widest">
            {{ items.length }} {{ t("storefront.shop.items") }}
          </span>
        </div>
      </div>

      <!-- Product List -->
      <div class="space-y-6 mb-10 border-b border-border-subtle pb-10">
        <div
          v-for="item in items"
          :key="item.id"
          class="flex items-center gap-5 group"
        >
          <div
            class="w-16 h-16 rounded-[8px] overflow-hidden bg-black border border-border-subtle shrink-0"
          >
            <img
              :src="item.img"
              :alt="item.name"
              class="w-full h-full object-cover opacity-80 grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="text-[13px] font-bold text-white leading-tight truncate">
              {{ item.name }}
            </h4>
            <p
              class="text-[10px] text-tx-muted mt-1 font-medium tracking-tighter"
            >
              {{ item.meta }}
            </p>
            <p class="text-[9px] font-bold text-brand mt-1 tracking-widest">
              {{ t("storefront.checkout.qty") }}: {{ item.qty }}
            </p>
          </div>
          <p class="text-[13px] font-bold text-tx-secondary shrink-0">
            EGP {{ item.price }}
          </p>
        </div>
      </div>

      <!-- Price Breakdown -->
      <div class="space-y-4 mb-10 text-[13px] font-medium text-tx-secondary">
        <div class="flex justify-between">
          <span>{{ t("storefront.checkout.subtotal") }}</span>
          <span class="text-tx-primary">EGP {{ subtotal }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span>{{ t("storefront.checkout.shipping") }}</span>
          <span class="text-brand font-bold">+ EGP {{ shipping }}</span>
        </div>
        <div class="flex justify-between">
          <span>{{ t("storefront.checkout.vat") }}</span>
          <span>EGP {{ vat }}</span>
        </div>
      </div>

      <!-- Total Due -->
      <div class="pt-8 border-t border-border-subtle space-y-2">
        <div class="flex items-baseline justify-between">
          <span class="text-[14px] font-bold tracking-widest text-tx-primary">{{
            t("storefront.checkout.totalDue")
          }}</span>
          <div class="text-end">
            <p
              class="text-[32px] font-bold text-brand tracking-tighter leading-none"
            >
              <span class="text-[14px] me-1 opacity-60">EGP</span>{{ total }}
            </p>
          </div>
        </div>
        <p
          class="text-end text-[9px] font-black text-tx-muted tracking-[0.2em]"
        >
          {{ t("storefront.checkout.allTaxesIncluded") }}
        </p>
      </div>
    </div>

    <!-- Security Badge -->
    <div
      class="bg-black/20 border border-border-subtle rounded-[12px] p-4 px-6 flex items-center gap-4"
    >
      <Icon name="ph:shield-check-fill" class="w-5 h-5 text-brand shrink-0" />
      <p class="text-[11px] font-bold text-tx-muted tracking-widest">
        {{ t("storefront.checkout.secureEncryption") }}
      </p>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import type { ShippingSummaryItem } from "@/types/checkout";

const props = defineProps<{
  items: ShippingSummaryItem[];
  subtotal: string;
  shipping: string;
  vat: string;
  total: string;
}>();
</script>