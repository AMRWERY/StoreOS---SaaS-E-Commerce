<template>
  <builder-shell />
</template>

<script lang="ts" setup>
const { t } = useI18n();
const route = useRoute();

const pageSlug = computed(() => String(route.params.pageSlug ?? ""));

definePageMeta({ layout: "builder" });

useSeoMeta({
  title: () => `Builder — ${pageSlug.value || "Page"}`,
  robots: "noindex, nofollow",
});
</script>