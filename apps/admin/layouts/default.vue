<template>
  <div>
    <div class="min-h-screen flex flex-col bg-bg-base font-sans text-tx-primary selection:bg-brand/10">
      <navbar />
      <main class="flex-1 pt-16">
        <slot />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>