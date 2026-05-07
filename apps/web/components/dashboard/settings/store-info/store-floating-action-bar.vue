<template>
  <div>
    <div
      class="fixed bottom-10 start-1/2 -translate-x-1/2 bg-bg-overlay/90 backdrop-blur-xl border border-border-default px-6 py-3 rounded-2xl flex items-center gap-8 shadow-2xl z-50"
    >
      <div class="flex items-center gap-3 border-e border-border-default pe-8">
        <Icon name="ph:command-bold" class="text-tx-muted text-lg" />
        <span
          class="text-[11px] font-black tracking-widest text-tx-secondary"
          >{{ t("dashboard.settings.quickAction") }}</span
        >
      </div>
      <div class="flex items-center gap-6">
        <VButton
          variant="ghost"
          size="none"
          className="flex items-center gap-2 text-xs font-bold text-tx-secondary hover:text-tx-primary transition-colors"
        >
          <Icon name="ph:eye-bold" /> {{ t("dashboard.settings.previewStore") }}
        </VButton>

        <VButton
          variant="ghost"
          size="none"
          className="flex items-center gap-2 text-xs font-bold text-tx-secondary hover:text-tx-primary transition-colors"
        >
          <Icon name="ph:list-bullets-bold" />
          {{ t("dashboard.settings.logs") }}
        </VButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
</script>