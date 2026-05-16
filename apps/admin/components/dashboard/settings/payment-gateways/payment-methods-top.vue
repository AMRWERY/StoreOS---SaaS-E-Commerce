<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Cash on Delivery -->
      <section
        class="bg-bg-primary border border-border-subtle rounded-2xl px-4 py-3.5 flex flex-col justify-between"
      >
        <div class="flex justify-between items-start mb-6">
          <div class="flex items-center gap-4">
            <div
              class="w-12 h-12 rounded-2xl bg-brand-dim flex items-center justify-center border border-indigo-500/10"
            >
              <Icon name="ph:money-duotone" class="text-brand text-2xl" />
            </div>
            <div>
              <h3 class="text-base font-bold">
                {{ t("dashboard.settings.payment.cashOnDelivery") }}
              </h3>
              <div class="flex items-center gap-1.5 mt-1">
                <div
                  class="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_#10b981]"
                ></div>
                <span class="text-[9px] font-black text-success tracking-widest"
                  >{{ t("common.status") }}: {{ t("common.active") }}</span
                >
              </div>
            </div>
          </div>
          <!-- Toggle -->
          <LazyVSwitchButton v-model="codActive" />
        </div>

        <div
          class="bg-bg-overlay border border-border-subtle rounded-xl p-5 mb-6"
        >
          <p class="text-[9px] font-black text-tx-muted tracking-widest mb-2">
            Settlement_Type
          </p>
          <p class="text-sm font-bold text-tx-secondary">
            {{ t("dashboard.settings.payment.immediateExchange") }}
          </p>
        </div>

        <div
          class="flex justify-between text-[9px] font-black text-tx-muted tracking-widest"
        >
          <span>Fee: 0.00%</span>
          <span>Limit: $5,000.00</span>
        </div>
      </section>

      <payment-method-stripe />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
const codActive = ref(true);
</script>