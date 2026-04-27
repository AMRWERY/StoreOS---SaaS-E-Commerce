<template>
  <div>
    <VBreadcrumb />
    <header
      class="flex flex-col md:flex-row md:items-center justify-between gap-6 max-w-7xl mx-auto"
    >
      <div>
        <h1 class="text-3xl font-bold tracking-tight">
          {{ t("dashboard.settings.staff.title") }}
        </h1>
        <p class="text-sm text-tx-secondary mt-2">
          {{ t("dashboard.settings.staff.subtitle") }}
        </p>
      </div>
      <VButton className="px-6 py-2.5 text-xs font-bold">
        <Icon name="ph:user-plus-bold" class="w-4 h-4" />
        {{ t("dashboard.settings.staff.inviteStaff") }}
      </VButton>
    </header>
  </div>
</template>

<script lang="ts" setup>
</script>