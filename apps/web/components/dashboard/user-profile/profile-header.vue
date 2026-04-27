<template>
  <header
    class="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6"
  >
    <div>
      <h1 class="text-3xl font-bold tracking-tight text-tx-primary">
        {{ t("dashboard.profile.myProfile") }}
      </h1>
      <p class="text-[10px] font-black text-tx-muted tracking-[0.2em] mt-2">
        MARCUS THORNE • STORE ID: 8823-001-ALPHA
      </p>
    </div>
    <VButton
      variant="primary"
      @click="$emit('save')"
      className="px-6 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all active:scale-[0.98] flex items-center gap-2"
    >
      <Icon name="ph:floppy-disk-back-bold" class="text-base" />
      {{ t("common.saveChanges") }}
    </VButton>
  </header>
</template>

<script lang="ts" setup>
defineEmits(["save"]);
</script>