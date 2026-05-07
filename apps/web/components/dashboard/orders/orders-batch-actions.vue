<template>
  <div>
    <div
      class="fixed bottom-8 start-1/2 -translate-x-1/2 flex items-center px-2 py-2 bg-bg-primary border border-border-default rounded-2xl shadow-2xl shadow-black z-50">
      <div class="flex items-center gap-4 border-e border-border-subtle px-4 me-4">
        <div class="w-7 h-7 bg-brand rounded-lg flex items-center justify-center text-xs font-black text-tx-primary">
          {{ selectedCount }}
        </div>
        <span class="text-xs font-bold text-tx-secondary tracking-widest">{{
          t("dashboard.orders.selected")
        }}</span>
      </div>
      <div class="flex items-center gap-1">
        <LazyVButton variant="none"
          className="flex items-center gap-2 px-4 py-3 text-[10px] font-black tracking-widest text-tx-secondary hover:text-tx-primary transition-colors">
          <Icon name="ph:check-circle-bold" class="text-brand text-sm" />
          {{ t("dashboard.orders.confirmSelected") }}
        </LazyVButton>
        <LazyVButton variant="none"
          className="flex items-center gap-2 px-4 py-3 text-[10px] font-black tracking-widest text-tx-secondary hover:text-tx-primary transition-colors">
          <Icon name="ph:printer-bold" class="text-sm" />
          {{ t("dashboard.orders.printLabels") }}
        </LazyVButton>
        <LazyVButton variant="none"
          className="flex items-center gap-2 px-4 py-3 text-[10px] font-black tracking-widest text-tx-secondary hover:text-tx-primary transition-colors">
          <Icon name="ph:export-bold" class="text-sm" />
          {{ t("dashboard.orders.export") }}
        </LazyVButton>
        <div class="w-px h-6 bg-bg-elevated mx-2"></div>
        <LazyVButton variant="none"
          className="flex items-center gap-2 px-4 py-3 text-[10px] font-black tracking-widest text-danger/80 hover:text-danger transition-colors">
          <Icon name="ph:x-circle-bold" class="text-sm" />
          {{ t("dashboard.orders.cancelSelected") }}
        </LazyVButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
defineProps<{
  selectedCount: number;
}>();
</script>