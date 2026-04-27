<template>
  <div>
    <div
      class="fixed bottom-10 start-1/2 -translate-x-1/2 bg-bg-overlay/90 backdrop-blur-xl border border-border-default px-6 py-3 rounded-2xl flex items-center gap-8 shadow-2xl z-50"
    >
      <div class="flex items-center gap-2 border-e border-border-default pe-8">
        <span
          class="bg-bg-elevated text-[9px] font-bold px-1.5 py-0.5 rounded text-tx-secondary"
          >CMD K</span
        >
      </div>
      <div class="flex items-center gap-8">
        <button
          class="flex items-center gap-2 text-xs font-bold text-tx-secondary hover:text-tx-primary transition-colors"
        >
          <Icon name="ph:rocket-launch-bold" />
          {{ t("dashboard.settings.quickAction") }}
        </button>
        <button
          class="flex items-center gap-2 text-xs font-bold text-tx-secondary hover:text-tx-primary transition-colors"
        >
          <Icon name="ph:clock-counter-clockwise-bold" />
          {{ t("dashboard.settings.shipping.auditLogs") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>