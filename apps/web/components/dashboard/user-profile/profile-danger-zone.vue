<template>
  <section
    class="lg:col-span-12 mt-4 bg-danger-dim border border-danger/20 rounded-2xl px-4 py-3.5 flex flex-col md:flex-row items-center justify-between gap-6"
  >
    <div>
      <h3 class="text-sm font-bold text-danger">
        {{ t("dashboard.profile.dangerZone") }}
      </h3>
      <p class="text-xs text-danger/60 mt-1 font-medium">
        {{ t("dashboard.profile.deleteDesc") }}
      </p>
    </div>
    <VButton
      variant="none"
      className="px-8 py-3 border border-red-500/40 text-danger hover:bg-red-500 hover:text-tx-primary transition-all rounded-xl text-xs font-black tracking-widest"
    >
      {{ t("dashboard.profile.deleteAccount") }}
    </VButton>
  </section>
</template>

<script lang="ts" setup>
</script>