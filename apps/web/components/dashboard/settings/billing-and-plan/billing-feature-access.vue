<template>
  <div>
    <section
      class="bg-bg-primary border border-border-subtle rounded-2xl overflow-hidden"
    >
      <div class="px-4 py-3.5 bg-bg-elevated border-b border-border-subtle">
        <h3 class="font-bold text-lg">
          {{ t("dashboard.settings.billing.featureAccess") }}
        </h3>
      </div>
      <div class="px-4 py-3.5">
        <!-- Column headers -->
        <div
          class="grid grid-cols-3 text-[10px] font-black text-tx-muted tracking-widest mb-6 px-4"
        >
          <span>{{ t("dashboard.settings.billing.capability") }}</span>
          <span class="text-center">{{
            t("dashboard.settings.billing.currentPlan")
          }}</span>
          <span class="text-end">{{
            t("dashboard.settings.billing.enterprise")
          }}</span>
        </div>
        <!-- Rows -->
        <div class="space-y-1">
          <div
            v-for="f in features"
            :key="f.capability"
            class="grid grid-cols-3 items-center p-4 rounded-xl hover:bg-bg-elevated transition-colors border border-transparent hover:border-border-subtle"
          >
            <span class="text-sm font-bold">{{ f.capability }}</span>
            <div class="flex justify-center">
              <span
                v-if="f.available"
                class="text-xs font-medium text-tx-secondary"
                >{{ f.current }}</span
              >
              <Icon v-else name="ph:x-bold" class="text-danger/50" />
            </div>
            <div class="flex justify-end items-center gap-2">
              <span class="text-xs font-bold text-brand">{{
                f.enterprise
              }}</span>
              <Icon name="ph:check-circle-fill" class="text-brand text-xs" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

const features = computed(() => [
  {
    capability: t("dashboard.settings.billing.teamSeats"),
    current: t("dashboard.settings.billing.seats15"),
    enterprise: t("dashboard.settings.billing.unlimited"),
    available: true,
  },
  {
    capability: t("dashboard.settings.billing.customDashboards"),
    current: t("dashboard.settings.billing.total5"),
    enterprise: t("dashboard.settings.billing.unlimited"),
    available: true,
  },
  {
    capability: t("dashboard.settings.billing.dataRetention"),
    current: t("dashboard.settings.billing.days90"),
    enterprise: t("dashboard.settings.billing.years2"),
    available: true,
  },
  {
    capability: t("dashboard.settings.billing.globalSLA"),
    current: t("dashboard.settings.billing.none"),
    enterprise: "99.99%",
    available: false,
  },
]);
</script>