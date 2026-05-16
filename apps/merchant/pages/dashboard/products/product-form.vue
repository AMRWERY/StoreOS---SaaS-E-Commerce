<template>
  <div>
    <add-update-product />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard'
});

useHead({
  titleTemplate: () => 'Product Form',
});
</script>