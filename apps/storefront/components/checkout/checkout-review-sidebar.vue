<template>
  <aside class="w-full md:w-80 shrink-0 space-y-5">
    <!-- Order Summary -->
    <section class="bg-bg-primary border border-border-subtle rounded-[16px] p-8">
      <h3 class="text-[11px] font-black mb-8 tracking-widest text-tx-secondary">
        {{ t("storefront.checkout.orderSummary") }}
      </h3>

      <div class="space-y-4 border-b border-border-subtle pb-8 mb-8 text-[13px] font-medium text-tx-secondary">
        <div class="flex justify-between">
          <span>{{ t("storefront.checkout.subtotal") }}</span>
          <span class="text-tx-primary">${{ summary.subtotal }}</span>
        </div>
        <div class="flex justify-between">
          <span>{{ t("storefront.checkout.shipping") }}</span>
          <span class="text-tx-primary">${{ summary.shipping }}</span>
        </div>
        <div class="flex justify-between">
          <span>{{ t("storefront.checkout.tax") }}</span>
          <span class="text-tx-primary">${{ summary.tax }}</span>
        </div>
      </div>

      <div class="flex items-baseline justify-between mb-8">
        <span class="text-[13px] font-bold text-tx-primary tracking-widest">{{
          t("storefront.checkout.total")
        }}</span>
        <p class="text-3xl font-bold text-brand tracking-tighter leading-none">
          <span class="text-base opacity-60 me-1">$</span>{{ summary.total }}
        </p>
      </div>

      <!-- Payment Method -->
      <div class="bg-black/30 border border-border-subtle rounded-[12px] p-4 flex items-center gap-4">
        <Icon name="ph:credit-card-fill" class="w-5 h-5 text-[#F97316] shrink-0" />
        <div>
          <p class="text-[9px] font-black text-tx-muted tracking-widest">
            {{ t("storefront.checkout.paymentMethod") }}
          </p>
          <p class="text-[11px] font-bold text-tx-secondary">
            StoreOS Terminal Credit (•••• {{ lastFour }})
          </p>
        </div>
      </div>
    </section>

    <!-- Shipping Address -->
    <section class="bg-bg-primary border border-border-subtle rounded-[16px] p-8">
      <div class="flex items-center gap-3 mb-6">
        <Icon name="ph:map-pin-fill" class="w-4 h-4 text-brand shrink-0" />
        <h3 class="text-[11px] font-black tracking-widest text-tx-secondary">
          {{ t("storefront.checkout.shippingAddress") }}
        </h3>
      </div>
      <div class="space-y-1 text-[13px] font-medium text-tx-secondary leading-relaxed">
        <p class="text-white font-bold mb-2">{{ address.name }}</p>
        <p>{{ address.line1 }}</p>
        <p>{{ address.line2 }}</p>
        <p>{{ address.postcode }}</p>
      </div>
    </section>

    <!-- Support -->
    <section class="bg-brand/5 border border-brand/10 rounded-[16px] p-8 space-y-5">
      <div class="flex items-center gap-3">
        <Icon name="ph:chat-dots-fill" class="w-4 h-4 text-brand shrink-0" />
        <h3 class="text-[11px] font-black tracking-widest text-tx-secondary">
          {{ t("storefront.checkout.needAssistance") }}
        </h3>
      </div>
      <p class="text-[12px] text-tx-muted leading-relaxed font-medium">
        {{ t("storefront.checkout.supportDesc") }}
      </p>
      <LazyVButton variant="none"
        className="w-full bg-bg-elevated hover:bg-bg-overlay text-tx-secondary hover:text-white border border-border-default py-3 rounded-[10px] text-[11px] font-bold tracking-widest transition-all">
        {{ t("storefront.checkout.openSupportTicket") }}
      </LazyVButton>
    </section>
  </aside>
</template>

<script lang="ts" setup>
import type { OrderSummary, ShippingAddress } from "@/types/checkout";

const { t } = useI18n()

withDefaults(
  defineProps<{
    summary: OrderSummary;
    address: ShippingAddress;
    lastFour?: string;
  }>(),
  { lastFour: "0000" }
);
</script>