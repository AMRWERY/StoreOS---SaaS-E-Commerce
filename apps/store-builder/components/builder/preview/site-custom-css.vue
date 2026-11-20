<template>
  <!-- Merchant CSS, scoped to the storefront so it can never restyle the builder UI. -->
  <component :is="'style'" v-if="css">@scope (.sb-site) { {{ css }} }</component>
</template>

<script lang="ts" setup>
const store = useBuilderStore();

// `</style` would end the element early; strip it so the rest stays inside the scope.
const css = computed(() =>
  store.siteSettings.customCss.replace(/<\/style/gi, "").trim(),
);
</script>
