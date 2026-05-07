<template>
  <div>
    <section
      class="bg-bg-primary border border-border-subtle rounded-2xl px-4 py-3.5 flex flex-col lg:flex-row items-center gap-12"
    >
      <div class="flex items-center gap-6 lg:w-1/3 shrink-0">
        <div
          class="w-14 h-14 rounded-2xl bg-danger-dim flex items-center justify-center border border-danger/10"
        >
          <Icon name="ph:broadcast-bold" class="text-danger text-2xl" />
        </div>
        <div>
          <h3 class="text-base font-bold">
            {{ t("dashboard.settings.payment.vodafone") }}
          </h3>
          <p class="text-xs text-tx-secondary font-medium">
            {{ t("dashboard.settings.payment.vodafoneDesc") }}
          </p>
        </div>
      </div>
      <div class="flex-1 w-full flex flex-col md:flex-row items-end gap-4">
        <div class="flex-1 w-full">
          <VInput
            label="Collection_Wallet_Number"
            modelValue="10 1234 5678"
            readonly
            inputClass="bg-bg-primary ps-16 text-tx-primary text-sm"
          >
            <template #prefix>
              <span
                class="absolute start-4 top-1/2 -translate-y-1/2 text-tx-secondary font-bold border-e border-border-default pe-3 text-sm flex items-center"
                >+20</span
              >
            </template>
          </VInput>
        </div>
        <VButton
          variant="secondary"
          className="px-8 py-3 bg-bg-elevated hover:bg-bg-elevated border border-border-default rounded-xl text-[11px] font-black tracking-widest text-tx-secondary transition-colors"
        >
          {{ t("dashboard.settings.payment.verify") }}
        </VButton>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
</script>