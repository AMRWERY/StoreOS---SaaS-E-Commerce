<template>
  <div>
    <add-update-product />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard'
});

useSeoPage({
  titleTemplate: () => 'Product Form',
});
</script>