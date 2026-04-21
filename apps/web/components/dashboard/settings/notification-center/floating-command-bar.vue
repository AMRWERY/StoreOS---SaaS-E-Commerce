<template>
  <div>
    <div
      class="fixed bottom-10 start-1/2 -translate-x-1/2 bg-bg-overlay/90 backdrop-blur-xl border border-border-default px-6 py-3 rounded-2xl flex items-center gap-6 shadow-2xl z-50">
      <div class="flex items-center gap-2 border-e border-border-default pe-6">
        <div class="flex gap-1">
          <span class="bg-bg-elevated text-[9px] font-bold px-1.5 py-0.5 rounded text-tx-secondary">⌘</span>
          <span class="bg-bg-elevated text-[9px] font-bold px-1.5 py-0.5 rounded text-tx-secondary">P</span>
        </div>
        <span class="text-[11px] font-bold text-tx-secondary ms-2">{{ $t('dashboard.settings.notifications.quickNavigation') }}</span>
      </div>
      <Icon name="ph:lightning-fill" class="text-brand text-lg" />
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>