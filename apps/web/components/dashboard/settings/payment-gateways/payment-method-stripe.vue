<template>
  <section
    class="bg-bg-primary border border-border-subtle rounded-2xl px-4 py-3.5 flex flex-col justify-between"
  >
    <div class="flex justify-between items-start mb-6">
      <div class="flex items-center gap-4">
        <div
          class="w-12 h-12 rounded-2xl bg-bg-elevated flex items-center justify-center border border-border-subtle"
        >
          <Icon
            name="ph:stripe-logo-duotone"
            class="text-tx-secondary text-2xl"
          />
        </div>
        <div>
          <h3 class="text-base font-bold">
            {{ t("dashboard.settings.payment.stripe") }}
          </h3>
          <p class="text-xs text-tx-secondary mt-1">
            {{ t("dashboard.settings.payment.stripeDesc") }}
          </p>
        </div>
      </div>
      <span
        class="text-[8px] font-black text-accent/60 border border-accent/20 px-2 py-0.5 rounded tracking-widest"
        >{{ t("dashboard.settings.payment.disconnected") }}</span
      >
    </div>

    <div class="mt-auto">
      <VButton
        variant="none"
        className="w-full bg-brand-hover hover:bg-brand text-tx-primary py-4 rounded-2xl font-black text-[11px] tracking-widest flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
      >
        <Icon name="ph:link-bold" class="text-base" />
        {{ t("dashboard.settings.payment.connectStripe") }}
      </VButton>
      <p
        class="text-center text-[8px] font-bold text-tx-muted tracking-[0.2em] mt-4"
      >
        {{ t("dashboard.settings.payment.redirectsToStripe") }}
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>
const { t } = useI18n()
</script>