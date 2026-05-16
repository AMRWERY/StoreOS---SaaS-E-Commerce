<template>
  <div>
    <section class="bg-bg-primary border border-border-subtle rounded-2xl px-4 py-3.5">
      <h3 class="text-[10px] font-black text-tx-muted tracking-widest mb-8">
        {{ t("dashboard.settings.billing.realtimeUsage") }}
      </h3>
      <div class="space-y-6">
        <div v-for="item in usageItems" :key="item.label" class="flex items-center gap-5">
          <div :class="[
            'w-12 h-12 rounded-2xl flex items-center justify-center shrink-0',
            item.bgClass,
          ]">
            <Icon :name="item.icon" :class="['text-2xl', item.iconClass]" />
          </div>
          <div>
            <p class="text-[9px] font-black text-tx-muted mb-1">
              {{ item.label }}
            </p>
            <p class="text-lg font-bold">
              {{ item.value }}
              <span class="text-tx-muted text-xs font-medium">{{
                item.sub
              }}</span>
            </p>
          </div>
        </div>
      </div>
      <LazyVButton variant="ghost" :label="t('dashboard.settings.billing.viewDetailedMetrics')"
        className="w-full mt-10 py-4 text-[10px] font-black tracking-widest" />
    </section>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();

const usageItems = computed(() => [
  {
    label: t("dashboard.settings.billing.connectedNodes"),
    value: "124",
    sub: "/ 150",
    icon: "ph:circles-four-duotone",
    iconClass: "text-brand",
    bgClass: "bg-brand/10",
  },
  {
    label: t("dashboard.settings.billing.dataIngress"),
    value: "1.2 TB",
    sub: "/ mo",
    icon: "ph:cloud-arrow-down-duotone",
    iconClass: "text-accent",
    bgClass: "bg-accent-dim",
  },
]);
</script>