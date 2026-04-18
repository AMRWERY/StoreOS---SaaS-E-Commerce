<template>
  <div class="text-sm text-tx-muted">Redirecting…</div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
  middleware: ['redirect-builder-home'],
})
</script>
