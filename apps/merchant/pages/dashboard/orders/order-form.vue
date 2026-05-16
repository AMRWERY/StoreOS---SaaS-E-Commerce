<template>
  <div>
    <add-update-order />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard'
});

useHead({
  titleTemplate: () => 'Order Form',
});
</script>