<template>
  <div>
    <section
      class="bg-bg-primary border border-border-subtle rounded-2xl px-4 py-3.5"
    >
      <div class="flex items-center gap-3 mb-6">
        <Icon name="ph:truck-bold" class="text-brand text-lg" />
        <h3 class="text-xs font-black tracking-widest text-tx-secondary">
          {{ t("dashboard.settings.shipping.defaultCarrier") }}
        </h3>
      </div>

      <div class="space-y-4">
        <LazyVSelectInput
          :label="t('dashboard.settings.shipping.activeGateway')"
          :options="['FedEx Priority Global', 'DHL Express']"
          selectClass="!bg-bg-primary !border-border-default !rounded-xl !px-4 !py-3 !text-sm focus:!border-brand"
        />

        <div class="flex justify-between items-end pt-4">
          <div class="space-y-1">
            <p class="text-[10px] font-bold text-tx-muted">
              {{ t("dashboard.settings.shipping.apiStatus") }}
            </p>
            <p class="text-[10px] font-bold text-tx-muted">
              {{ t("dashboard.settings.shipping.lastPing") }}: 14:02:11 UTC
            </p>
          </div>
          <span
            class="rounded-full px-2 py-0.5 text-[10px] font-semibold bg-success-dim text-success"
            >Active</span
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
</script>