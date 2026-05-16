<template>
  <div>
    <header class="max-w-6xl mx-auto mb-6">
      <LazyVBreadcrumb />

      <h1 class="text-4xl font-bold tracking-tight mb-4">
        {{ t("dashboard.settings.payment.title") }}
      </h1>
      <p class="text-sm text-tx-secondary max-w-2xl leading-relaxed">
        {{ t("dashboard.settings.payment.subtitle") }}
      </p>
    </header>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const emit = defineEmits(["open-test-modal", "open-stripe-modal"]);
</script>