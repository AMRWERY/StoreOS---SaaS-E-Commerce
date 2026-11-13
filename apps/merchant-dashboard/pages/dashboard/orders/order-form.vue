<template>
  <div>
    <add-update-order />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard'
});

useSeoPage({
  titleTemplate: () => 'Order Form',
});
</script>