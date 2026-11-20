<template>
  <img
    v-if="logo"
    :src="logo"
    :alt="store.displayName"
    class="h-8 w-auto max-w-[160px] object-contain"
  />
  <span v-else>{{ store.displayName }}</span>
</template>

<script lang="ts" setup>
/** The store's logo image when one is set, otherwise its name as text (styled by the parent via class). */
const store = useBuilderStore();
const logo = computed(() => store.siteSettings.logoUrl.trim());
</script>
