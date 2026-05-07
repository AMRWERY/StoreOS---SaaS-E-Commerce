<template>
  <div>
    <VAlertBanner
      variant="error"
      icon="ph:warning-octagon-bold"
      :dismissible="false"
      class="w-full"
    >
      <div class="flex flex-col gap-1 items-start">
        <h4 class="text-sm font-bold text-danger">
          {{ t("dashboard.settings.shipping.unmappedRegions") }}
        </h4>
        <p class="text-xs text-danger/70 leading-relaxed font-medium">
          {{ t("dashboard.settings.shipping.unmappedRegionsDesc") }}
        </p>
        <button
          class="mt-2 text-[10px] font-black tracking-widest text-danger border-b border-red-400/30 pb-0.5 hover:text-danger hover:border-red-200 transition-all"
        >
          {{ t("dashboard.settings.shipping.fixMappingNow") }}
        </button>
      </div>
    </VAlertBanner>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
</script>