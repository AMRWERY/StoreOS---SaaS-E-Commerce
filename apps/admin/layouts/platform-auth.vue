<template>
  <div class="min-h-screen bg-bg-base text-tx-primary flex flex-col">
    <header class="flex items-center justify-end gap-3 px-4 py-4 md:px-8">
      <ThemeToggle />
      <LazyVLocaleSwitch />
    </header>

    <main class="flex flex-1 items-center justify-center px-4 pb-12">
      <slot />
    </main>

    <footer class="px-4 pb-6 text-center text-[10px] tracking-wider text-tx-muted">
      {{ t('platform.login.footer') }}
    </footer>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n()
</script>
