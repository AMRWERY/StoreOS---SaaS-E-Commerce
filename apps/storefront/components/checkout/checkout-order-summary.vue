<template>
  <aside class="space-y-6">
    <div
      class="bg-bg-primary border border-border-subtle rounded-[12px] p-8 shadow-2xl"
    >
      <h2 class="text-xl font-bold mb-8">
        {{ t("storefront.checkout.orderSummary") }}
      </h2>

      <!-- Line Items -->
      <div class="space-y-4 border-b border-border-subtle pb-8">
        <div
          class="flex justify-between text-[13px] font-medium text-tx-secondary"
        >
          <span>{{ t("storefront.checkout.subtotal") }}</span>
          <span class="text-tx-primary">${{ subtotal.toFixed(2) }}</span>
        </div>
        <div
          class="flex justify-between text-[13px] font-medium text-tx-secondary"
        >
          <span>{{ t("storefront.checkout.shipping") }}</span>
          <span class="text-[11px] italic text-tx-muted">{{
            t("storefront.checkout.calculatedNextStep")
          }}</span>
        </div>
        <div
          class="flex justify-between text-[13px] font-medium text-tx-secondary"
        >
          <span>{{ t("storefront.checkout.discount") }}</span>
          <span class="text-[#EF4444]">-$0.00</span>
        </div>
      </div>

      <!-- Discount Code -->
      <div class="mt-8 space-y-3">
        <p class="text-[10px] font-black text-tx-muted tracking-widest">
          {{ t("storefront.checkout.discountCode") }}
        </p>
        <div class="flex gap-2">
          <VInput
            v-model="discountCode"
            :placeholder="t('storefront.checkout.enterCode')"
            inputClass="!flex-1 !bg-black !border-border-subtle !rounded-[8px] !px-4 !py-2.5 !text-[11px] !font-bold !tracking-widest focus:!border-brand !outline-none !transition-colors !placeholder:text-tx-muted"
          />
          <VButton
            variant="none"
            className="bg-border-subtle hover:bg-border-default px-4 rounded-[8px] text-[10px] font-black tracking-widest transition-colors"
            @click="applyDiscount"
          >
            {{ t("storefront.checkout.apply") }}
          </VButton>
        </div>
      </div>

      <!-- Total -->
      <div class="mt-10 mb-8 flex items-end justify-between">
        <div class="space-y-1">
          <p class="text-[9px] font-black text-tx-muted tracking-[0.2em]">
            {{ t("storefront.checkout.estimatedTotal") }}
          </p>
          <h3 class="text-[12px] font-black tracking-widest text-tx-secondary">
            {{ t("storefront.checkout.total") }}
          </h3>
        </div>
        <p class="text-[32px] font-bold text-white tracking-tighter">
          <span class="text-[18px] text-tx-muted me-1">$</span>
          {{ total.toFixed(2) }}
        </p>
      </div>

      <VButton
        variant="none"
        className="w-full bg-brand hover:bg-brand-hover text-white py-4 rounded-[12px] font-bold text-[14px] tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)] active:scale-[0.98]"
        @click="$emit('proceed')"
      >
        {{ t("storefront.checkout.proceedToCheckout") }}
      </VButton>

      <p
        class="text-center text-[8px] font-black text-tx-muted tracking-[0.2em] mt-6"
      >
        {{ t("storefront.checkout.taxesAtFinalStep") }}
      </p>
    </div>

    <!-- Priority Alert -->
    <div
      class="bg-indigo-500/5 border border-brand/20 rounded-[12px] p-6 flex items-start gap-4"
    >
      <Icon name="ph:info-fill" class="w-5 h-5 text-brand shrink-0 mt-1" />
      <p class="text-[11px] text-tx-secondary leading-relaxed font-medium">
        {{ t("storefront.checkout.ordersPlacedWithin") }}
        <span class="text-brand font-bold">{{ countdown }}</span>
        {{ t("storefront.checkout.willShipToday") }}
      </p>
    </div>
  </aside>
</template>

<script lang="ts" setup>
const { t } = useI18n()
defineProps<{
  subtotal: number;
  total: number;
}>();

defineEmits<{
  proceed: [];
}>();

const discountCode = ref("");

const applyDiscount = () => {
  // discount logic here
};

const countdown = ref("02:14:55");
</script>
