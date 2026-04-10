<template>
  <div class="text-sm text-tx-muted">Redirecting…</div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: ['redirect-builder-home'],
})
</script>
