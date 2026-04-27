<template>
  <div>
    <header class="flex items-center justify-between mb-16">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">
          {{ t("dashboard.settings.notifications.title") }}
        </h1>
        <p class="text-sm text-tx-secondary mt-2 max-w-xl leading-relaxed">
          {{ t("dashboard.settings.notifications.subtitle") }}
        </p>
        <div class="flex items-center gap-4 max-w-md mt-3">
          <Icon name="ph:info-bold" class="text-tx-muted shrink-0 text-xl" />
          <p class="text-xs text-tx-muted leading-relaxed font-medium">
            {{ t("dashboard.settings.notifications.changesSync") }}
          </p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <VButton
          variant="ghost"
          @click="$emit('open-stats')"
          className="px-3.5 py-3.5 text-tx-secondary hover:text-tx-primary"
        >
          <template #default>
            <Icon name="ph:bell-simple-bold" class="text-xl" />
          </template>
        </VButton>
        <VButton
          variant="ghost"
          :label="t('dashboard.settings.notifications.discard')"
          @click="$emit('discard')"
          className="px-8 py-3.5 text-xs font-bold"
        />
        <VButton
          :label="t('dashboard.settings.notifications.saveChanges')"
          @click="$emit('save')"
          className="px-10 py-3.5 text-sm"
        />
      </div>
    </header>
  </div>
</template>

<script lang="ts" setup>
defineEmits<{
  (e: "save"): void;
  (e: "discard"): void;
  (e: "open-stats"): void;
}>();
</script>