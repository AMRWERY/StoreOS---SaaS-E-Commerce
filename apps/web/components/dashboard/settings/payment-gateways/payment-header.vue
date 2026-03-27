<template>
  <div>
    <header class="max-w-6xl mx-auto mb-12">
      <VBreadcrumb />

      <h1 class="text-4xl font-bold tracking-tight mb-4">Payment Gateways</h1>
      <p class="text-sm text-gray-500 max-w-2xl leading-relaxed">
        Configure your transaction pipelines. Ensure API keys are rotated
        every 90 days for maximum security protocol compliance.
      </p>
    </header>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(["open-test-modal", "open-stripe-modal"]);
</script>