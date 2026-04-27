<template>
  <div>
    <VBreadcrumb />

    <header
      class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6"
    >
      <div>
        <span class="text-[10px] font-black tracking-[0.3em] text-tx-muted">{{
          t("dashboard.settings.shipping.operationalConfig")
        }}</span>
        <h1 class="text-4xl font-bold tracking-tight text-tx-primary mt-2">
          {{ t("dashboard.settings.shipping.title") }}
        </h1>
        <p class="text-sm text-tx-secondary mt-3 max-w-xl leading-relaxed">
          {{ t("dashboard.settings.shipping.subtitle") }}
        </p>
      </div>
      <VButton class="shrink-0" icon="ph:plus-circle-bold" iconPosition="left">
        {{ t("dashboard.settings.shipping.addShippingZone") }}
      </VButton>
    </header>
  </div>
</template>

<script lang="ts" setup>
</script>